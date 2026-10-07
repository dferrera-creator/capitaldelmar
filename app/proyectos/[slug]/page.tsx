import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getProjectSlugs } from '@/lib/projects'
import { getFinancials, getValuationData } from '@/lib/financials'
import { Button } from '@/components/ui/button'
import { RiskBanner } from '@/components/sections/risk-banner'
import { FinancialPanel } from '@/components/financials/financial-panel'
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  ArrowRight,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = getProject(slug)
    return {
      title: project.name,
      description: project.tagline,
    }
  } catch {
    return { title: 'Proyecto no encontrado' }
  }
}

const RETURN_TYPE_LABELS: Record<string, string> = {
  FIXED: 'Tasa fija contractual',
  ESTIMATED: 'Rendimiento estimado',
  HISTORICAL: 'Rendimiento histórico',
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params

  let project
  try {
    project = getProject(slug)
  } catch {
    notFound()
  }

  const [financials, valuation] = await Promise.all([
    Promise.resolve(getFinancials(slug)),
    Promise.resolve(getValuationData(slug)),
  ])

  const isConfirmed = project.returnRate > 0
  const returnTypeLabel = RETURN_TYPE_LABELS[project.returnType] ?? project.returnType

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-ink px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {project.location}
              </span>
              <span>·</span>
              <span>{project.assetTypeLabel}</span>
              {project.status === 'ILUSTRATIVO' && (
                <>
                  <span>·</span>
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink-900">
                    ILUSTRATIVO
                  </span>
                </>
              )}
            </div>
            <h1 className="font-serif text-4xl font-semibold text-sand sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 text-lg text-ink-300">{project.tagline}</p>

            {/* Return rate */}
            <div className="mt-8">
              {isConfirmed ? (
                <>
                  <span className="font-serif text-6xl font-bold text-accent">
                    {project.returnRateDisplay}
                  </span>
                  <p className="mt-1 text-sm text-ink-400">{returnTypeLabel}</p>
                  <p className="mt-0.5 text-xs text-ink-500">(ILUSTRATIVO — ver condiciones)</p>
                </>
              ) : (
                <span className="font-serif text-3xl font-semibold text-ink-400">
                  Rendimiento por confirmar
                </span>
              )}
            </div>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-ink-300">
              <span>Desde {project.minTicketDisplay}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {project.termMonths} meses
              </span>
              {project.availableSlots < project.totalSlots && (
                <>
                  <span>·</span>
                  <span>
                    {project.availableSlots}/{project.totalSlots} posiciones disponibles
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
          {/* Qué compras */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
              Qué compras
            </h2>
            <p className="leading-relaxed text-ink-600">{project.what_you_buy}</p>
            <div className="mt-4 rounded-lg bg-sand-50 border border-sand-300 px-4 py-3">
              <p className="text-xs text-ink-500">
                (ILUSTRATIVO) — Descripción sujeta a definición contractual final.
              </p>
            </div>
          </section>

          {/* Qué te protege */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
              Qué te protege
            </h2>
            <ul className="space-y-3">
              {project.protections.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-ink-700">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-100 bg-sand-50 p-4">
                <p className="text-xs font-medium text-ink-600">Piso de rendimiento</p>
                <p className="mt-1 text-xs text-ink-500">
                  Referenciado a CETES 28d. Condiciones en revisión legal. [PENDIENTE LEGAL]
                </p>
                <Link href="/legal/riesgos" className="mt-2 block text-xs text-accent hover:underline">
                  Ver condiciones →
                </Link>
              </div>
              <div className="rounded-xl border border-ink-100 bg-sand-50 p-4">
                <p className="text-xs font-medium text-ink-600">Comprador de última instancia</p>
                <p className="mt-1 text-xs text-ink-500">
                  Año 1. Condiciones en revisión legal. [PENDIENTE LEGAL]
                </p>
                <Link href="/legal/riesgos" className="mt-2 block text-xs text-accent hover:underline">
                  Ver condiciones →
                </Link>
              </div>
            </div>
          </section>

          {/* Modelo financiero */}
          {financials && (
            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
                Modelo financiero
              </h2>
              <FinancialPanel
                financials={financials}
                valuation={valuation ?? undefined}
              />
            </section>
          )}

          {/* Riesgos */}
          <section>
            <h2 className="mb-2 font-serif text-2xl font-semibold text-ink-900">
              Riesgos de este proyecto
            </h2>
            <p className="mb-4 flex items-center gap-2 text-sm text-risk">
              <AlertTriangle className="h-4 w-4" />
              Leer antes de invertir.
            </p>
            <ul className="space-y-3">
              {project.risks.map((risk, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50/40 px-4 py-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-risk" />
                  <span className="text-sm text-ink-700">{risk}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/legal/riesgos"
              className="mt-4 inline-block text-sm font-medium text-risk hover:underline"
            >
              Ver política completa de riesgos →
            </Link>
          </section>

          {/* Cómo funciona */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
              Cómo funciona
            </h2>
            <ol className="space-y-4">
              {[
                { step: '1', title: 'Agendar llamada', desc: 'Conversación de 30 min con el equipo de capital para conocer el proyecto.' },
                { step: '2', title: 'Carta de reserva', desc: '7 días para reservar tu posición mientras revisas la documentación.' },
                { step: '3', title: 'Due diligence', desc: 'Acceso al data room: contrato, valuación, escrituras y modelo financiero.' },
                { step: '4', title: 'Firma y transferencia', desc: '5 días hábiles para formalizar. Firma del contrato y transferencia al fideicomiso.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900">
                    <span className="font-serif text-xs font-bold text-sand">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-medium text-ink-900">{item.title}</p>
                    <p className="text-sm text-ink-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Documentos */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
              Documentos del proyecto
            </h2>
            <div className="rounded-2xl border border-dashed border-ink-200 bg-sand-50 p-8 text-center">
              <Lock className="mx-auto mb-3 h-8 w-8 text-ink-300" />
              <p className="font-medium text-ink-700">Acceso restringido</p>
              <p className="mt-1 text-sm text-ink-500">
                Los documentos del data room están disponibles para inversionistas calificados que
                hayan completado el proceso de reserva y firmado el NDA.
              </p>
              <Button asChild className="mt-4">
                <Link href="/agendar">
                  <FileText className="mr-2 h-4 w-4" />
                  Solicitar acceso
                </Link>
              </Button>
            </div>
          </section>
        </div>

        {/* Sticky CTA bar */}
        <div className="sticky bottom-0 z-30 border-t border-ink-100 bg-white px-4 py-4 shadow-lg">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-serif text-lg font-semibold text-ink-900">{project.name}</p>
              <p className="text-sm text-ink-500">
                {isConfirmed ? `${project.returnRateDisplay} (ILUSTRATIVO)` : 'Rendimiento por confirmar'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="secondary" size="sm">
                <Link href="/agendar">Agendar llamada</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/agendar">
                  Solicitar plan de inversión
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <RiskBanner />
    </>
  )
}
