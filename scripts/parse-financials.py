"""
Parse a Bravante financial model Excel and update data/financials/<slug>.json.

Usage:
  pip install openpyxl
  python scripts/parse-financials.py <input.xlsx> <output.json>

Reads cached formula values (data_only=True) via openpyxl.
Uses label-scanning so cell positions can shift between Excel versions.
Merges extracted values into the existing JSON, preserving manual overrides.
"""

import json
import sys
from pathlib import Path


def find_value_by_label(ws, label: str, value_col_offset: int = 1, search_col: int = 1) -> float | None:
    """Scan column `search_col` for a cell containing `label`, return the adjacent value."""
    for row in ws.iter_rows():
        if len(row) < search_col:
            continue
        cell = row[search_col - 1]
        if cell.value and label.lower() in str(cell.value).lower():
            try:
                idx = search_col - 1 + value_col_offset
                if idx < len(row):
                    v = row[idx].value
                    if isinstance(v, (int, float)):
                        return float(v)
            except (IndexError, TypeError):
                pass
    return None


def find_row_by_label(ws, label: str, search_col: int = 1) -> list[object] | None:
    """Return the full row where column `search_col` contains `label`."""
    for row in ws.iter_rows():
        if len(row) < search_col:
            continue
        cell = row[search_col - 1]
        if cell.value and label.lower() in str(cell.value).lower():
            return list(row)
    return None


def safe_float(v: object) -> float | None:
    if isinstance(v, (int, float)):
        return float(v)
    return None


def parse_pl_years(ws) -> list[dict]:
    """Extract 5-year annual totals from P&L sheet."""
    years = []

    # Try to find the header row that has year labels
    header_row_idx = None
    for i, row in enumerate(ws.iter_rows()):
        if any(str(c.value or '').strip().startswith('Año') or str(c.value or '').strip() in ['1', '2', '3', '4', '5'] for c in row):
            header_row_idx = i
            break

    # Read total row labels from column A
    venta_total_row = find_row_by_label(ws, 'venta total')
    ingreso_del_mar_row = find_row_by_label(ws, 'ingreso del mar') or find_row_by_label(ws, 'ingreso delmar')
    ebitda_row = find_row_by_label(ws, 'ebitda')

    for year in range(1, 6):
        entry: dict = {'year': year, 'ventaTotal': None, 'ingresoDelMar': None, 'ebitda': None, 'ebitdaMargin': None}
        col = year  # offset: year 1 → col index 1 (0-based), adjust if needed

        if venta_total_row and col < len(venta_total_row):
            entry['ventaTotal'] = safe_float(venta_total_row[col].value)
        if ingreso_del_mar_row and col < len(ingreso_del_mar_row):
            entry['ingresoDelMar'] = safe_float(ingreso_del_mar_row[col].value)
        if ebitda_row and col < len(ebitda_row):
            entry['ebitda'] = safe_float(ebitda_row[col].value)

        # Calculate margin if both values are available
        if entry['ingresoDelMar'] and entry['ebitda'] and entry['ingresoDelMar'] != 0:
            entry['ebitdaMargin'] = entry['ebitda'] / entry['ingresoDelMar']

        years.append(entry)
    return years


def parse_stress_tests(ws, existing_tests: list[dict]) -> list[dict]:
    """Try to extract TIR and MOIC for each stress scenario from the stress test sheet."""
    scenarios_map = {t['id']: t for t in existing_tests}

    # Look for TIR row
    tir_row = find_row_by_label(ws, 'tir') or find_row_by_label(ws, 'irr')
    moic_row = find_row_by_label(ws, 'moic')

    if tir_row and len(tir_row) >= 6:
        ids = ['covid_2020', 'recession_2008', 'stress_high', 'base_case', 'optimistic']
        for i, sid in enumerate(ids):
            if sid in scenarios_map and i + 1 < len(tir_row):
                v = safe_float(tir_row[i + 1].value)
                if v is not None:
                    scenarios_map[sid]['tir'] = v

    if moic_row and len(moic_row) >= 6:
        ids = ['covid_2020', 'recession_2008', 'stress_high', 'base_case', 'optimistic']
        for i, sid in enumerate(ids):
            if sid in scenarios_map and i + 1 < len(moic_row):
                v = safe_float(moic_row[i + 1].value)
                if v is not None:
                    scenarios_map[sid]['moic'] = v

    return list(scenarios_map.values())


def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/parse-financials.py <input.xlsx> <output.json>", file=sys.stderr)
        sys.exit(1)

    try:
        import openpyxl
    except ImportError:
        print("Error: openpyxl not installed. Run: pip install openpyxl", file=sys.stderr)
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    if not input_path.exists():
        print(f"Error: input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    wb = openpyxl.load_workbook(str(input_path), data_only=True, read_only=True)
    sheet_names = wb.sheetnames
    print(f"Sheets found: {sheet_names}")

    # Load existing JSON
    existing: dict = {}
    if output_path.exists():
        with open(output_path) as f:
            existing = json.load(f)

    kpis = existing.get('kpis', {})
    assumptions = existing.get('assumptions', {})

    # ── Supuestos sheet ──────────────────────────────────────────────
    supuestos_names = [n for n in sheet_names if 'supuesto' in n.lower()]
    if supuestos_names:
        ws = wb[supuestos_names[0]]
        wacc = find_value_by_label(ws, 'wacc')
        if wacc:
            assumptions['wacc'] = wacc
        ramp = find_value_by_label(ws, 'ramp') or find_value_by_label(ws, 'arranque') or find_value_by_label(ws, 'meses')
        if ramp:
            assumptions['rampMonths'] = ramp
        occupancy = find_value_by_label(ws, 'ocupaci') or find_value_by_label(ws, 'occupancy')
        if occupancy and 0 < occupancy < 1:
            assumptions['stabilizedOccupancy'] = occupancy
        mgmt_fee = find_value_by_label(ws, 'comisi') or find_value_by_label(ws, 'management fee') or find_value_by_label(ws, 'fee del mar')
        if mgmt_fee:
            assumptions['managementFee'] = mgmt_fee
        adr_growth = find_value_by_label(ws, 'adr') or find_value_by_label(ws, 'crecimiento')
        if adr_growth and 0 < adr_growth < 1:
            assumptions['adrGrowthAnnual'] = adr_growth

    # ── P&L sheet ────────────────────────────────────────────────────
    pl_names = [n for n in sheet_names if 'profit' in n.lower() or 'loss' in n.lower() or 'p&l' in n.lower() or 'resultados' in n.lower()]
    pl_by_year = existing.get('plByYear', [])
    if pl_names:
        ws = wb[pl_names[0]]
        parsed_pl = parse_pl_years(ws)
        if any(r['ventaTotal'] is not None for r in parsed_pl):
            pl_by_year = parsed_pl
            # Extract year 1 and 5 KPIs
            if parsed_pl[0]['ebitda'] is not None:
                kpis['ebitdaAnio1'] = parsed_pl[0]['ebitda']
            if len(parsed_pl) >= 5 and parsed_pl[4]['ebitda'] is not None:
                kpis['ebitdaAnio5'] = parsed_pl[4]['ebitda']
            if parsed_pl[0]['ventaTotal'] is not None:
                kpis['ventaTotalAnio1'] = parsed_pl[0]['ventaTotal']
            if parsed_pl[0]['ingresoDelMar'] is not None:
                kpis['ingresoDelMarAnio1'] = parsed_pl[0]['ingresoDelMar']

    # ── Flujo de Efectivo sheet ───────────────────────────────────────
    flujo_names = [n for n in sheet_names if 'flujo' in n.lower() or 'efectivo' in n.lower() or 'cash' in n.lower()]
    if flujo_names:
        ws = wb[flujo_names[0]]
        fcff = find_value_by_label(ws, 'fcff') or find_value_by_label(ws, 'flujo libre')
        if fcff:
            kpis['fcffNormalizado'] = fcff
        deficit = find_value_by_label(ws, 'deficit') or find_value_by_label(ws, 'déficit')
        if deficit:
            kpis['deficitMaximoCaja'] = deficit
        dscr = find_value_by_label(ws, 'dscr') or find_value_by_label(ws, 'cobertura de deuda')
        if dscr:
            kpis['dscrMinimo'] = dscr

    # ── Unit Economics sheet ──────────────────────────────────────────
    ue_names = [n for n in sheet_names if 'unit' in n.lower() or 'econom' in n.lower()]
    unit_economics = existing.get('unitEconomics', {})
    if ue_names:
        ws = wb[ue_names[0]]
        adr = find_value_by_label(ws, 'adr')
        if adr and adr > 0:
            unit_economics['adr'] = adr
        occ = find_value_by_label(ws, 'ocupaci') or find_value_by_label(ws, 'occupancy')
        if occ and 0 < occ < 1:
            unit_economics['occupancy'] = occ
        revpar = find_value_by_label(ws, 'revpar')
        if revpar and revpar > 0:
            unit_economics['revpar'] = revpar

    # ── Valuación sheet ───────────────────────────────────────────────
    val_names = [n for n in sheet_names if 'valuaci' in n.lower() or 'valuation' in n.lower()]
    if val_names:
        ws = wb[val_names[0]]
        ev = find_value_by_label(ws, 'valor del contrato') or find_value_by_label(ws, 'enterprise value') or find_value_by_label(ws, 'ev')
        if ev and ev > 0:
            kpis['valorContrato'] = ev
        tir = find_value_by_label(ws, 'tir') or find_value_by_label(ws, 'irr')
        if tir and 0 < tir < 2:
            kpis['tir'] = tir
        moic = find_value_by_label(ws, 'moic')
        if moic and moic > 0:
            kpis['moic'] = moic
        vpn = find_value_by_label(ws, 'vpn') or find_value_by_label(ws, 'van') or find_value_by_label(ws, 'npv')
        if vpn:
            kpis['vpnWacc'] = vpn
        ev_ebitda = find_value_by_label(ws, 'ev/ebitda') or find_value_by_label(ws, 'multiple')
        if ev_ebitda and 0 < ev_ebitda < 100:
            kpis['evEbitda'] = ev_ebitda
        valor_llave = find_value_by_label(ws, 'llave') or find_value_by_label(ws, 'por llave')
        if valor_llave and valor_llave > 0:
            kpis['valorPorLlave'] = valor_llave

    # ── Stress Test sheet ─────────────────────────────────────────────
    stress_names = [n for n in sheet_names if 'stress' in n.lower() or 'sensib' in n.lower()]
    stress_tests = existing.get('stressTests', [])
    if stress_names and stress_tests:
        ws = wb[stress_names[0]]
        stress_tests = parse_stress_tests(ws, stress_tests)

    wb.close()

    # Merge extracted values into existing JSON
    existing['kpis'] = kpis
    existing['plByYear'] = pl_by_year
    existing['assumptions'] = assumptions
    existing['stressTests'] = stress_tests
    existing['unitEconomics'] = unit_economics

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print(f"Written: {output_path}")
    extracted = [(k, v) for k, v in kpis.items() if v is not None]
    print(f"KPIs extracted: {len(extracted)}/{len(kpis)}")


if __name__ == '__main__':
    main()
