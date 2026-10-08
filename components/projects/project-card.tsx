import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, CheckCircle2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProjectData } from '@/lib/projects'

interface ProjectCardProps {
  project: ProjectData
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const isConfirmed = project.returnRate > 0
  const slotsLeft = project.availableSlots
  const hasSlotInfo = slotsLeft < project.totalSlots
  const isInactive = project.active === false

  const returnTypeLabel =
    project.returnType === 'FIXED'
      ? 'Fijo'
      : project.returnType === 'HISTORICAL'
        ? 'Histórico'
        : 'Estimado'

  const statusBadge = () => {
    if (project.status === 'ILUSTRATIVO') return { label: 'En estructuración', className: 'bg-accent text-ink-900' }
    if (project.status === 'ESTIMADO') return { label: 'Estimado', className: 'bg-accent text-ink-900' }
    if (project.status === 'COMING_SOON') return { label: 'Próximamente', className: 'bg-ink-700 text-sand' }
    return null
  }
  const badge = statusBadge()

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className={cn('object-cover transition-transform duration-500 hover:scale-105', isInactive && 'grayscale')}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={cn('h-full bg-gradient-to-br from-ink-800 to-ink-600', isInactive && 'opacity-60')} />
        )}
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />

        {/* Status badge */}
        {badge && (
          <span className={cn('absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold', badge.className)}>
            {badge.label}
          </span>
        )}

        {/* Project name over image */}
        <p className="absolute bottom-4 left-5 font-serif text-xl font-semibold text-white drop-shadow">
          {project.name}
        </p>
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
            <span className="font-serif text-2xl font-semibold text-ink-400">Por confirmar</span>
          )}
          {isConfirmed && (
            <p className="mt-0.5 text-xs text-ink-400">(estimado — ver condiciones)</p>
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
          <p className="mb-3 text-xs text-ink-400">
            <Lock className="mr-1 inline h-3 w-3" />
            Respaldado por contrato y fideicomiso{' '}
            <Link href="/legal/riesgos" className="text-accent hover:underline">
              (ver condiciones)
            </Link>
          </p>

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
