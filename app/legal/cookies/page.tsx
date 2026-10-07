import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Información sobre las cookies que utiliza el sitio web de Del Mar Capital.',
}

const COOKIE_TYPES = [
  {
    category: 'Cookies estrictamente necesarias',
    canOptOut: false,
    description:
      'Son imprescindibles para el funcionamiento del sitio. Sin ellas, funciones como la autenticación o el carrito de simulación no estarían disponibles.',
    examples: [
      { name: 'next-auth.session-token', purpose: 'Sesión de usuario autenticado', duration: '30 días' },
      { name: '__Secure-next-auth.session-token', purpose: 'Sesión segura (HTTPS)', duration: '30 días' },
    ],
  },
  {
    category: 'Cookies analíticas',
    canOptOut: true,
    description:
      'Nos ayudan a entender cómo los visitantes interactúan con el sitio. Los datos son anónimos o seudónimos.',
    examples: [
      { name: '_ga, _ga_*', purpose: 'Google Analytics — conteo de visitas y páginas', duration: '2 años' },
      { name: 'ph_*', purpose: 'PostHog — análisis de producto', duration: '1 año' },
    ],
  },
  {
    category: 'Cookies de marketing',
    canOptOut: true,
    description:
      'Utilizadas para mostrar publicidad relevante. Actualmente no utilizamos cookies de marketing de terceros. [PENDIENTE — confirmar si aplica]',
    examples: [],
  },
  {
    category: 'Cookies de preferencias',
    canOptOut: true,
    description:
      'Recuerdan tus preferencias de navegación, como el banner de cookies o el idioma.',
    examples: [
      { name: 'dm-cookie-consent', purpose: 'Tu preferencia de aceptación de cookies', duration: '1 año' },
    ],
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-semibold mb-3">Política de cookies</h1>
          <p className="text-ink-300 text-sm">
            Del Mar Capital · DM Boutique Servicios Turísticos S.A.P.I. de C.V.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 text-ink-700 text-sm leading-relaxed">
          <h2 className="font-serif text-base font-semibold text-ink-900 mb-2">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
            dispositivo cuando los visitas. Sirven para hacer funcionar el sitio correctamente,
            recordar tus preferencias y, en algunos casos, recopilar estadísticas de uso.
          </p>
        </div>

        {COOKIE_TYPES.map((type) => (
          <div key={type.category} className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-serif text-base font-semibold text-ink-900">{type.category}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded border font-medium ${
                  type.canOptOut
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-ink-50 text-ink-500 border-ink-200'
                }`}
              >
                {type.canOptOut ? 'Puedes rechazarlas' : 'No se pueden rechazar'}
              </span>
            </div>
            <p className="text-sm text-ink-600 mb-4">{type.description}</p>
            {type.examples.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-sand-50 text-ink-500">
                      <th className="text-left px-3 py-2">Cookie</th>
                      <th className="text-left px-3 py-2">Propósito</th>
                      <th className="text-left px-3 py-2">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {type.examples.map((ex) => (
                      <tr key={ex.name}>
                        <td className="px-3 py-2 font-mono text-ink-700">{ex.name}</td>
                        <td className="px-3 py-2 text-ink-600">{ex.purpose}</td>
                        <td className="px-3 py-2 text-ink-500">{ex.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-ink-100 p-6 text-sm text-ink-700 space-y-3">
          <h3 className="font-serif text-base font-semibold text-ink-900">
            ¿Cómo gestionar las cookies?
          </h3>
          <p>
            Puedes aceptar o rechazar las cookies no esenciales a través del banner que aparece
            al visitar el sitio por primera vez. También puedes configurar tu navegador para
            bloquear cookies, aunque esto puede afectar el funcionamiento del sitio.
          </p>
          <p>
            Para más información sobre cómo manejamos tus datos personales, consulta nuestro{' '}
            <a href="/legal/privacidad" className="text-accent hover:underline">
              Aviso de privacidad
            </a>
            .
          </p>
          <p className="text-xs text-ink-400 border-t border-ink-100 pt-3">
            Última actualización: [PENDIENTE] · Versión: 1.0
          </p>
        </div>
      </div>
    </div>
  )
}
