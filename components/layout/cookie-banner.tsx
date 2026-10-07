'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const CONSENT_KEY = 'dm_cookie_consent'

type ConsentValue = 'all' | 'essential' | null

export function CookieBanner() {
  const [consent, setConsent] = React.useState<ConsentValue>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue
      if (!stored) {
        timer = setTimeout(() => setVisible(true), 800)
      } else {
        timer = setTimeout(() => setConsent(stored), 0)
      }
    } catch {
      timer = setTimeout(() => setVisible(true), 0)
    }
    return () => clearTimeout(timer)
  }, [])

  function handleAcceptAll() {
    try {
      localStorage.setItem(CONSENT_KEY, 'all')
    } catch {
      // ignore
    }
    setConsent('all')
    setVisible(false)
  }

  function handleEssentialOnly() {
    try {
      localStorage.setItem(CONSENT_KEY, 'essential')
    } catch {
      // ignore
    }
    setConsent('essential')
    setVisible(false)
  }

  if (!visible || consent !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      aria-live="polite"
      className={cn(
        'fixed bottom-20 lg:bottom-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 animate-fade-in',
        'pointer-events-none'
      )}
    >
      <div className="mx-auto max-w-3xl pointer-events-auto">
        <div className="rounded-xl border border-ink-200 bg-white shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900 mb-0.5">
              Usamos cookies
            </p>
            <p className="text-xs text-ink-500 leading-relaxed">
              Utilizamos cookies propias y de terceros para analítica, personalización
              y funcionalidades de la plataforma. Puedes aceptar todas o solo las
              estrictamente necesarias.{' '}
              <a
                href="/cookies"
                className="underline underline-offset-2 hover:text-ink-800 transition-colors"
              >
                Política de cookies
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEssentialOnly}
              className="flex-1 sm:flex-none"
            >
              Solo esenciales
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
