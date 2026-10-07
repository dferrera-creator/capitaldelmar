import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HowItWorksQuick() {
  return (
    <section className={cn('bg-sand py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
              ¿Cómo se invierte?
            </h2>
            <p className="text-lg leading-relaxed text-ink-600">
              Elige uno o varios proyectos, compra tu ticket y diversifica. Tu seguridad está en el
              contrato.
            </p>
          </div>

          {/* Right: two cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 1: Piso CETES */}
            <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100">
                <Shield className="h-5 w-5 text-accent-700" />
              </div>
              <h3 className="font-serif text-base font-semibold text-ink-900">
                Piso de rendimiento referenciado a CETES
              </h3>
              <p className="mt-2 text-xs text-ink-500">
                Condición contractual que establece un rendimiento mínimo ligado a CETES 28d.
              </p>
              <Link
                href="/legal/riesgos"
                className="mt-3 inline-block text-xs text-accent hover:underline"
              >
                Ver condiciones →
              </Link>
            </div>

            {/* Card 2: Comprador última instancia */}
            <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100">
                <ArrowRight className="h-5 w-5 text-accent-700" />
              </div>
              <h3 className="font-serif text-base font-semibold text-ink-900">
                Comprador de última instancia el primer año
              </h3>
              <p className="mt-2 text-xs text-ink-500">
                Derecho contractual a vender tu participación de vuelta al emisor en el año 1.
              </p>
              <Link
                href="/legal/riesgos"
                className="mt-3 inline-block text-xs text-accent hover:underline"
              >
                Ver condiciones →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
