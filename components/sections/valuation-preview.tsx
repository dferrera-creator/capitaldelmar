import Link from 'next/link'
import { cn } from '@/lib/utils'

// Hardcoded Bravante football field data (ILUSTRATIVO)
const FOOTBALL_FIELD = [
  { method: 'Comparable de mercado', low: 4200000, high: 5800000 },
  { method: 'Flujo descontado (DCF)', low: 4500000, high: 6200000 },
  { method: 'Costo de reposición', low: 3900000, high: 5100000 },
  { method: 'Precio de oferta', low: 4800000, high: 4800000 },
]

const OVERALL_MIN = Math.min(...FOOTBALL_FIELD.map((d) => d.low))
const OVERALL_MAX = Math.max(...FOOTBALL_FIELD.map((d) => d.high))
const RANGE = OVERALL_MAX - OVERALL_MIN

function toPercent(value: number) {
  return ((value - OVERALL_MIN) / RANGE) * 100
}

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export function ValuationPreview() {
  return (
    <section className={cn('bg-white py-20 px-4')}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
            ¿Cómo sabemos que vale lo que vale?
          </h2>
        </div>
        <p className="mb-2 text-ink-500">
          Usamos un análisis tipo "football field" con múltiples metodologías de valuación para
          determinar el rango de valor del activo. Ejemplo con Bravante Los Cabos.
        </p>
        <p className="mb-8 inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800">
          ILUSTRATIVO — datos sujetos a validación por tercero independiente
        </p>

        {/* Chart */}
        <div className="rounded-2xl border border-ink-100 bg-sand-50 p-6">
          <p className="mb-6 text-sm font-medium text-ink-600">
            Valuación de Bravante Los Cabos por método (MXN)
          </p>

          <div className="space-y-4">
            {FOOTBALL_FIELD.map((row) => {
              const leftPct = toPercent(row.low)
              const widthPct = toPercent(row.high) - toPercent(row.low)
              const isPoint = row.low === row.high

              return (
                <div key={row.method} className="flex items-center gap-4">
                  <div className="w-44 shrink-0 text-right text-xs text-ink-500">
                    {row.method}
                  </div>
                  <div className="relative flex-1 h-6">
                    {/* Background track */}
                    <div className="absolute inset-y-0 w-full rounded-full bg-ink-100" />
                    {/* Bar */}
                    <div
                      className={cn(
                        'absolute inset-y-1 rounded-full bg-accent',
                        isPoint && 'w-2 rounded-full',
                      )}
                      style={{
                        left: `${leftPct}%`,
                        width: isPoint ? undefined : `${widthPct}%`,
                      }}
                    />
                  </div>
                  <div className="w-40 shrink-0 text-xs text-ink-600">
                    {isPoint
                      ? formatMXN(row.low)
                      : `${formatMXN(row.low)} – ${formatMXN(row.high)}`}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-between text-xs text-ink-400">
            <span>{formatMXN(OVERALL_MIN)}</span>
            <span>{formatMXN(OVERALL_MAX)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/valuacion"
            className="text-sm font-medium text-accent hover:underline"
          >
            Explorar la metodología completa →
          </Link>
          <span className="text-xs text-ink-400">
            Datos ilustrativos sujetos a validación por tercero independiente.
          </span>
        </div>
      </div>
    </section>
  )
}
