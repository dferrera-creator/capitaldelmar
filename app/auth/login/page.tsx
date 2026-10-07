import type { Metadata } from 'next'
import { signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Accede al Data Room de Del Mar Capital.',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  const callbackUrl = searchParams.callbackUrl ?? '/data-room'

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-ink-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-accent" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-ink-900">Del Mar Capital</h1>
          <p className="text-ink-500 text-sm mt-1">Acceso al Data Room</p>
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
          {searchParams.error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {searchParams.error === 'Verification'
                ? 'El enlace de verificación expiró. Solicita uno nuevo.'
                : 'Ocurrió un error. Intenta de nuevo.'}
            </div>
          )}

          <p className="text-ink-600 text-sm mb-5">
            Ingresa tu correo electrónico para recibir un enlace de acceso seguro. No necesitas
            contraseña.
          </p>

          <form
            action={async (formData: FormData) => {
              'use server'
              await signIn('resend', {
                email: formData.get('email') as string,
                redirectTo: callbackUrl,
              })
              redirect('/auth/verify')
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1" htmlFor="email-login">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  id="email-login"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className="w-full border border-ink-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-ink-900 text-white font-semibold py-2.5 rounded-lg hover:bg-ink-800 transition-colors text-sm"
            >
              Enviar enlace de acceso
            </button>
          </form>

          <p className="text-xs text-ink-400 text-center mt-4">
            Solo inversionistas con acceso autorizado pueden iniciar sesión.{' '}
            <a href="/data-room/solicitar" className="text-accent hover:underline">
              Solicitar acceso
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          Al acceder aceptas nuestros{' '}
          <a href="/legal/terminos" className="hover:underline">
            Términos
          </a>{' '}
          y{' '}
          <a href="/legal/privacidad" className="hover:underline">
            Aviso de privacidad
          </a>
        </p>
      </div>
    </div>
  )
}
