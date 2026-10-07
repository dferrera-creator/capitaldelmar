'use client'

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { PLRow } from '@/lib/financials'

interface PLChartProps {
  data: PLRow[]
}

function formatCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-ink-100 bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-ink-900 mb-2">Año {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="mb-0.5">
          {entry.name}:{' '}
          <span className="font-medium">
            {entry.name === 'Margen EBITDA' ? formatPct(entry.value) : formatCompact(entry.value)}
          </span>
        </p>
      ))}
    </div>
  )
}

export function PLChart({ data }: PLChartProps) {
  const hasData = data.some(
    (row) => row.ventaTotal !== null || row.ingresoDelMar !== null || row.ebitda !== null,
  )

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-48 rounded-xl border border-dashed border-ink-200 bg-sand-50">
        <p className="text-sm text-ink-400">Datos en preparación — disponibles en el data room</p>
      </div>
    )
  }

  const chartData = data.map((row) => ({
    year: row.year,
    'Venta Total': row.ventaTotal ?? 0,
    'Ingreso Del Mar': row.ingresoDelMar ?? 0,
    EBITDA: row.ebitda ?? 0,
    'Margen EBITDA': row.ebitdaMargin ?? 0,
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData} margin={{ top: 8, right: 48, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `Año ${v}`}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatPct}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={44}
            domain={[0, 1]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            iconType="square"
          />
          <Bar
            yAxisId="left"
            dataKey="Venta Total"
            fill="#c8d8e8"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            yAxisId="left"
            dataKey="Ingreso Del Mar"
            fill="#d4aa6a"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            yAxisId="left"
            dataKey="EBITDA"
            fill="#e89b0a"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Margen EBITDA"
            stroke="#334e68"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ fill: '#334e68', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="mt-3 text-xs text-ink-400 text-center">
        Margen EBITDA (eje derecho) — barras en eje izquierdo (MXN)
      </p>
    </div>
  )
}
