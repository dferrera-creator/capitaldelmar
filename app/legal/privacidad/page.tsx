import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Aviso de privacidad de DM Boutique Servicios Turísticos S.A.P.I. de C.V.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-semibold mb-3">Aviso de privacidad</h1>
          <p className="text-ink-300 text-sm">
            DM Boutique Servicios Turísticos S.A.P.I. de C.V. · [PENDIENTE LEGAL — revisión
            completa requerida antes de publicar]
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <strong>Nota:</strong> Este aviso de privacidad está pendiente de revisión y aprobación
          legal. Los marcadores [PENDIENTE LEGAL] señalan secciones incompletas. No debe
          publicarse sin la revisión de un abogado especialista en LFPDPPP.
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-10 space-y-6 text-ink-700 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              I. Identidad y domicilio del Responsable
            </h2>
            <p>
              <strong>DM Boutique Servicios Turísticos S.A.P.I. de C.V.</strong>, con domicilio
              en [PENDIENTE LEGAL — domicilio fiscal], en cumplimiento con la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su
              Reglamento, pone a su disposición el presente Aviso de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              II. Datos personales que recabamos
            </h2>
            <p>Para las finalidades descritas en este aviso, recabamos los siguientes datos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Datos de identificación: nombre completo, RFC [PENDIENTE LEGAL]</li>
              <li>Datos de contacto: correo electrónico, teléfono</li>
              <li>Datos financieros: monto de inversión, origen de fondos [PENDIENTE LEGAL]</li>
              <li>Datos de uso del sitio web: dirección IP, cookies [ver Política de cookies]</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              III. Finalidades del tratamiento
            </h2>
            <p><strong>Finalidades primarias (necesarias):</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Gestión del proceso de inversión y firma de contratos</li>
              <li>Cumplimiento de obligaciones legales y regulatorias (antilavado, fiscal)</li>
              <li>Comunicaciones operativas sobre su inversión</li>
            </ul>
            <p className="mt-3"><strong>Finalidades secundarias (opcionales):</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Envío de información sobre nuevos proyectos de inversión</li>
              <li>Encuestas de satisfacción</li>
              <li>Análisis estadístico y mejora del servicio</li>
            </ul>
            <p className="mt-2 text-xs text-ink-400">
              [PENDIENTE LEGAL — detallar finalidades secundarias y mecanismo de opt-out]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              IV. Transferencias de datos
            </h2>
            <p>
              [PENDIENTE LEGAL — identificar terceros receptores: fiduciario, notaría, Banxico,
              SHCP si aplica, proveedores de software (Prisma/PostgreSQL, Resend, HubSpot)]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              V. Derechos ARCO
            </h2>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de
              sus datos personales (derechos ARCO). Para ejercerlos, envíe una solicitud a:{' '}
              <a href="mailto:privacidad@delmarboutique.com" className="text-accent hover:underline">
                privacidad@delmarboutique.com
              </a>{' '}
              [PENDIENTE LEGAL — confirmar correo y proceso]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              VI. Cookies y tecnologías de seguimiento
            </h2>
            <p>
              Este sitio utiliza cookies. Consulte nuestra{' '}
              <a href="/legal/cookies" className="text-accent hover:underline">
                Política de cookies
              </a>{' '}
              para más información.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-ink-900 mb-2">
              VII. Cambios al aviso de privacidad
            </h2>
            <p>
              [PENDIENTE LEGAL — incluir mecanismo de notificación de cambios]
            </p>
          </section>

          <div className="border-t border-ink-100 pt-4 text-xs text-ink-400">
            <p>Fecha de última actualización: [PENDIENTE]</p>
            <p>Versión: [PENDIENTE]</p>
            <p className="mt-1 font-semibold text-amber-700">
              [PENDIENTE LEGAL — aviso completo sujeto a revisión por abogado especialista en
              LFPDPPP antes de publicar]
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
