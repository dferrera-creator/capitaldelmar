'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
}

const SECTIONS: Section[] = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'protecciones', label: 'Protecciones' },
  { id: 'financiero', label: 'Financiero' },
  { id: 'riesgos', label: 'Riesgos' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'documentos', label: 'Documentos' },
]

export function ProjectNav() {
  const [active, setActive] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    })

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const navHeight = 56
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-ink-100 shadow-sm">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap',
                active === s.id
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-500 hover:text-ink-900 hover:bg-ink-50',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
