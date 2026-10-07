/**
 * Validates data/financials/*.json and copies them to public/data/financials/.
 * Run: npx tsx scripts/build-financials.ts
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'financials')
const OUT_DIR = path.join(process.cwd(), 'public', 'data', 'financials')

type Nullable<T> = T | null

interface FinancialKPIs {
  ventaTotalAnio1: Nullable<number>
  ingresoDelMarAnio1: Nullable<number>
  ebitdaAnio1: Nullable<number>
  ebitdaAnio5: Nullable<number>
  ebitdaAcumulado60m: Nullable<number>
  fcffNormalizado: Nullable<number>
  valorContrato: Nullable<number>
  evEbitda: Nullable<number>
  valorPorLlave: Nullable<number>
  tir: Nullable<number>
  vpnWacc: Nullable<number>
  moic: Nullable<number>
  deficitMaximoCaja: Nullable<number>
  dscrMinimo: Nullable<number>
}

interface PLRow {
  year: number
  ventaTotal: Nullable<number>
  ingresoDelMar: Nullable<number>
  ebitda: Nullable<number>
  ebitdaMargin: Nullable<number>
}

interface ScenarioData {
  label: string
  description: string
  tir: Nullable<number>
  moic: Nullable<number>
  ebitdaAnio1: Nullable<number>
  vpn: Nullable<number>
}

interface FinancialData {
  slug: string
  status: string
  currency: string
  download: { url: string; requiresAuth: boolean; label: string }
  kpis: FinancialKPIs
  plByYear: PLRow[]
  scenarios: { bear: ScenarioData; base: ScenarioData; bull: ScenarioData }
  stressTests: unknown[]
}

function assertNullableNumber(obj: Record<string, unknown>, key: string, context: string): void {
  const v = obj[key]
  if (v !== null && v !== undefined && typeof v !== 'number') {
    throw new Error(`${context}.${key} must be number | null, got ${typeof v}`)
  }
}

function validateFinancials(data: FinancialData, slug: string): void {
  if (!data.slug) throw new Error(`${slug}: missing slug`)
  if (!data.status) throw new Error(`${slug}: missing status`)
  if (!data.currency) throw new Error(`${slug}: missing currency`)
  if (!data.download?.url) throw new Error(`${slug}: missing download.url`)
  if (!data.kpis) throw new Error(`${slug}: missing kpis`)

  const kpiKeys: Array<keyof FinancialKPIs> = [
    'ventaTotalAnio1', 'ingresoDelMarAnio1', 'ebitdaAnio1', 'ebitdaAnio5',
    'ebitdaAcumulado60m', 'fcffNormalizado', 'valorContrato', 'evEbitda',
    'valorPorLlave', 'tir', 'vpnWacc', 'moic', 'deficitMaximoCaja', 'dscrMinimo',
  ]
  for (const key of kpiKeys) {
    assertNullableNumber(data.kpis as unknown as Record<string, unknown>, key, `${slug}.kpis`)
  }

  if (!Array.isArray(data.plByYear) || data.plByYear.length !== 5) {
    throw new Error(`${slug}: plByYear must have exactly 5 entries`)
  }
  for (const row of data.plByYear) {
    const r = row as unknown as Record<string, unknown>
    assertNullableNumber(r, 'ventaTotal', `${slug}.plByYear[${row.year}]`)
    assertNullableNumber(r, 'ingresoDelMar', `${slug}.plByYear[${row.year}]`)
    assertNullableNumber(r, 'ebitda', `${slug}.plByYear[${row.year}]`)
    assertNullableNumber(r, 'ebitdaMargin', `${slug}.plByYear[${row.year}]`)
  }

  if (!data.scenarios?.bear || !data.scenarios?.base || !data.scenarios?.bull) {
    throw new Error(`${slug}: scenarios must have bear, base, and bull`)
  }
}

function main(): void {
  if (!fs.existsSync(DATA_DIR)) {
    console.log('No data/financials directory found — nothing to build.')
    return
  }

  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'))
  if (files.length === 0) {
    console.log('No JSON files found in data/financials.')
    return
  }

  let ok = 0
  let errors = 0

  for (const file of files) {
    const slug = file.replace('.json', '')
    try {
      const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8')
      const data = JSON.parse(raw) as FinancialData
      validateFinancials(data, slug)
      console.log(`✓ ${slug}`)
      ok++
    } catch (err) {
      console.error(`✗ ${slug}: ${(err as Error).message}`)
      errors++
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} validation error(s). Fix before deploying.`)
    process.exit(1)
  }

  // Copy to public/data/financials/ for static serving
  fs.mkdirSync(OUT_DIR, { recursive: true })
  for (const file of files) {
    fs.copyFileSync(path.join(DATA_DIR, file), path.join(OUT_DIR, file))
  }

  console.log(`\n${ok} file(s) validated and copied to public/data/financials/.`)
}

main()
