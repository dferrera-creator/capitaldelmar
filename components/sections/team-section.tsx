import { ExternalLink, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import teamData from '@/content/team.json'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  linkedin: string | null
  imageUrl?: string | null
  photoUrl?: string | null
}

export function TeamSection() {
  const team = teamData as TeamMember[]

  return (
    <section className={cn('bg-sand py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          El equipo
        </h2>
        <p className="mb-12 text-ink-500">
          Las personas detrás de Del Mar Capital y DM Boutique.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-sm"
            >
              {/* Photo placeholder */}
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-ink-100">
                <User className="h-8 w-8 text-ink-400" />
              </div>

              <h3 className="font-serif text-lg font-semibold text-ink-900">{member.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-accent-700">{member.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink-500">{member.bio}</p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
