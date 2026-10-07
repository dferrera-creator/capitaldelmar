'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/garantias', label: 'Garantías' },
  { href: '/valuacion', label: 'Valuación' },
  { href: '/track-record', label: 'Track record' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/faq', label: 'FAQ' },
]

const HUBSPOT_MEETING_LINK =
  process.env.NEXT_PUBLIC_HUBSPOT_MEETING_LINK ?? '/agendar'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change — disable rule: this is an intentional
  // "sync with external state" (the router), not a cascading render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur-sm transition-shadow duration-200',
          scrolled ? 'shadow-md' : 'shadow-none border-b border-ink-100'
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
            aria-label="Del Mar Capital — Inicio"
          >
            <span className="font-serif text-xl font-bold tracking-tight text-ink-900">
              Del Mar{' '}
              <span className="text-accent">Capital</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-md',
                      'hover:text-ink-900 hover:bg-ink-50',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                      isActive
                        ? 'text-ink-900'
                        : 'text-ink-600'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/acceso">Acceso inversionistas</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a
                href={HUBSPOT_MEETING_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar llamada
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-ink-600 hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-ink-100 bg-white"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sand-100 text-ink-900 border-l-2 border-accent pl-4'
                          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-ink-100 px-4 py-4 flex flex-col gap-3">
              <Button variant="secondary" className="w-full justify-center" asChild>
                <Link href="/acceso">Acceso inversionistas</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile fixed bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-ink-100 px-4 py-3 safe-area-inset-bottom">
        <Button className="w-full justify-center" asChild>
          <a
            href={HUBSPOT_MEETING_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar llamada
          </a>
        </Button>
      </div>
    </>
  )
}
