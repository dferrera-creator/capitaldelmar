import Link from 'next/link'
import { MapPin, Clock, CheckCircle2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency } from '@/lib/utils'
import type { ProjectData } from '@/lib/projects'

interface ProjectCardProps {
  project: ProjectData
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const isConfirmed = project.returnRate > 0
  const slotsLeft = project.availableSlots
  const hasSlotInfo = slotsLeft < project.totalSlots

  const returnTypeLabel =
    project.returnType === 'FIXED'
      ? 'Fijo'
      : project.returnType === 'HISTORICAL'
        ? 'Histórico'
        : 'Estimado'

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {/* Image placeholder */}
      <div className="relative flex h-48 items-end bg-gradient-to-br from-ink-800 to-ink-600 px-5 pb-4">
        {project.status === 'ILUSTRATIVO' && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink-900">
            ILUSTRATIVO
          </span>
        )}
        {project.status === 'COMING_SOON' && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-600 px-2.5 py-0.5 text-xs font-medium text-sand">
            Próximamente
          </span>
        )}
        <p className="font-serif text-xl font-semibold text-sand">{project.name}</p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Location + asset type */}
        <div className="flex flex-wrap gap-2 text-xs text-ink-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {project.location}
          </span>
          <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-ink-600">
            {project.assetTypeLabel}
          </span>
        </div>

        {/* Return rate */}
        <div className="mt-4">
          {isConfirmed ? (
            <>
              <span className="font-serif text-4xl font-bold text-ink-900">
                {project.returnRateDisplay}
              </span>
              <span className="ml-2 text-sm text-ink-500">{returnTypeLabel}</span>
            </>
          ) : (
            <span className="font-serif text-2xl font-semibold text-ink-400">POR CONFIRMAR</span>
          )}
          {isConfirmed && (
            <p className="mt-0.5 text-xs text-ink-400">(ILUSTRATIVO — ver condiciones)</p>
          )}
        </div>

        {/* Ticket + term */}
        <div className="mt-3 flex gap-4 text-sm text-ink-600">
          <span>
            <span className="font-medium">Desde</span> {project.minTicketDisplay}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {project.termMonths} meses
          </span>
        </div>

        {/* Benefits */}
        <ul className="mt-4 space-y-1.5">
          {project.benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-ink-700">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              {benefit}
            </li>
          ))}
        </ul>

        {/* Slots counter */}
        {hasSlotInfo && (
          <div className="mt-4 rounded-lg bg-sand-100 px-3 py-2 text-xs">
            <span className="font-medium text-ink-800">
              {slotsLeft} / {project.totalSlots} posiciones disponibles
            </span>
          </div>
        )}

        <div className="mt-4 border-t border-ink-50 pt-4">
          {/* Fideicomiso note */}
          <p className="mb-3 text-xs text-ink-400">
            <Lock className="mr-1 inline h-3 w-3" />
            Respaldado por contrato y fideicomiso{' '}
            <Link href="/legal/riesgos" className="text-accent hover:underline">
              (ver condiciones)
            </Link>
          </p>

          {/* CTA */}
          <Button asChild className="w-full" disabled={project.status === 'COMING_SOON'}>
            <Link href={`/proyectos/${project.slug}`}>
              {project.status === 'COMING_SOON' ? 'Próximamente' : 'Ver proyecto'}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
