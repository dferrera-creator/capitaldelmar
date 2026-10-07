'use client'

import { cn, formatPercent } from '@/lib/utils'
import type { FinancialData } from '@/lib/financials'

function formatMultiple(v: number | null): string {
  if (v === null) return '—'
  return `${v.toFixed(2)}x`
}

function formatPct(v: number | null): string {
  if (v === null) return '—'
  return formatPercent(v)
}

function formatRevparImpact(v: number): string {
  if (v === 0) return 'Caso base'
  const sign = v > 0 ? '+' : ''
  return `${sign}${(v * 100).toFixed(1)}%`
}

interface ScenariosTableProps {
  scenarios: FinancialData['scenarios']
  stressTests: FinancialData['stressTests']
}

export function ScenariosTable({ scenarios, stressTests }: ScenariosTableProps) {
  const scenarioDefs = [
    { key: 'bear' as const, label: scenarios.bear.label, col: 'text-ink-500' },
    { key: 'base' as const, label: scenarios.base.label, col: 'text-accent font-semibold' },
    { key: 'bull' as const, label: scenarios.bull.label, col: 'text-ink-900 font-semibold' },
  ]

  const metrics: Array<{
    label: string
    getValue: (s: FinancialData['scenarios']['base']) => string
  }> = [
    { label: 'TIR', getValue: (s) => formatPct(s.tir) },
    { label: 'MOIC', getValue: (s) => formatMultiple(s.moic) },
    { label: 'EBITDA Año 1', getValue: (s) => (s.ebitdaAnio1 !== null ? `$${(s.ebitdaAnio1 / 1_000_000).toFixed(2)}M` : '—') },
    { label: 'VPN', getValue: (s) => (s.vpn !== null ? `$${(s.vpn / 1_000_000).toFixed(2)}M` : '—') },
  ]

  return (
    <div className="space-y-8">
      {/* Bear / Base / Bull comparison */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">
          Escenarios Bear / Base / Bull
        </h3>

        {/* Scenario descriptions */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {scenarioDefs.map(({ key, label }) => (
            <div
              key={key}
              className={cn(
                'rounded-lg border p-3 text-xs',
                key === 'base' ? 'border-accent bg-sand-50' : 'border-ink-100 bg-white',
              )}
            >
              <p className={cn('font-semibold mb-1', key === 'base' ? 'text-accent' : 'text-ink-900')}>
                {label}
              </p>
              <p className="text-ink-500 leading-snug">{scenarios[key].description}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="py-2 pr-4 text-left font-medium text-ink-500">Métrica</th>
                {scenarioDefs.map(({ key, label, col }) => (
                  <th
                    key={key}
                    className={cn(
                      'py-2 px-3 text-right font-medium',
                      col,
                      key === 'base' && 'bg-sand-50',
                    )}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, i) => (
                <tr
                  key={metric.label}
                  className={cn('border-b border-ink-100', i % 2 === 0 && 'bg-white')}
                >
                  <td className="py-2.5 pr-4 text-ink-600">{metric.label}</td>
                  {scenarioDefs.map(({ key }) => (
                    <td
                      key={key}
                      className={cn(
                        'py-2.5 px-3 text-right tabular-nums',
                        key === 'base' ? 'bg-sand-50 text-ink-900 font-medium' : 'text-ink-700',
                      )}
                    >
                      {metric.getValue(scenarios[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stress tests */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">
          Análisis de sensibilidad (Stress Test)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="py-2 pr-4 text-left font-medium text-ink-500">Escenario</th>
                <th className="py-2 px-3 text-right font-medium text-ink-500">Impacto RevPAR</th>
                <th className="py-2 px-3 text-right font-medium text-ink-500">TIR</th>
                <th className="py-2 px-3 text-right font-medium text-ink-500">MOIC</th>
              </tr>
            </thead>
            <tbody>
              {stressTests.map((test, i) => (
                <tr
                  key={test.id}
                  className={cn('border-b border-ink-100', i % 2 === 0 && 'bg-white')}
                >
                  <td className="py-2.5 pr-4">
                    <p className="text-ink-900 font-medium">{test.label}</p>
                    <p className="text-ink-400 text-[11px] leading-snug mt-0.5">{test.description}</p>
                  </td>
                  <td
                    className={cn(
                      'py-2.5 px-3 text-right tabular-nums font-medium',
                      test.revparImpact < 0 ? 'text-risk' : test.revparImpact > 0 ? 'text-accent' : 'text-ink-600',
                    )}
                  >
                    {formatRevparImpact(test.revparImpact)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-ink-700">
                    {formatPct(test.tir)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-ink-700">
                    {formatMultiple(test.moic)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-ink-400">
          * Impacto relativo al RevPAR del caso base. TIR y MOIC pendientes de cálculo del modelo definitivo.
        </p>
      </div>
    </div>
  )
}
