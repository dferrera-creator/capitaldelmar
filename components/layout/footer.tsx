import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const platformLinks = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/simulador', label: 'Simulador' },
  { href: '/track-record', label: 'Track record' },
]

const legalLinks = [
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/terminos', label: 'Términos' },
  { href: '/riesgos', label: 'Riesgos' },
  { href: '/cookies', label: 'Cookies' },
]

const empresaLinks = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/faq', label: 'FAQ' },
  { href: '/data-room', label: 'Data Room' },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-300 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-ink-200" aria-label="Pie de página">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 rounded-sm"
              aria-label="Del Mar Capital — Inicio"
            >
              <span className="font-serif text-2xl font-bold text-white">
                Del Mar{' '}
                <span className="text-accent">Capital</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-ink-300 leading-relaxed max-w-xs">
              Inversiones en bienes raíces turísticos en Los Cabos con respaldo
              hipotecario y rendimientos atractivos.
            </p>
            <div className="mt-6 text-xs text-ink-500 space-y-1">
              <p className="font-medium text-ink-400">
                DM Boutique Servicios Turísticos S.A.P.I. de C.V.
              </p>
              <p>Blvd. Marina, Col. Centro</p>
              <p>Los Cabos, Baja California Sur, México</p>
            </div>
          </div>

          {/* Nav columns */}
          <FooterColumn title="Plataforma" links={platformLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Empresa" links={empresaLinks} />
        </div>

        {/* Risk disclaimer */}
        <div className="mt-10 pt-8 border-t border-ink-800">
          <div className="rounded-lg bg-ink-800/50 border border-ink-700 p-4">
            <p className="text-xs text-ink-400 leading-relaxed">
              <span className="font-semibold text-ink-300">Aviso importante: </span>
              La información contenida en esta plataforma no constituye una oferta
              pública de valores en términos de la Ley del Mercado de Valores ni
              de ninguna otra regulación aplicable. Está dirigida exclusivamente a
              inversionistas que cumplan con los requisitos y perfiles aplicables.
              Invertir en bienes raíces conlleva riesgos, incluyendo la posible
              pérdida del capital invertido.{' '}
              <Link
                href="/riesgos"
                className="underline underline-offset-2 text-ink-300 hover:text-white transition-colors"
              >
                Leer aviso de riesgos completo
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>
            © {currentYear} DM Boutique Servicios Turísticos S.A.P.I. de C.V.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidad"
              className="hover:text-ink-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="hover:text-ink-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              Términos
            </Link>
            <Link
              href="/cookies"
              className="hover:text-ink-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Extra spacing for mobile bottom CTA */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  )
}
