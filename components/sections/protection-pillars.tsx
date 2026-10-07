import { BarChart2, Clock, Landmark, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const pillars = [
  {
    icon: BarChart2,
    title: 'Metodología de valuación',
    description:
      'Usamos un análisis tipo "football field" con múltiples metodologías: flujo descontado, comparables de mercado y múltiplos sectoriales. Los datos son verificables en el data room.',
    detail: 'Football field · Datos verificables · Múltiples métodos',
  },
  {
    icon: Clock,
    title: '10+ años de operación',
    description:
      'El operador cuenta con más de una década de trayectoria en hospitalidad boutique en México, con reconocimientos del sector y un portafolio activo de propiedades en múltiples destinos.',
    detail: 'Track record verificable · Reconocimientos del sector (ILUSTRATIVO)',
  },
  {
    icon: Landmark,
    title: 'Fideicomiso de garantía',
    description:
      'El activo subyacente se deposita en fideicomiso administrado por una institución fiduciaria regulada. Permite ejecución extrajudicial en caso de incumplimiento.',
    detail: null,
    diagram: true,
  },
]

export function ProtectionPillars() {
  return (
    <section className={cn('bg-sand py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          Las tres bases de protección
        </h2>
        <p className="mb-12 text-ink-500">
          La combinación de metodología, trayectoria y estructura legal es lo que diferencia a Del
          Mar Capital de una promesa sin respaldo.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={i} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
                <pillar.icon className="h-6 w-6 text-accent-700" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{pillar.description}</p>

              {/* Fideicomiso mini diagram */}
              {pillar.diagram && (
                <div className="mt-4 flex items-center gap-1 text-xs">
                  <span className="rounded bg-accent-100 px-2 py-1 text-accent-800 font-medium">
                    Promesa contractual
                  </span>
                  <ArrowRight className="h-3 w-3 text-ink-400 shrink-0" />
                  <span className="rounded bg-accent-100 px-2 py-1 text-accent-800 font-medium">
                    Fideicomiso
                  </span>
                  <ArrowRight className="h-3 w-3 text-ink-400 shrink-0" />
                  <span className="rounded bg-accent-100 px-2 py-1 text-accent-800 font-medium">
                    Ejecución
                  </span>
                </div>
              )}

              {pillar.detail && (
                <p className="mt-4 text-xs text-ink-400">{pillar.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
