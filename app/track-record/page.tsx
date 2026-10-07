import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, TrendingUp, Star } from 'lucide-react'
import { formatPercent } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Track record',
  description:
    'Historial de proyectos de Del Mar Capital. Metodología de cálculo de rendimientos y casos destacados.',
}

const HISTORICAL_PROJECTS = [
  {
    name: 'Terra 01',
    location: 'Los Cabos, BCS',
    type: 'Fracción hotelera',
    year: '2019–2022',
    annualReturn: 23.28,
    totalReturn: 82.4,
    moic: 1.82,
    months: 36,
    status: 'ILUSTRATIVO',
    note: 'Rendimiento real anualizado calculado sobre el capital invertido durante el plazo.',
  },
  {
    name: 'Playita 01',
    location: 'La Playita, BCS',
    type: 'Préstamo hipotecario',
    year: '2020–2023',
    annualReturn: 18.5,
    totalReturn: 65.1,
    moic: 1.65,
    months: 36,
    status: 'ILUSTRATIVO',
    note: null,
  },
  {
    name: 'Cabo Azul I',
    location: 'San José del Cabo, BCS',
    type: 'Participación en ingresos',
    year: '2021–2023',
    annualReturn: 16.2,
    totalReturn: 35.8,
    moic: 1.36,
    months: 24,
    status: 'ILUSTRATIVO',
    note: null,
  },
  {
    name: 'Reserva Norte',
    location: 'Todos Santos, BCS',
    type: 'Fracción hotelera',
    year: '2021–2024',
    annualReturn: 19.1,
    totalReturn: 68.1,
    moic: 1.68,
    months: 36,
    status: 'ILUSTRATIVO',
    note: null,
  },
  {
    name: 'Campera SMA I',
    location: 'San Miguel de Allende, Gto',
    type: 'Préstamo hipotecario',
    year: '2022–2024',
    annualReturn: 14.8,
    totalReturn: 32.4,
    moic: 1.32,
    months: 24,
    status: 'ILUSTRATIVO',
    note: null,
  },
]

const PRESS = [
  { name: 'El Financiero', date: '2024', title: '[FUENTE PENDIENTE]' },
  { name: 'Expansión', date: '2023', title: '[FUENTE PENDIENTE]' },
  { name: 'Real Estate Market', date: '2023', title: '[FUENTE PENDIENTE]' },
]

const AWARDS = [
  {
    name: '[FUENTE PENDIENTE]',
    year: '2024',
    description: 'Premio o reconocimiento pendiente de verificación',
  },
  {
    name: '[FUENTE PENDIENTE]',
    year: '2023',
    description: 'Premio o reconocimiento pendiente de verificación',
  },
]

function StatusBadge({ status }: { status: string }) {
  if (status === 'ILUSTRATIVO') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        ILUSTRATIVO
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
      REAL
    </span>
  )
}

export default function TrackRecordPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Historial</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Track record
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Historial de proyectos completados y rendimientos entregados. Todas las cifras
            marcadas como ILUSTRATIVO deben verificarse con datos auditados antes de publicarse.
          </p>
          <div className="mt-6 flex items-start gap-2 bg-amber-900/40 border border-amber-700 rounded-lg px-3 py-2 text-amber-200 text-sm max-w-xl">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Los rendimientos históricos no garantizan rendimientos futuros. Las cifras
              ILUSTRATIVO son estimadas y no han sido auditadas por terceros.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Methodology note */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
            Metodología de cálculo de rendimientos
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-4 text-ink-700 text-sm">
            <p>
              Los rendimientos reportados son <strong>tasas internas de retorno anualizadas (TIR)</strong>{' '}
              calculadas sobre el capital invertido durante el plazo de cada proyecto. La TIR considera:
            </p>
            <ul className="space-y-1 list-disc list-inside text-ink-600">
              <li>Los pagos periódicos de rendimiento recibidos durante el plazo</li>
              <li>El reembolso del capital al vencimiento</li>
              <li>El rendimiento final liquidado</li>
              <li>La duración exacta de cada flujo (no se asume capitalización mensual uniforme)</li>
            </ul>
            <p>
              Los rendimientos <strong>no incluyen inflación ni impuestos</strong>. Son rendimientos
              nominales antes de ISR. El rendimiento real (descontando inflación) será menor.
            </p>
            <p className="text-xs text-ink-400 border-t border-ink-100 pt-3">
              Las cifras marcadas como ILUSTRATIVO son estimadas por el equipo de Del Mar Capital
              con base en registros internos y no han sido auditadas por un tercero independiente.
              Se publicarán cifras auditadas cuando estén disponibles.
            </p>
          </div>
        </section>

        {/* Featured case */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Caso destacado
          </h2>
          <div className="bg-ink-900 text-white rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <StatusBadge status="ILUSTRATIVO" />
                  <h3 className="font-serif text-2xl font-semibold mt-2">Terra 01</h3>
                  <p className="text-ink-300 text-sm">Los Cabos, BCS · Fracción hotelera · 36 meses · 2019–2022</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-accent font-serif">23.28%</p>
                  <p className="text-xs text-ink-400">TIR real anualizada</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Retorno total', value: '82.4%' },
                  { label: 'MOIC', value: '1.82x' },
                  { label: 'Plazo', value: '36 meses' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold font-serif text-white">{kpi.value}</p>
                    <p className="text-xs text-ink-400 mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-sm text-ink-300">
                <p>
                  Rendimiento real anualizado calculado sobre el capital invertido durante el
                  plazo. Cifra ilustrativa — no es promesa de rendimiento futuro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Historical table */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Proyectos históricos
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sand-50 text-ink-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Proyecto</th>
                    <th className="text-left px-4 py-3">Tipo</th>
                    <th className="text-left px-4 py-3">Período</th>
                    <th className="text-right px-4 py-3">TIR anual</th>
                    <th className="text-right px-4 py-3">MOIC</th>
                    <th className="text-right px-5 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {HISTORICAL_PROJECTS.map((p) => (
                    <tr key={p.name} className="hover:bg-sand-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-ink-900">{p.name}</div>
                        <div className="text-xs text-ink-400">{p.location}</div>
                        {p.note && (
                          <div className="text-xs text-ink-400 italic mt-0.5">{p.note}</div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-ink-600">{p.type}</td>
                      <td className="px-4 py-4 text-ink-600 whitespace-nowrap">{p.year}</td>
                      <td className="px-4 py-4 text-right font-semibold text-green-700">
                        {formatPercent(p.annualReturn)}
                      </td>
                      <td className="px-4 py-4 text-right text-ink-700">{p.moic.toFixed(2)}x</td>
                      <td className="px-5 py-4 text-right">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-sand-50 text-xs text-ink-400">
                    <td colSpan={6} className="px-5 py-3">
                      Todos los rendimientos son ILUSTRATIVOS y no han sido auditados por
                      terceros. No constituyen garantía de rendimiento futuro.
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Press */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Cobertura de prensa
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {PRESS.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl border border-ink-100 p-5"
              >
                <p className="font-bold text-ink-900 mb-1">{item.name}</p>
                <p className="text-xs text-ink-400 mb-2">{item.date}</p>
                <p className="text-sm text-ink-500 italic">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Reconocimientos
          </h2>
          <div className="space-y-3">
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl border border-ink-100 p-4"
              >
                <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink-900">{award.name}</p>
                  <p className="text-xs text-ink-400">{award.year}</p>
                  <p className="text-sm text-ink-500 italic">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-ink-600 mb-4">
            ¿Te interesa invertir en el próximo proyecto?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/agendar"
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Hablar con el equipo
            </Link>
            <Link
              href="/simulador"
              className="border border-ink-300 text-ink-700 px-8 py-3 rounded-lg font-semibold hover:border-ink-500 transition-colors"
            >
              Simular inversión
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
