'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Shield, ArrowLeftRight, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CetesData {
  rate: number
  term: string
  date: string
  source: string
  status: 'live' | 'cached' | 'fallback'
}

function CetesWidget() {
  const [data, setData] = useState<CetesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cetes')
      .then((r) => r.json())
      .then((d: CetesData) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="mb-8 flex items-center gap-3 rounded-lg border border-ink-600 bg-ink-800 px-4 py-3">
      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      <div>
        {loading ? (
          <span className="text-sm text-ink-400">Cargando tasa CETES 28d…</span>
        ) : data ? (
          <>
            <span className="text-sm font-medium text-sand">
              Tasa CETES 28d:{' '}
              <span className="font-bold text-accent">
                {data.rate > 0 ? `${data.rate.toFixed(2)}%` : 'en revisión'}
              </span>
            </span>
            <span className="ml-2 text-xs text-ink-400">
              · {data.date} · Fuente: {data.source}
            </span>
          </>
        ) : (
          <span className="text-sm text-ink-400">Tasa CETES: en revisión</span>
        )}
      </div>
    </div>
  )
}

export function GuaranteesBlock() {
  return (
    <section className={cn('bg-ink py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-sand sm:text-4xl">
          Las dos protecciones
        </h2>
        <p className="mb-8 text-ink-300">
          Cada proyecto incluye estas condiciones contractuales. Las condiciones exactas y
          limitaciones están detalladas en cada contrato.
        </p>

        <CetesWidget />

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-xl border border-ink-600 bg-ink-800 p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-900/50">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-sand">
              Piso de rendimiento referenciado a CETES
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">
              Condición contractual que establece un rendimiento mínimo equivalente a CETES 28d más
              un diferencial pactado, incluso si la operación del activo tiene un desempeño menor al
              proyectado.
            </p>
            <p className="mt-3 inline-block rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-400">
              [PENDIENTE LEGAL] — condiciones en revisión
            </p>
            <div className="mt-4">
              <Link href="/legal/riesgos" className="text-xs text-accent hover:underline">
                Ver condiciones completas →
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-ink-600 bg-ink-800 p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-900/50">
              <ArrowLeftRight className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-sand">
              Comprador de última instancia durante el primer año
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">
              Derecho contractual que permite al inversionista vender su participación de vuelta al
              emisor durante el primer año de la inversión, bajo condiciones preestablecidas de
              precio y plazo.
            </p>
            <p className="mt-3 inline-block rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-400">
              [PENDIENTE LEGAL] — condiciones en revisión
            </p>
            <div className="mt-4">
              <Link href="/legal/riesgos" className="text-xs text-accent hover:underline">
                Ver condiciones completas →
              </Link>
            </div>
          </div>
        </div>

        {/* Small print */}
        <p className="mt-6 flex items-start gap-2 text-xs text-ink-500">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Condiciones en revisión legal. No constituyen oferta pública de valores. Las protecciones
          tienen límites, condiciones y contrapartes definidas en el contrato de cada proyecto.
        </p>
      </div>
    </section>
  )
}
