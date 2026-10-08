'use client'

import { cn, formatCompact, formatCurrency, formatPercent } from '@/lib/utils'
import type { FinancialKPIs } from '@/lib/financials'

interface KPITileProps {
  label: string
  value: number | null
  format: 'currency' | 'percent' | 'multiple' | 'ratio'
  highlight?: 'accent' | 'risk'
}

function formatValue(value: number, format: KPITileProps['format']): string {
  switch (format) {
    case 'currency':
      return formatCompact(value)
    case 'percent':
      return formatPercent(value)
    case 'multiple':
      return `${value.toFixed(2)}x`
    case 'ratio':
      return value.toFixed(2)
  }
}

function KPITile({ label, value, format, highlight }: KPITileProps) {
  const isNull = value === null || value === undefined
  const isRiskValue =
    highlight === 'risk' && !isNull && (format === 'ratio' ? value < 1.0 : value < 0)
  const fullLabel = !isNull && format === 'currency' ? formatCurrency(value as number) : undefined

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-3 min-w-0">
      <p className="text-xs text-ink-500 leading-tight mb-1.5 truncate">{label}</p>
      <p
        title={fullLabel}
        className={cn(
          'font-serif text-base font-bold leading-tight truncate',
          isNull && 'text-ink-300',
          !isNull && highlight === 'accent' && 'text-accent',
          !isNull && isRiskValue && 'text-risk',
          !isNull && !highlight && !isRiskValue && 'text-ink-900',
        )}
      >
        {isNull ? '—' : formatValue(value, format)}
      </p>
    </div>
  )
}

interface KPIRowProps {
  kpis: FinancialKPIs
}

const KPI_DEFS: Array<{
  key: keyof FinancialKPIs
  label: string
  format: KPITileProps['format']
  highlight?: KPITileProps['highlight']
}> = [
  { key: 'ventaTotalAnio1', label: 'Venta Total Año 1', format: 'currency' },
  { key: 'ingresoDelMarAnio1', label: 'Ingreso Del Mar Año 1', format: 'currency' },
  { key: 'ebitdaAnio1', label: 'EBITDA Año 1', format: 'currency' },
  { key: 'ebitdaAnio5', label: 'EBITDA Año 5', format: 'currency' },
  { key: 'ebitdaAcumulado60m', label: 'EBITDA Acumulado 60m', format: 'currency' },
  { key: 'fcffNormalizado', label: 'FCFF Normalizado', format: 'currency' },
  { key: 'valorContrato', label: 'Valor del Contrato (EV)', format: 'currency', highlight: 'accent' },
  { key: 'evEbitda', label: 'EV/EBITDA', format: 'multiple' },
  { key: 'valorPorLlave', label: 'Valor por Llave', format: 'currency' },
  { key: 'tir', label: 'TIR', format: 'percent', highlight: 'accent' },
  { key: 'vpnWacc', label: 'VPN @ WACC', format: 'currency' },
  { key: 'moic', label: 'MOIC', format: 'multiple', highlight: 'accent' },
  { key: 'deficitMaximoCaja', label: 'Déficit Máx. Caja', format: 'currency', highlight: 'risk' },
  { key: 'dscrMinimo', label: 'DSCR Mínimo', format: 'ratio', highlight: 'risk' },
]

export function KPIRow({ kpis }: KPIRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {KPI_DEFS.map((def) => (
        <KPITile
          key={def.key}
          label={def.label}
          value={kpis[def.key]}
          format={def.format}
          highlight={def.highlight}
        />
      ))}
    </div>
  )
}
