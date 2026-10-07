import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle } from 'lucide-react'

export function TrackRecord() {
  return (
    <section className={cn('bg-white py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          Lo que hemos logrado
        </h2>
        <p className="mb-8 flex items-start gap-2 text-sm text-ink-500">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-risk" />
          Resultados de proyectos cerrados. Los rendimientos pasados no son garantía de rendimientos
          futuros.
        </p>

        {/* Featured result */}
        <div className="rounded-2xl border border-ink-100 bg-sand-50 p-8 mb-8">
          <div className="flex flex-wrap items-start gap-8">
            <div>
              <p className="text-sm font-medium text-ink-500">Proyecto cerrado</p>
              <h3 className="font-serif text-2xl font-semibold text-ink-900">Terra 01</h3>
              <p className="text-sm text-ink-400">Los Cabos, BCS</p>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <TrendingUp className="mb-1 h-5 w-5 text-accent" />
                <span className="font-serif text-5xl font-bold text-ink-900">23.28%</span>
              </div>
              <p className="text-sm text-ink-500">real anualizado</p>
              <p className="mt-1 text-xs text-ink-400">
                (histórico — no es promesa de rendimiento) (ILUSTRATIVO)
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-ink-100 bg-white p-4">
            <p className="text-xs font-medium text-ink-600">Nota de metodología:</p>
            <p className="mt-1 text-xs text-ink-500">
              Rendimiento calculado sobre el monto invertido por el periodo efectivo de la
              inversión, descontando inflación del período. (ILUSTRATIVO — sujeto a auditoría)
            </p>
          </div>
        </div>

        {/* Press / Awards placeholders */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-dashed border-ink-200 bg-sand-50 p-6">
            <p className="text-sm font-medium text-ink-500">Menciones en prensa</p>
            <p className="mt-2 text-xs text-ink-400">
              [Logos de medios — pendiente de agregar fuentes verificadas]
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-ink-200 bg-sand-50 p-6">
            <p className="text-sm font-medium text-ink-500">Reconocimientos del sector</p>
            <p className="mt-2 text-xs text-ink-400">
              [Reconocimientos — pendiente de agregar con fuentes verificables]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
