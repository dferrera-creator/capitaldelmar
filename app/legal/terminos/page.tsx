import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de uso del sitio web de Del Mar Capital.',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <section className="bg-ink-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-semibold mb-3">Términos y condiciones</h1>
          <p className="text-ink-300 text-sm">
            Del Mar Capital · DM Boutique Servicios Turísticos S.A.P.I. de C.V. ·
            [PENDIENTE LEGAL]
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <strong>Nota:</strong> Estos términos y condiciones están pendientes de revisión y
          aprobación legal. No publicar sin revisión de asesor jurídico.
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-10 space-y-6 text-ink-700 text-sm leading-relaxed">
          {[
            {
              title: '1. Aceptación de los términos',
              body: `Al acceder y usar el sitio web capital.delmarboutique.com ("el Sitio"), aceptas quedar vinculado por estos Términos y Condiciones ("Términos"). Si no estás de acuerdo, no uses el Sitio. [PENDIENTE LEGAL]`,
            },
            {
              title: '2. Naturaleza del sitio y sus contenidos',
              body: `El Sitio proporciona información general sobre los proyectos de inversión ofertados por DM Boutique Servicios Turísticos S.A.P.I. de C.V. ("Del Mar Capital"). La información del Sitio es de carácter informativo y no constituye oferta pública de valores, asesoría de inversión, ni garantía de rendimiento. [PENDIENTE LEGAL]`,
            },
            {
              title: '3. Información ilustrativa',
              body: `Las proyecciones financieras, rendimientos históricos y estimaciones de valor publicadas en el Sitio son ilustrativas y se basan en supuestos que pueden no materializarse. Del Mar Capital no garantiza que los resultados futuros sean similares a los históricos. [PENDIENTE LEGAL — revisar redacción]`,
            },
            {
              title: '4. Restricciones de uso',
              body: `Queda prohibido: (a) reproducir o distribuir contenido del Sitio sin autorización; (b) usar el Sitio para fines ilegales; (c) intentar acceder a áreas restringidas sin autorización; (d) compartir credenciales de acceso al Data Room. [PENDIENTE LEGAL]`,
            },
            {
              title: '5. Propiedad intelectual',
              body: `Todos los contenidos del Sitio — textos, gráficos, logotipos, imágenes, modelos financieros — son propiedad de DM Boutique Servicios Turísticos S.A.P.I. de C.V. o de sus licenciantes. [PENDIENTE LEGAL]`,
            },
            {
              title: '6. Limitación de responsabilidad',
              body: `En la máxima medida permitida por la ley, Del Mar Capital no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso del Sitio o de las inversiones realizadas. [PENDIENTE LEGAL — revisar límites aplicables en México]`,
            },
            {
              title: '7. Modificaciones',
              body: `Del Mar Capital se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán en vigor al publicarse en el Sitio. [PENDIENTE LEGAL]`,
            },
            {
              title: '8. Ley aplicable y jurisdicción',
              body: `Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para la resolución de controversias, las partes se someten a la jurisdicción de los tribunales competentes en [PENDIENTE LEGAL — ciudad]. [PENDIENTE LEGAL]`,
            },
            {
              title: '9. Contacto',
              body: `Para consultas sobre estos Términos: contacto@delmarboutique.com [PENDIENTE LEGAL — confirmar datos de contacto]`,
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-base font-semibold text-ink-900 mb-2">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}

          <div className="border-t border-ink-100 pt-4 text-xs text-ink-400">
            <p>Fecha de última actualización: [PENDIENTE]</p>
            <p className="font-semibold text-amber-700 mt-1">
              [PENDIENTE LEGAL — revisión jurídica completa requerida antes de publicar]
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
