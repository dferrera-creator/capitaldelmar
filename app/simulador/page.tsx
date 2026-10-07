'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { AlertTriangle, Calculator, TrendingUp } from 'lucide-react'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'

const PROJECTS = [
  { slug: 'bravante', name: 'Bravante Los Cabos' },
  { slug: 'reserva-san-gregorio', name: 'Reserva San Gregorio' },
  { slug: 'la-playita', name: 'La Playita' },
  { slug: 'campera-sma', name: 'Campera San Miguel' },
]

const PLAZOS = [
  { value: 12, label: '12 meses' },
  { value: 24, label: '24 meses' },
  { value: 36, label: '36 meses' },
  { value: 48, label: '48 meses' },
  { value: 60, label: '60 meses' },
]

interface SimulationResult {
  scenarios: {
    bear: { label: string; finalAmount: number; irr: number; moic: number }
    base: { label: string; finalAmount: number; irr: number; moic: number }
    bull: { label: string; finalAmount: number; irr: number; moic: number }
  }
  cetesComparison: { finalAmount: number; irr: number; rate: number }
  chartData: Array<{ month: number; bear: number; base: number; bull: number; cetes: number }>
}

function simulateGrowth(
  amount: number,
  months: number,
  annualRate: number
): number {
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1
  return amount * Math.pow(1 + monthlyRate, months)
}

function calculateResults(amount: number, months: number): SimulationResult {
  // Illustrative rates — not promises
  const bearRate = 0.09
  const baseRate = 0.14
  const bullRate = 0.19
  const cetesRate = 0.105 // Illustrative CETES 28d approx

  const buildChart = () =>
    Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      bear: simulateGrowth(amount, i, bearRate),
      base: simulateGrowth(amount, i, baseRate),
      bull: simulateGrowth(amount, i, bullRate),
      cetes: simulateGrowth(amount, i, cetesRate),
    }))

  return {
    scenarios: {
      bear: {
        label: 'Pesimista',
        finalAmount: simulateGrowth(amount, months, bearRate),
        irr: bearRate * 100,
        moic: simulateGrowth(amount, months, bearRate) / amount,
      },
      base: {
        label: 'Base',
        finalAmount: simulateGrowth(amount, months, baseRate),
        irr: baseRate * 100,
        moic: simulateGrowth(amount, months, baseRate) / amount,
      },
      bull: {
        label: 'Optimista',
        finalAmount: simulateGrowth(amount, months, bullRate),
        irr: bullRate * 100,
        moic: simulateGrowth(amount, months, bullRate) / amount,
      },
    },
    cetesComparison: {
      finalAmount: simulateGrowth(amount, months, cetesRate),
      irr: cetesRate * 100,
      rate: cetesRate * 100,
    },
    chartData: buildChart(),
  }
}

function formatCompact(v: number) {
  return new Intl.NumberFormat('es-MX', {
    notation: 'compact',
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 1,
  }).format(v)
}

export default function SimuladorPage() {
  const [amount, setAmount] = useState(500000)
  const [months, setMonths] = useState(36)
  const [project, setProject] = useState('bravante')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSimulate = () => {
    setResult(calculateResults(amount, months))
    setSent(false)
  }

  const handleSend = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, termMonths: months, projectSlug: project, email, result }),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch {
      setError('No se pudo enviar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const chartData = result?.chartData ?? []

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            <span>Herramienta</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Simulador de inversión
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Explora cómo podría crecer tu inversión bajo distintos escenarios. Las cifras son
            orientativas y no constituyen promesa de rendimiento.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Este simulador es orientativo.</strong> No constituye promesa de rendimiento.
            Las tasas mostradas son ilustrativas y no garantizadas. Toda inversión conlleva riesgo
            de pérdida.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-ink-900">Configura tu inversión</h2>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2" htmlFor="amount">
              Monto de inversión
            </label>
            <div className="flex items-center gap-4">
              <input
                id="amount"
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="flex-1 accent-accent"
                aria-label="Monto de inversión"
              />
              <input
                type="number"
                min={100000}
                max={10000000}
                step={50000}
                value={amount}
                onChange={(e) =>
                  setAmount(Math.min(10000000, Math.max(100000, Number(e.target.value))))
                }
                className="w-36 border border-ink-200 rounded-lg px-3 py-2 text-sm text-right font-mono"
                aria-label="Monto en MXN"
              />
            </div>
            <p className="text-xs text-ink-400 mt-1">
              {formatCurrency(amount)} MXN · rango: $100,000 – $10,000,000
            </p>
          </div>

          {/* Plazo */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Plazo</label>
            <div className="flex flex-wrap gap-2">
              {PLAZOS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setMonths(p.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                    months === p.value
                      ? 'bg-ink-900 border-ink-900 text-white'
                      : 'border-ink-200 text-ink-600 hover:border-ink-400'
                  )}
                  aria-pressed={months === p.value}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2" htmlFor="project">
              Proyecto
            </label>
            <select
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
            >
              {PROJECTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSimulate}
            className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" /> Simular
          </button>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Scenarios table */}
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-ink-100">
                <h3 className="font-serif text-lg font-semibold text-ink-900">
                  Resultados estimados — {months} meses
                </h3>
                <p className="text-xs text-ink-400 mt-0.5">Cifras ilustrativas · no garantizadas</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sand-50 text-ink-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3">Escenario</th>
                      <th className="text-right px-4 py-3">Monto final</th>
                      <th className="text-right px-4 py-3">Ganancia</th>
                      <th className="text-right px-4 py-3">TIR anual</th>
                      <th className="text-right px-6 py-3">MOIC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {Object.entries(result.scenarios).map(([key, s]) => (
                      <tr key={key} className={key === 'base' ? 'bg-accent/5' : ''}>
                        <td className="px-6 py-4 font-medium text-ink-900">{s.label}</td>
                        <td className="text-right px-4 py-4 font-semibold text-ink-900">
                          {formatCurrency(s.finalAmount)}
                        </td>
                        <td className="text-right px-4 py-4 text-green-700 font-medium">
                          +{formatCurrency(s.finalAmount - amount)}
                        </td>
                        <td className="text-right px-4 py-4">{formatPercent(s.irr)}</td>
                        <td className="text-right px-6 py-4">{s.moic.toFixed(2)}x</td>
                      </tr>
                    ))}
                    <tr className="bg-ink-50">
                      <td className="px-6 py-4 text-ink-500">vs. CETES 28d (ref.)</td>
                      <td className="text-right px-4 py-4 text-ink-600">
                        {formatCurrency(result.cetesComparison.finalAmount)}
                      </td>
                      <td className="text-right px-4 py-4 text-ink-500">
                        +{formatCurrency(result.cetesComparison.finalAmount - amount)}
                      </td>
                      <td className="text-right px-4 py-4 text-ink-500">
                        {formatPercent(result.cetesComparison.rate)}
                      </td>
                      <td className="text-right px-6 py-4 text-ink-500">
                        {(result.cetesComparison.finalAmount / amount).toFixed(2)}x
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Growth chart */}
            <div className="bg-white rounded-2xl border border-ink-100 p-6">
              <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4">
                Proyección de crecimiento
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(v) => `M${v}`}
                    tick={{ fontSize: 11, fill: '#627d98' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={formatCompact}
                    tick={{ fontSize: 11, fill: '#627d98' }}
                    axisLine={false}
                    tickLine={false}
                    width={70}
                  />
                  <Tooltip
                    formatter={(v) => [formatCurrency(Number(v))]}
                    labelFormatter={(l) => `Mes ${l}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bear"
                    name="Pesimista"
                    stroke="#829ab1"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="base"
                    name="Base"
                    stroke="#e89b0a"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="bull"
                    name="Optimista"
                    stroke="#334e68"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cetes"
                    name="CETES ref."
                    stroke="#aab2bd"
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Email results */}
            <div className="bg-white rounded-2xl border border-ink-100 p-6">
              <h3 className="font-serif text-lg font-semibold text-ink-900 mb-1">
                Recibe los resultados por email
              </h3>
              <p className="text-sm text-ink-500 mb-4">
                Te enviamos un resumen con las métricas y un enlace para agendar una llamada.
              </p>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800 font-medium">
                  ¡Enviado! Revisa tu bandeja en los próximos minutos.
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="flex-1 border border-ink-200 rounded-lg px-3 py-2 text-sm"
                    aria-label="Tu correo electrónico"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !email}
                    className="bg-ink-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-ink-800 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Enviando…' : 'Enviar'}
                  </button>
                </div>
              )}
              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                href="/agendar"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
              >
                Hablar con un asesor
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
