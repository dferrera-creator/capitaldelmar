import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ProjectsPreview() {
  const projects = getAllProjects().slice(0, 3)

  return (
    <section className="bg-white py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
              Proyectos activos
            </h2>
            <p className="mt-2 text-ink-500">
              Una selección de oportunidades con captación abierta o próxima apertura.
            </p>
          </div>
          <Link
            href="/proyectos"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Button asChild variant="secondary">
            <Link href="/proyectos">Ver todos los proyectos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
