import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RiskBanner() {
  return (
    <div className={cn('w-full bg-sand-200 border-t border-sand-300 px-4 py-3')}>
      <p className="mx-auto flex max-w-5xl items-start gap-2 text-xs leading-relaxed text-ink-600">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-risk" />
        <span>
          <strong className="font-semibold text-ink-800">Riesgo:</strong> La inversión implica
          posible pérdida parcial o total del capital. Liquidez limitada — no existe mercado
          secundario activo. Los rendimientos presentados son ilustrativos y no constituyen promesa
          de rendimiento.{' '}
          <Link href="/legal/riesgos" className="font-medium text-risk underline hover:text-red-700">
            Ver riesgos completos
          </Link>
          . DM Boutique Servicios Turísticos S.A.P.I. de C.V. no es una institución financiera
          regulada. La información presentada no constituye oferta pública de valores.
        </span>
      </p>
    </div>
  )
}
