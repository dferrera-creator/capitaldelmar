import { MessageCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '526241234567'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me interesa conocer más sobre los proyectos de Del Mar Capital.',
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

const HUBSPOT_MEETING_LINK =
  process.env.NEXT_PUBLIC_HUBSPOT_MEETING_LINK ?? null

export function CtaFinal() {
  return (
    <section className={cn('bg-sand py-20 px-4')}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          Habla con el equipo de capital
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600">
          30 minutos son suficientes para conocer si hay un proyecto que se alinea a tus objetivos.
        </p>

        {/* Primary CTA */}
        <div className="mt-10">
          {HUBSPOT_MEETING_LINK ? (
            <iframe
              src={HUBSPOT_MEETING_LINK}
              className="mx-auto h-[600px] w-full max-w-xl rounded-2xl border border-ink-100 bg-white shadow-sm"
              title="Agendar llamada con Del Mar Capital"
            />
          ) : (
            <div className="mx-auto max-w-sm rounded-2xl border border-dashed border-ink-200 bg-white p-8">
              <Calendar className="mx-auto mb-4 h-10 w-10 text-ink-300" />
              <p className="text-sm text-ink-500">
                Embed de HubSpot Meetings — configurar{' '}
                <code className="rounded bg-sand-200 px-1 text-xs">
                  NEXT_PUBLIC_HUBSPOT_MEETING_LINK
                </code>
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/agendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar llamada de 30 min
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Secondary: WhatsApp */}
        <div className="mt-6">
          <p className="mb-3 text-sm text-ink-500">¿Prefieres escribirnos primero?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            <MessageCircle className="h-4 w-4 text-green-600" />
            Escríbenos por WhatsApp
          </a>
          <p className="mt-2 text-xs text-ink-400">
            El equipo responde en horario hábil (Lun–Vie 9–18 h, zona Pacífico).
          </p>
        </div>
      </div>
    </section>
  )
}
