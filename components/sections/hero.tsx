'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

const HERO_VARIANTS = {
  A: 'Invierte en hospitalidad real, con piso de rendimiento y salida respaldada.',
  B: 'Activos turísticos con operador, método de valuación y fideicomiso.',
  C: 'Diversifica en proyectos turísticos con un operador de 10+ años.',
}

interface HeroSectionProps {
  variant?: 'A' | 'B' | 'C'
}

export function HeroSection({ variant = 'A' }: HeroSectionProps) {
  const headline = HERO_VARIANTS[variant]

  return (
    <section
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center bg-ink px-4 py-24 text-center',
      )}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=900&fit=crop&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink-900/90 via-ink/80 to-ink-800/90"
      />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        {/* H1 */}
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-sand sm:text-5xl md:text-6xl">
          {headline}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-sand-300">
          Elige uno o varios proyectos, compra tu ticket y diversifica.{' '}
          <span className="font-medium text-sand">Tu seguridad está en el contrato.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/agendar">Agendar llamada de 30 min</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full border-sand-300 text-sand hover:bg-ink-800 hover:text-sand sm:w-auto">
            <Link href="/proyectos">Ver proyectos</Link>
          </Button>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-6 max-w-xl rounded-xl border border-ink-700 bg-ink-900/60 px-6 py-4">
          <p className="text-sm font-medium tracking-wide text-sand-300">
            10+ años · 159 propiedades · 604 unidades en mandato · 6 destinos
          </p>
          <p className="mt-1 text-xs text-ink-400">(ILUSTRATIVO — datos sujetos a validación)</p>
        </div>

        {/* Risk warning */}
        <p className="flex items-center justify-center gap-2 text-xs text-ink-400">
          <AlertTriangle className="h-3 w-3 text-risk" />
          Invertir implica riesgos incluyendo la posible pérdida del capital.{' '}
          <Link href="/legal/riesgos" className="underline hover:text-sand-300">
            Ver riesgos
          </Link>
        </p>
      </div>
    </section>
  )
}
