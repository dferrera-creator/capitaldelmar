'use client'

import { useState } from 'react'
import { Calendar, MessageSquare, Phone, CheckCircle2 } from 'lucide-react'

const HUBSPOT_MEETING_LINK = process.env.NEXT_PUBLIC_HUBSPOT_MEETING_LINK

const WHAT_TO_EXPECT = [
  'Presentación breve de tu perfil de inversionista (5 min)',
  'Revisión de los proyectos disponibles según tu perfil (10 min)',
  'Explicación de la estructura legal y garantías (10 min)',
  'Espacio para tus preguntas específicas (5 min)',
]

export default function AgendarPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const hubspotLink =
    typeof window !== 'undefined'
      ? (window as unknown as Record<string, unknown>).__HUBSPOT_MEETING_LINK as string | undefined
      : HUBSPOT_MEETING_LINK

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'agendar-page' }),
      })
      if (!res.ok) throw new Error('Error')
      setSent(true)
    } catch {
      setError('No se pudo enviar. Intenta de nuevo o contáctanos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <span>Llamada sin compromiso</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Habla con el equipo
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            30 minutos para resolver tus dudas sobre los proyectos, la estructura y el proceso
            de inversión. Sin presión, sin compromiso.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: HubSpot embed or lead form */}
          <div>
            {HUBSPOT_MEETING_LINK ? (
              <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
                <div className="p-4 border-b border-ink-100">
                  <p className="text-sm font-medium text-ink-700">Selecciona un horario</p>
                </div>
                <iframe
                  src={HUBSPOT_MEETING_LINK}
                  title="Agendar reunión con Del Mar Capital"
                  width="100%"
                  height="600"
                  className="block"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
                <h2 className="font-serif text-xl font-semibold text-ink-900 mb-5">
                  Deja tus datos y te contactamos
                </h2>
                {sent ? (
                  <div className="flex flex-col items-center text-center py-8 gap-3">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                    <p className="font-semibold text-ink-900">¡Recibido!</p>
                    <p className="text-sm text-ink-500">
                      El equipo se pondrá en contacto contigo dentro de 1 día hábil.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="name">
                        Nombre completo *
                      </label>
                      <input
                        id="name"
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="email-agendar">
                        Correo electrónico *
                      </label>
                      <input
                        id="email-agendar"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="phone">
                        Teléfono (con código de país)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                        placeholder="+52 624 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="message">
                        ¿Qué quieres saber?
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm resize-none"
                        placeholder="Cuéntanos sobre tu perfil de inversionista o las dudas que tienes…"
                      />
                    </div>
                    {error && <p className="text-red-600 text-xs">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Enviando…' : 'Solicitar llamada'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            {/* What to expect */}
            <div className="bg-white rounded-2xl border border-ink-100 p-6">
              <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4">
                Qué esperar en la llamada (30 min)
              </h3>
              <ul className="space-y-3">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp alternative */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-green-700" />
                <span className="font-semibold text-green-800 text-sm">Prefiero WhatsApp</span>
              </div>
              <p className="text-sm text-green-700 mb-3">
                También puedes escribirnos directamente por WhatsApp y un asesor te responderá
                dentro de 1 día hábil.
              </p>
              <a
                href="https://wa.me/526241234567?text=Hola%2C%20me%20interesa%20invertir%20con%20Del%20Mar%20Capital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Escribir por WhatsApp
              </a>
              <p className="text-xs text-green-600 mt-2">[Número pendiente de confirmar]</p>
            </div>

            {/* Preparation tips */}
            <div className="bg-sand-100 rounded-2xl p-5">
              <h4 className="font-semibold text-ink-900 text-sm mb-3">
                Para aprovechar mejor la llamada:
              </h4>
              <ul className="space-y-1.5 text-sm text-ink-600">
                <li>• Revisa la ficha del proyecto que más te interesa</li>
                <li>• Ten claro el monto aproximado que quieres invertir</li>
                <li>• Lee la sección de riesgos y garantías</li>
                <li>• Anota tus preguntas con anticipación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
