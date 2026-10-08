import { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/project-card'
import { RiskBanner } from '@/components/sections/risk-banner'

export const metadata: Metadata = {
  title: 'Proyectos de inversión',
  description:
    'Proyectos de inversión en activos turísticos en México con estructura contractual y fideicomiso.',
}

export default function ProyectosPage() {
  const allProjects = getAllProjects()

  const openProjects = allProjects.filter((p) => p.status === 'OPEN')
  const comingSoonProjects = allProjects.filter((p) => p.status === 'COMING_SOON')
  const enEstructuracion = allProjects.filter(
    (p) => p.status === 'ILUSTRATIVO' || p.status === 'ESTIMADO',
  )

  return (
    <>
      {/* Page hero */}
      <div className="bg-ink px-4 pb-16 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Del Mar Capital
          </p>
          <h1 className="font-serif text-4xl font-semibold text-sand sm:text-5xl">
            Donde poner tu dinero a trabajar
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300">
            Proyectos en hospitalidad y turismo en México. Cada proyecto tiene su ficha completa:
            números, riesgos y cómo entra y sale tu dinero.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">

          {/* Open projects */}
          {openProjects.length > 0 && (
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100" />
                <h2 className="font-serif text-xl font-semibold text-ink-800">
                  Abiertos para invertir
                </h2>
                <span className="h-px flex-1 bg-ink-100" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {openProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Structured / en estructuración */}
          {enEstructuracion.length > 0 && (
            <div className="mb-16">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100" />
                <h2 className="font-serif text-xl font-semibold text-ink-800">
                  En estructuración
                </h2>
                <span className="h-px flex-1 bg-ink-100" />
              </div>
              <p className="mb-6 text-center text-sm text-ink-400">
                Proyectos que estamos preparando. Los datos son estimaciones; todavía no están listos para invertir.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {enEstructuracion.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Coming soon */}
          {comingSoonProjects.length > 0 && (
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink-100" />
                <h2 className="font-serif text-xl font-semibold text-ink-800">Próximamente</h2>
                <span className="h-px flex-1 bg-ink-100" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {comingSoonProjects.map((project) => (
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
