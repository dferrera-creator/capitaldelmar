import { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/project-card'
import { RiskBanner } from '@/components/sections/risk-banner'

export const metadata: Metadata = {
  title: 'Proyectos de inversión',
  description:
    'Proyectos de inversión en activos turísticos en México con estructura contractual y fideicomiso.',
}

export default function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const allProjects = getAllProjects()

  // We resolve statically; filter is client-side handled via tabs
  const openProjects = allProjects.filter((p) => p.status === 'OPEN')
  const comingSoonProjects = allProjects.filter((p) => p.status === 'COMING_SOON')
  const ilustrativoProjects = allProjects.filter((p) => p.status === 'ILUSTRATIVO')

  return (
    <>
      <div className="min-h-screen bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">
              Proyectos de inversión
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-500">
              Una sola lista ordenada por proyectos con captación abierta. Cada proyecto tiene su
              propia ficha con metodología de valuación, condiciones y riesgos.
            </p>
          </div>

          {/* Open projects */}
          {openProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 font-serif text-xl font-semibold text-ink-800">
                Captación abierta
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {openProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Coming soon */}
          {comingSoonProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 font-serif text-xl font-semibold text-ink-800">
                Próximamente
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {comingSoonProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Illustrative projects */}
          {ilustrativoProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-2 font-serif text-xl font-semibold text-ink-800">
                Ilustrativos
              </h2>
              <p className="mb-6 text-sm text-ink-400">
                Proyectos en estructuración mostrados con fines ilustrativos. Datos sujetos a
                validación antes de apertura formal.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ilustrativoProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <RiskBanner />
    </>
  )
}
