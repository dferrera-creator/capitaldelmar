'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, Lock, AlertTriangle, Info } from 'lucide-react'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import type { FinancialData } from '@/lib/financials'
import type { ValuationData } from '@/components/football-field/football-field-chart'
import { KPIRow } from '@/components/financials/kpi-row'
import { PLChart } from '@/components/financials/pl-chart'
import { ScenariosTable } from '@/components/financials/scenarios-table'
import { FootballFieldChart } from '@/components/football-field/football-field-chart'

type Tab = 'kpis' | 'pl' | 'escenarios' | 'valuacion'

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'kpis', label: 'KPIs' },
  { id: 'pl', label: 'P&L Proyectado' },
  { id: 'escenarios', label: 'Escenarios' },
  { id: 'valuacion', label: 'Valuación' },
]

interface FinancialPanelProps {
  financials: FinancialData
  valuation?: ValuationData
}

export function FinancialPanel({ financials, valuation }: FinancialPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('kpis')

  return (
    <div className="rounded-2xl border border-ink-100 overflow-hidden">
      {/* Status banner */}
      {financials.status === 'ILUSTRATIVO' && (
        <div className="flex items-start gap-2 bg-amber-50 border-b border-amber-200 px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">ILUSTRATIVO</span> — Cifras con fines ilustrativos únicamente.
            No constituyen garantía de rendimiento ni oferta de inversión.
            Sujetas a validación legal y financiera antes de publicarse.
          </p>
        </div>
      )}
      {financials.status === 'ESTIMADO' && (
        <div className="flex items-start gap-2 bg-blue-50 border-b border-blue-200 px-4 py-3">
          <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Estimación</span> — Cifras del modelo financiero (caso Base).
            Son estimaciones, no una promesa de rendimiento.
          </p>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex border-b border-ink-100 bg-sand-50 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
              activeTab === tab.id
                ? 'text-ink-900 border-b-2 border-accent bg-white'
                : 'text-ink-500 hover:text-ink-900 hover:bg-white/60',
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white p-5 sm:p-6" role="tabpanel">
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* Investment breakdown */}
            {financials.investment && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-3">Inversión total</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <p className="text-xs text-ink-500 mb-1">Precio de compra</p>
                    <p className="font-serif text-base font-bold text-ink-900">
                      {formatCurrency(financials.investment.precioCompra)}
                    </p>
                    {financials.investment.listPrice && (
                      <p className="text-[11px] text-ink-400 mt-0.5">
                        {financials.investment.descuentoVsListaPct?.toFixed(0)}% bajo lista de {formatCurrency(financials.investment.listPrice)}
                      </p>
                    )}
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <p className="text-xs text-ink-500 mb-1">Remodelación</p>
                    <p className="font-serif text-base font-bold text-ink-900">
                      {formatCurrency(financials.investment.remodelacion)}
                    </p>
                    <p className="text-[11px] text-ink-400 mt-0.5">Por confirmar (cotización)</p>
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <p className="text-xs text-ink-500 mb-1">Gastos de cierre</p>
                    <p className="font-serif text-base font-bold text-ink-900">
                      {formatCurrency(financials.investment.gastosCierre)}
                    </p>
                    <p className="text-[11px] text-ink-400 mt-0.5">~4% del precio</p>
                  </div>
                  <div className="rounded-xl border border-accent/20 bg-sand-50 p-3">
                    <p className="text-xs text-ink-500 mb-1">Total inversión</p>
                    <p className="font-serif text-base font-bold text-accent">
                      {formatCurrency(financials.investment.total)}
                    </p>
                    <p className="text-[11px] text-ink-400 mt-0.5">
                      {financials.investment.hipoteca === 0 ? 'Sin hipoteca' : `Hipoteca: ${formatCurrency(financials.investment.hipoteca)}`}
                    </p>
                  </div>
                </div>
                {/* Investment bar */}
                <div className="h-4 rounded-full overflow-hidden flex">
                  {(() => {
                    const total = financials.investment.total
                    const comp = financials.investment.precioCompra / total
                    const remo = financials.investment.remodelacion / total
                    const cierre = financials.investment.gastosCierre / total
                    return (
                      <>
                        <div style={{ width: `${comp * 100}%` }} className="bg-ink-700 flex items-center justify-center">
                          <span className="text-[10px] text-white font-medium hidden sm:block">Compra</span>
                        </div>
                        <div style={{ width: `${remo * 100}%` }} className="bg-ink-400" />
                        <div style={{ width: `${cierre * 100}%` }} className="bg-ink-200" />
                      </>
                    )
                  })()}
                </div>
                <div className="flex gap-4 mt-1.5 text-[11px] text-ink-500">
                  <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-ink-700" />Precio compra</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-ink-400" />Remodelación</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-ink-200" />Cierre</span>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-ink-400 mb-4">
                Métricas clave del modelo financiero (caso Base). Valores nulos (—) se publican una vez validado el modelo.
              </p>
              <KPIRow kpis={financials.kpis} />
            </div>

            {/* Unit economics */}
            {financials.unitEconomics.adr && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-3">Unit economics (Año 1, caso Base)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <p className="text-xs text-ink-500 mb-1">Tarifa por noche (ADR)</p>
                    <p className="font-serif text-base font-bold text-ink-900">
                      {formatCurrency(financials.unitEconomics.adr ?? 0)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <p className="text-xs text-ink-500 mb-1">Ocupación</p>
                    <p className="font-serif text-base font-bold text-ink-900">
                      {financials.unitEconomics.occupancy !== null ? formatPercent(financials.unitEconomics.occupancy) : '—'}
                    </p>
                  </div>
                  {financials.unitEconomics.revpar && (
                    <div className="rounded-xl border border-ink-100 bg-white p-3">
                      <p className="text-xs text-ink-500 mb-1">RevPAR</p>
                      <p className="font-serif text-base font-bold text-ink-900">
                        {formatCurrency(financials.unitEconomics.revpar)}
                      </p>
                    </div>
                  )}
                  {(financials as { suitesRentaCorta?: number }).suitesRentaCorta && (
                    <div className="rounded-xl border border-ink-100 bg-white p-3">
                      <p className="text-xs text-ink-500 mb-1">Suites renta corta</p>
                      <p className="font-serif text-base font-bold text-ink-900">
                        {(financials as { suitesRentaCorta?: number }).suitesRentaCorta} de {(financials as { suiteCount?: number }).suiteCount ?? '?'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pl' && (
          <div className="space-y-8">
            <div>
              {financials.ingresos2025Actuales && (
                <p className="text-xs text-ink-500 mb-3 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
                  <span className="font-semibold">Aviso:</span> El plan casi duplica los ingresos del año 1 (de {formatCurrency(financials.ingresos2025Actuales)} en 2025 a {formatCurrency(financials.kpis.ventaTotalAnio1 ?? 0)} en año 1), al operar como renta de corta estancia con precios dinámicos. Es el supuesto que más pesa y debe tenerse presente.
                </p>
              )}
              <p className="text-xs text-ink-400 mb-4">
                Proyección de ingresos y EBITDA por año (caso Base). Años 1–5 del horizonte de inversión.
              </p>
              <PLChart data={financials.plByYear} />
            </div>

            {/* Cash flow table */}
            {financials.cashFlowByYear && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-3">Flujo de efectivo libre (caso Base)</h3>
                <p className="text-xs text-ink-500 mb-3">
                  El dinero que sobra cada año después de pagar impuestos y de reservar para mantener el hotel. Es lo que se podría repartir.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-ink-200">
                        <th className="py-2 pr-4 text-left font-medium text-ink-500">Concepto</th>
                        {financials.cashFlowByYear.map((r) => (
                          <th key={r.year} className="py-2 px-3 text-right font-medium text-ink-500">Año {r.year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-ink-100">
                        <td className="py-2.5 pr-4 text-ink-600">Flujo libre</td>
                        {financials.cashFlowByYear.map((r) => (
                          <td key={r.year} className="py-2.5 px-3 text-right tabular-nums text-ink-700">
                            {formatCurrency(r.flujoLibre)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-ink-100 bg-sand-50">
                        <td className="py-2.5 pr-4 text-ink-600 font-medium">Acumulado</td>
                        {financials.cashFlowByYear.map((r) => (
                          <td key={r.year} className="py-2.5 px-3 text-right tabular-nums font-medium text-accent">
                            {formatCurrency(r.flujoAcumulado)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-ink-100">
                        <td className="py-2.5 pr-4 text-ink-600">Sobre inversión</td>
                        {financials.cashFlowByYear.map((r) => (
                          <td key={r.year} className="py-2.5 px-3 text-right tabular-nums text-ink-700">
                            {formatPercent(r.rendimientoSobreInversion)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-[11px] text-ink-400">
                  "Son estimaciones, no una promesa de rendimiento."
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'escenarios' && (
          <div className="space-y-8">
            <div>
              <p className="text-xs text-ink-400 mb-4">
                Comparativa de retornos bajo escenarios de mercado y stress tests operativos.
              </p>
              <ScenariosTable
                scenarios={financials.scenarios}
                stressTests={financials.stressTests}
              />
            </div>

            {/* Return cascade */}
            {financials.returnCascade && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-3">¿De dónde sale la ganancia? (caso Base, 5 años)</h3>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {[
                    { label: 'Inversión', value: financials.returnCascade.inversion, color: 'bg-ink-200', arrow: true },
                    { label: '+ Efectivo del hotel', value: financials.returnCascade.efectivo5a, color: 'bg-sand-300', arrow: true },
                    { label: '+ Plusvalía inmueble', value: financials.returnCascade.plusvalia, color: 'bg-accent/30', arrow: true },
                    { label: '= Valor total', value: financials.returnCascade.valorTotal, color: 'bg-accent', arrow: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={cn('rounded-lg px-3 py-2 text-xs', item.color)}>
                        <p className="text-ink-500 leading-tight">{item.label}</p>
                        <p className="font-serif font-bold text-ink-900 text-sm">{formatCurrency(item.value)}</p>
                      </div>
                      {item.arrow && <span className="text-ink-400 text-lg">→</span>}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="rounded-lg bg-sand-50 border border-sand-300 px-4 py-2">
                    <span className="text-ink-500 text-xs">Retorno total</span>
                    <p className="font-serif font-bold text-accent">{formatPercent(financials.returnCascade.retornoTotal)}</p>
                  </div>
                  <div className="rounded-lg bg-sand-50 border border-sand-300 px-4 py-2">
                    <span className="text-ink-500 text-xs">MOIC</span>
                    <p className="font-serif font-bold text-accent">{financials.returnCascade.moic.toFixed(2)}x</p>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-ink-400 flex items-start gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500 mt-0.5" />
                  {financials.returnCascade.nota}
                </p>
              </div>
            )}

            {/* Property sensitivity */}
            {financials.sensibilidadInmueble && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-1">Si el inmueble vale distinto</h3>
                <p className="text-xs text-ink-500 mb-3">
                  El retorno depende mucho de cuánto vale el inmueble. El avalúo está pendiente.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-ink-200">
                        <th className="py-2 pr-4 text-left font-medium text-ink-500">Valor del inmueble</th>
                        {['sin_cambios', 'conservador', 'base', 'optimista'].map((esc) => {
                          const labels: Record<string, string> = { sin_cambios: 'Sin cambios', conservador: 'Conservador', base: 'Base', optimista: 'Optimista' }
                          return (
                            <th key={esc} className={cn('py-2 px-3 text-right font-medium', esc === 'base' ? 'text-accent' : 'text-ink-500')}>
                              {labels[esc]}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {financials.sensibilidadInmueble.valores.map((val, i) => (
                        <tr
                          key={val}
                          className={cn(
                            'border-b border-ink-100',
                            val === financials.propertyEstimated ? 'bg-sand-50 font-medium' : '',
                          )}
                        >
                          <td className="py-2.5 pr-4 text-ink-700 tabular-nums">
                            {formatCurrency(val)}
                            {val === financials.propertyEstimated && (
                              <span className="ml-1.5 text-[10px] text-blue-600 font-normal border border-blue-300 rounded px-1">Por confirmar</span>
                            )}
                          </td>
                          {['sin_cambios', 'conservador', 'base', 'optimista'].map((esc) => {
                            const pct = financials.sensibilidadInmueble?.retornoAnualizadoPct[esc]?.[i]
                            return (
                              <td key={esc} className={cn('py-2.5 px-3 text-right tabular-nums', esc === 'base' ? 'text-accent font-medium' : 'text-ink-700')}>
                                {pct !== undefined ? formatPercent(pct) : '—'}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-[11px] text-ink-400">Retorno anualizado (TIR) por escenario operativo y valor del inmueble al año 5.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'valuacion' && (
          <div className="space-y-8">
            {valuation ? (
              <>
                <p className="text-xs text-ink-400 mb-4">
                  Análisis football field: 5 métodos de valuación independientes con reconciliación ponderada.
                </p>
                <FootballFieldChart data={valuation} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-sm text-ink-500 mb-3">Modelo de valuación en preparación.</p>
                <Link
                  href="/valuacion"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Ver metodología de valuación →
                </Link>
              </div>
            )}

            {/* Supuestos y riesgos del modelo */}
            {financials.supuestosRiesgo && financials.supuestosRiesgo.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-ink-900 mb-1">Supuestos del modelo y qué falta por confirmar</h3>
                <p className="text-xs text-ink-500 mb-3">
                  Antes de tomar una decisión, estos son los supuestos que el modelo usa y lo que todavía no está confirmado.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-ink-200">
                        <th className="py-2 pr-4 text-left font-medium text-ink-500 w-1/5">Tema</th>
                        <th className="py-2 px-3 text-left font-medium text-ink-500 w-2/5">Supuesto del modelo</th>
                        <th className="py-2 pl-3 text-left font-medium text-ink-500 w-2/5">Qué falta por confirmar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financials.supuestosRiesgo.map((row, i) => (
                        <tr key={i} className={cn('border-b border-ink-100', i % 2 === 0 ? '' : 'bg-sand-50')}>
                          <td className="py-2.5 pr-4 text-ink-800 font-medium">{row.tema}</td>
                          <td className="py-2.5 px-3 text-ink-700">{row.supuesto}</td>
                          <td className="py-2.5 pl-3 text-ink-600">{row.queFalta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-[11px] text-ink-400 flex items-start gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500 mt-0.5" />
                  Son estimaciones, no una promesa de rendimiento. Los supuestos marcados "Por confirmar" pueden cambiar el retorno significativamente.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Download bar */}
      <div className="border-t border-ink-100 bg-sand-50 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-ink-500">
          Modelo financiero completo con supuestos y fórmulas.
        </p>
        {financials.download.requiresAuth ? (
          <Link
            href="/data-room"
            className="inline-flex items-center gap-2 text-xs font-medium text-ink-600 hover:text-ink-900 transition-colors"
          >
            <Lock className="h-3.5 w-3.5" />
            Disponible en el Data Room
          </Link>
        ) : (
          <a
            href={financials.download.url}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-white px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            {financials.download.label}
          </a>
        )}
      </div>
    </div>
  )
}
