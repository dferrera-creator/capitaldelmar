import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Revisa tu correo',
  description: 'Hemos enviado un enlace de acceso a tu correo electrónico.',
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl font-semibold text-ink-900 mb-3">
          Revisa tu correo
        </h1>
        <p className="text-ink-600 mb-2">
          Te enviamos un enlace de acceso. Haz clic en él para ingresar al Data Room.
        </p>
        <p className="text-sm text-ink-400 mb-8">
          El enlace expira en 10 minutos. Revisa también tu carpeta de spam.
        </p>

        <div className="bg-white rounded-xl border border-ink-100 p-4 text-left space-y-2 text-sm text-ink-600 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Abre el correo de <strong>Del Mar Capital</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Haz clic en el botón de acceso</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Serás redirigido al Data Room</span>
          </div>
        </div>

        <Link
          href="/auth/login"
          className="text-sm text-accent hover:underline"
        >
          ¿No recibiste el correo? Intentar de nuevo
        </Link>
      </div>
    </div>
  )
}
