'use client'

import { useState } from 'react'
import { Lock, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function SolicitarDataRoomPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    ndaAccepted: false,
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.ndaAccepted) {
      setError('Debes aceptar el acuerdo de confidencialidad para continuar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/data-room/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error al enviar')
      }
      setSent(true)
    } catch (err) {
      setError((err as Error).message || 'No se pudo enviar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Lock className="w-4 h-4" />
            <span>Acceso controlado</span>
          </div>
          <h1 className="font-serif text-4xl font-semibold mb-3">Solicitar acceso al Data Room</h1>
          <p className="text-ink-200">
            El Data Room contiene información financiera y legal confidencial de los proyectos.
            El acceso requiere aceptar un acuerdo de confidencialidad y la aprobación del equipo.
          </p>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4 py-10">
        {sent ? (
          <div className="bg-white rounded-2xl border border-ink-100 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">
              Solicitud enviada
            </h2>
            <p className="text-ink-600 mb-4">
              Revisaremos tu solicitud y te notificaremos por correo electrónico dentro de 1–2
              días hábiles.
            </p>
            <p className="text-sm text-ink-400">
              Si tienes preguntas urgentes, escríbenos a{' '}
              <a
                href="mailto:contacto@delmarboutique.com"
                className="text-accent hover:underline"
              >
                contacto@delmarboutique.com
              </a>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
            <h2 className="font-serif text-xl font-semibold text-ink-900 mb-5">
              Formulario de solicitud
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="name-dr">
                  Nombre completo *
                </label>
                <input
                  id="name-dr"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="email-dr">
                  Correo electrónico *
                </label>
                <input
                  id="email-dr"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="company">
                  Empresa u organización
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Nombre de tu empresa (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="message-dr">
                  Motivo de la solicitud *
                </label>
                <textarea
                  id="message-dr"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm resize-none"
                  placeholder="Cuéntanos brevemente por qué estás interesado en los proyectos y qué información necesitas…"
                />
              </div>

              {/* NDA acceptance */}
              <div className="bg-sand-50 border border-ink-200 rounded-xl p-4">
                <p className="text-sm text-ink-700 mb-3 font-medium">
                  Acuerdo de confidencialidad
                </p>
                <p className="text-xs text-ink-500 mb-3">
                  Al marcar esta casilla, acepto mantener la confidencialidad de toda la
                  información a la que tenga acceso en el Data Room de Del Mar Capital. Me
                  comprometo a no compartir, reproducir ni distribuir dicha información sin
                  autorización expresa de DM Boutique Servicios Turísticos S.A.P.I. de C.V.
                  {' '}[PENDIENTE LEGAL — revisar redacción del NDA]
                </p>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.ndaAccepted}
                    onChange={(e) => setForm((f) => ({ ...f, ndaAccepted: e.target.checked }))}
                    className="mt-0.5 accent-accent"
                    aria-required="true"
                  />
                  <span className="text-sm text-ink-700">
                    Acepto el acuerdo de confidencialidad *
                  </span>
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !form.ndaAccepted}
                className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Enviando…' : 'Enviar solicitud'}
              </button>

              <p className="text-xs text-ink-400 text-center">
                El equipo revisará tu solicitud en 1–2 días hábiles. Recibirás un email de
                confirmación.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
