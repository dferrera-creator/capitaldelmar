'use client'

import React, { useState, useId } from 'react'
import {
  ComposedChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'

export interface ValuationData {
  slug: string
  status: 'ILUSTRATIVO' | 'REAL'
  version: string
  modelDate: string
  source: string
  currency: 'MXN'
  reconciled: number
  wacc: number
  irr: number
  moic: number
  paybackMonths: number
  entryPrice: number
  scenarios: {
    bear: { label: string; reconciled: number; irr: number; moic: number }
    base: { label: string; reconciled: number; irr: number; moic: number }
    bull: { label: string; reconciled: number; irr: number; moic: number }
  }
  methods: Array<{
    id: string
    label: string
    weight: number
    min: number
    max: number
    base: number
    description: string
    assumptions: Record<string, unknown>
  }>
  checks: Array<{
    id: string
    pass: boolean
    message: string
  }>
}

type Scenario = 'bear' | 'base' | 'bull'

interface Props {
  data: ValuationData
  className?: string
}

const SCENARIO_LABELS: Record<Scenario, string> = {
  bear: 'Pesimista',
  base: 'Base',
  bull: 'Optimista',
}

const SCENARIO_COLORS: Record<Scenario, string> = {
  bear: '#627d98',
  base: '#e89b0a',
  bull: '#334e68',
}

// Custom tooltip
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (!active || !payload || !payload.length) return null
  const [phantom, range] = payload
  if (!range) return null
  const min = phantom.value
  const width = range.value
  return (
    <div className="bg-white border border-ink-100 rounded-lg shadow-lg p-3 text-sm max-w-[220px]">
      <p className="font-semibold text-ink-900 mb-1">{label}</p>
      <p className="text-ink-600">
        Rango: {formatCurrency(min)} – {formatCurrency(min + width)}
      </p>
    </div>
  )
}

export function FootballFieldChart({ data, className }: Props) {
  const [scenario, setScenario] = useState<Scenario>('base')
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const chartDescId = useId()

  const activeScenario = data.scenarios[scenario]
  const reconciledValue = activeScenario.reconciled
  // IRR and WACC may be stored as decimals (0.205 = 20.5%) or as percentages (20.5)
  // Normalize: if value < 2, treat as decimal fraction
  const normalizeRate = (v: number) => (v < 2 ? v * 100 : v)
  const activeIrr = normalizeRate(activeScenario.irr)
  const waccPct = normalizeRate(data.wacc)
  const activeMoic = activeScenario.moic

  const failedChecks = data.checks.filter((c) => !c.pass)
  const irrBelowWacc = activeIrr < waccPct

  // Build chart rows: each row uses [phantom, barWidth] to float the bar
  const chartRows = data.methods.map((m) => ({
    name: m.label,
    id: m.id,
    phantom: m.min,
    barWidth: m.max - m.min,
    base: m.base,
    min: m.min,
    max: m.max,
    weight: m.weight,
  }))

  // X-axis domain
  const allValues = data.methods.flatMap((m) => [m.min, m.max])
  const domainMin = Math.min(...allValues, reconciledValue, data.entryPrice) * 0.92
  const domainMax = Math.max(...allValues, reconciledValue, data.entryPrice) * 1.05

  const xTickFormatter = (v: number) =>
    new Intl.NumberFormat('es-MX', {
      notation: 'compact',
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 1,
    }).format(v)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={cn('bg-white rounded-2xl border border-ink-100 overflow-hidden', className)}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-ink-100">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-serif text-xl font-semibold text-ink-900">
                Football Field — Valuación
              </h2>
              {data.status === 'ILUSTRATIVO' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  ILUSTRATIVO
                </span>
              )}
            </div>
            <p className="text-sm text-ink-500">
              Rango de valuación por 5 métodos · Escenario: {SCENARIO_LABELS[scenario]}
            </p>
          </div>

          {/* Scenario switcher */}
          <div
            className="flex rounded-lg border border-ink-200 overflow-hidden text-sm"
            role="group"
            aria-label="Selector de escenario"
          >
            {(['bear', 'base', 'bull'] as Scenario[]).map((s) => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={cn(
                  'px-3 py-1.5 font-medium transition-colors',
                  scenario === s
                    ? 'bg-ink-900 text-white'
                    : 'bg-white text-ink-600 hover:bg-sand-100'
                )}
                aria-pressed={scenario === s}
              >
                {SCENARIO_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Warnings */}
      {(irrBelowWacc || failedChecks.length > 0) && (
        <div className="mx-6 mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            {irrBelowWacc && (
              <p className="font-medium">
                Advertencia: TIR ({formatPercent(activeIrr)}) es menor al WACC ({formatPercent(waccPct)}). El proyecto no genera valor suficiente sobre su costo de capital en este escenario.
              </p>
            )}
            {failedChecks.map((c) => (
              <p key={c.id}>{c.message}</p>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="px-6 pt-4 pb-2">
        <div
          role="img"
          aria-label="Gráfico de valuación tipo football field. Muestra el rango de valores estimados por método de valuación."
          aria-describedby={chartDescId}
        >
          <p id={chartDescId} className="sr-only">
            Cada barra horizontal representa el rango mínimo–máximo estimado por un método de
            valuación. La línea vertical dorada indica el valor reconciliado de {formatCurrency(reconciledValue)}.
            La línea punteada indica el precio de entrada de {formatCurrency(data.entryPrice)}.
          </p>
          <ResponsiveContainer width="100%" height={data.methods.length * 64 + 60}>
            <ComposedChart
              layout="vertical"
              data={chartRows}
              margin={{ top: 8, right: 24, left: 8, bottom: 24 }}
              {...(!prefersReducedMotion ? {} : { isAnimationActive: false })}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />
              <XAxis
                type="number"
                domain={[domainMin, domainMax]}
                tickFormatter={xTickFormatter}
                tick={{ fontSize: 11, fill: '#627d98' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={160}
                tick={{ fontSize: 12, fill: '#334e68', fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Phantom bar (invisible, sets the start offset) */}
              <Bar dataKey="phantom" stackId="a" fill="transparent" isAnimationActive={!prefersReducedMotion} />

              {/* Real range bar */}
              <Bar dataKey="barWidth" stackId="a" radius={[0, 4, 4, 0]} isAnimationActive={!prefersReducedMotion}>
                {chartRows.map((row, i) => (
                  <Cell
                    key={row.id}
                    fill={SCENARIO_COLORS[scenario]}
                    fillOpacity={0.15 + row.weight * 0.5}
                    stroke={SCENARIO_COLORS[scenario]}
                    strokeWidth={1}
                  />
                ))}
              </Bar>

              {/* Reconciled value reference line */}
              <ReferenceLine
                x={reconciledValue}
                stroke="#e89b0a"
                strokeWidth={2}
                label={{
                  value: `Val. reconciliada ${xTickFormatter(reconciledValue)}`,
                  position: 'top',
                  fontSize: 10,
                  fill: '#e89b0a',
                  fontWeight: 600,
                }}
              />

              {/* Entry price reference line */}
              <ReferenceLine
                x={data.entryPrice}
                stroke="#102a43"
                strokeWidth={2}
                strokeDasharray="5 3"
                label={{
                  value: `Precio entrada ${xTickFormatter(data.entryPrice)}`,
                  position: 'insideTopLeft',
                  fontSize: 10,
                  fill: '#102a43',
                  fontWeight: 500,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI panel */}
      <div className="mx-6 mb-4 grid grid-cols-2 sm:grid-cols-5 gap-3 bg-sand-50 rounded-xl p-4">
        {[
          { label: 'Valor reconciliado', value: formatCurrency(reconciledValue), highlight: true },
          { label: 'TIR estimada', value: formatPercent(activeIrr), highlight: irrBelowWacc as boolean },
          { label: 'MOIC estimado', value: `${activeMoic.toFixed(2)}x` },
          { label: 'Payback estimado', value: `${data.paybackMonths} meses` },
          { label: 'WACC', value: formatPercent(waccPct) },
        ].map((kpi) => (
          <div key={kpi.label} className="text-center">
            <p className="text-xs text-ink-500 mb-1">{kpi.label}</p>
            <p
              className={cn(
                'text-lg font-bold font-serif',
                kpi.highlight ? 'text-accent' : 'text-ink-900'
              )}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Ver supuestos accordion */}
      <div className="border-t border-ink-100">
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-ink-700 hover:bg-sand-50 transition-colors"
          aria-expanded={showAssumptions}
          aria-controls="assumptions-panel"
        >
          <span>Ver supuestos por método</span>
          {showAssumptions ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {showAssumptions && (
          <div id="assumptions-panel" className="px-6 pb-4 space-y-4">
            {data.methods.map((m) => (
              <div key={m.id} className="rounded-lg border border-ink-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-ink-900 text-sm">{m.label}</h4>
                  <span className="text-xs text-ink-500">Peso: {formatPercent(m.weight * 100, 0)}</span>
                </div>
                <p className="text-sm text-ink-600 mb-3">{m.description}</p>
                <div className="flex gap-4 text-xs text-ink-500 mb-3">
                  <span>Mín: <strong className="text-ink-800">{formatCurrency(m.min)}</strong></span>
                  <span>Base: <strong className="text-ink-800">{formatCurrency(m.base)}</strong></span>
                  <span>Máx: <strong className="text-ink-800">{formatCurrency(m.max)}</strong></span>
                </div>
                {Object.keys(m.assumptions).length > 0 && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                    {Object.entries(m.assumptions).map(([k, v]) => (
                      <div key={k} className="flex gap-1">
                        <dt className="text-ink-500">{k}:</dt>
                        <dd className="text-ink-800 font-medium">{String(v)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to read guide */}
      <div className="border-t border-ink-100">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-ink-700 hover:bg-sand-50 transition-colors"
          aria-expanded={showGuide}
          aria-controls="guide-panel"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Cómo leer este gráfico
          </span>
          {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showGuide && (
          <div id="guide-panel" className="px-6 pb-4 text-sm text-ink-600 space-y-2">
            <p>Cada barra horizontal muestra el <strong>rango mínimo–máximo</strong> que arroja cada método de valuación bajo el escenario seleccionado.</p>
            <p>La <span className="text-accent font-semibold">línea dorada</span> es el <strong>valor reconciliado</strong>: el promedio ponderado por los pesos de cada método.</p>
            <p>La <span className="text-ink-900 font-semibold">línea punteada</span> es el <strong>precio de entrada</strong> de la fracción ofertada.</p>
            <p>Todas las cifras son <strong>ilustrativas</strong> y no constituyen garantía de valor ni de rendimiento.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-ink-100 px-6 py-3 flex flex-wrap gap-2 text-xs text-ink-400">
        <span>Fuente: {data.source}</span>
        <span>·</span>
        <span>Modelo: {data.modelDate}</span>
        <span>·</span>
        <span>{data.version}</span>
        {data.status === 'ILUSTRATIVO' && (
          <>
            <span>·</span>
            <span className="text-amber-600 font-medium">Cifras ilustrativas — no son garantía de rendimiento</span>
          </>
        )}
      </div>
    </div>
  )
}
