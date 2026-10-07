import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Divulgación de riesgos',
  description:
    'Información completa sobre los riesgos asociados a las inversiones ofertadas por Del Mar Capital.',
}

const RISKS = [
  {
    title: 'Pérdida parcial o total del capital',
    severity: 'high',
    body: `Las inversiones en bienes raíces turísticos no están garantizadas por el gobierno ni por
    ningún fondo de protección al inversionista. El capital invertido puede perderse parcial o
    totalmente si los ingresos del activo son insuficientes para cubrir las obligaciones, si el
    activo pierde valor, o si el emisor no puede cumplir sus compromisos contractuales.
    [PENDIENTE LEGAL — confirmar con asesor jurídico]`,
  },
  {
    title: 'Liquidez limitada',
    severity: 'high',
    body: `No existe un mercado secundario organizado para los instrumentos ofertados por Del Mar
    Capital. Una vez realizada la inversión, puede ser difícil o imposible recuperar el capital
    antes del vencimiento del plazo pactado. El mecanismo de "comprador de última instancia" está
    sujeto a condiciones contractuales y a la capacidad financiera de la contraparte.
    [PENDIENTE LEGAL]`,
  },
  {
    title: 'Riesgo operativo',
    severity: 'medium',
    body: `Los rendimientos dependen del desempeño operativo de los activos turísticos, que puede
    verse afectado por: cambios en el equipo de gestión, variaciones en la demanda turística,
    desastres naturales, pandemias u otros eventos extraordinarios, cambios en las plataformas de
    distribución (OTAs), problemas de mantenimiento o rehabilitación, y conflictos laborales.`,
  },
  {
    title: 'Riesgo de crédito del emisor',
    severity: 'high',
    body: `DM Boutique Servicios Turísticos S.A.P.I. de C.V. puede no estar en condiciones de
    cumplir sus obligaciones contractuales si enfrenta dificultades financieras. El piso de
    rendimiento referenciado a CETES y el mecanismo de comprador de última instancia son
    compromisos del emisor, no garantías de un tercero con grado de inversión.
    [PENDIENTE LEGAL — revisar estructura de garantías]`,
  },
  {
    title: 'Riesgo regulatorio',
    severity: 'medium',
    body: `Cambios en la legislación fiscal, en la normativa de turismo, en las leyes de desarrollo
    inmobiliario o en la regulación de valores en México pueden afectar la estructura de la
    inversión, el tratamiento fiscal de los rendimientos o la operación del activo. Del Mar
    Capital no puede garantizar que la regulación aplicable permanezca estable.`,
  },
  {
    title: 'Riesgo de concentración geográfica',
    severity: 'medium',
    body: `Los proyectos actuales están concentrados principalmente en Los Cabos, Baja California
    Sur. Un evento adverso en esa región — como un huracán, una crisis turística regional, un
    cambio en infraestructura de acceso o una caída del turismo internacional — podría afectar
    de manera desproporcionada al portafolio.`,
  },
  {
    title: 'Riesgo cambiario',
    severity: 'low',
    body: `Algunos activos generan ingresos en dólares estadounidenses (USD) mientras que las
    obligaciones pueden estar denominadas en pesos mexicanos (MXN). Variaciones en el tipo de
    cambio pueden afectar los rendimientos reales. Asimismo, inversionistas con base en moneda
    extranjera deben considerar el riesgo cambiario adicional.`,
  },
  {
    title: 'Riesgo de construcción y desarrollo',
    severity: 'medium',
    body: `Para proyectos en etapa de desarrollo, existen riesgos adicionales: sobrecostos de
    construcción, retrasos, defectos de construcción, problemas de permisos y licencias. Estos
    riesgos pueden retrasar el inicio de operaciones y, por tanto, el inicio de la generación
    de ingresos.`,
  },
  {
    title: 'Riesgo de inflación',
    severity: 'low',
    body: `Los rendimientos nominales reportados no son rendimientos reales. Si la inflación supera
    la tasa de rendimiento pactada, el poder adquisitivo del capital puede disminuir a pesar
    de haber obtenido un rendimiento nominal positivo.`,
  },
]

const SEVERITY_CONFIG = {
  high: { label: 'Riesgo Alto', className: 'bg-red-100 text-red-800 border-red-200' },
  medium: { label: 'Riesgo Medio', className: 'bg-orange-50 text-orange-800 border-orange-200' },
  low: { label: 'Riesgo Bajo', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
}

export default function RiesgosPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <section className="bg-red-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-red-300 text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span>Divulgación obligatoria</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Divulgación de riesgos
          </h1>
          <p className="text-red-200 text-lg max-w-2xl">
            Lee esta sección completa antes de invertir. Las inversiones inmobiliarias turísticas
            conllevan riesgos significativos, incluyendo la pérdida total del capital.
          </p>
          <div className="mt-6 bg-red-800/50 border border-red-600 rounded-xl p-4 text-sm text-red-100 max-w-2xl">
            <strong>Aviso legal:</strong> Esta divulgación está en proceso de revisión por asesores
            legales. Los marcadores [PENDIENTE LEGAL] indican secciones que deben revisarse y
            aprobarse antes de publicar. No distribuir sin revisión legal completa.
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Summary box */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-ink-900 mb-2">Resumen de riesgos principales</h2>
              <ul className="space-y-1 text-sm text-ink-700 list-disc list-inside">
                <li>Puedes perder todo o parte del capital invertido.</li>
                <li>La liquidez es limitada; no puedes salir fácilmente antes del vencimiento.</li>
                <li>Los rendimientos dependen del desempeño operativo real del activo.</li>
                <li>Los compromisos contractuales del emisor tienen riesgo de crédito.</li>
                <li>El entorno regulatorio puede cambiar.</li>
              </ul>
              <p className="text-xs text-ink-400 mt-3">
                Si no estás cómodo con estos riesgos, no inviertas. Considera instrumentos más
                conservadores como CETES u otros valores gubernamentales.
              </p>
            </div>
          </div>
        </div>

        {/* Individual risks */}
        {RISKS.map((risk) => {
          const config = SEVERITY_CONFIG[risk.severity as keyof typeof SEVERITY_CONFIG]
          return (
            <div key={risk.title} className="bg-white rounded-2xl border border-ink-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <h3 className="font-serif text-lg font-semibold text-ink-900">{risk.title}</h3>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${config.className}`}
                >
                  {config.label}
                </span>
              </div>
              <p className="text-ink-600 text-sm leading-relaxed whitespace-pre-line">{risk.body}</p>
            </div>
          )
        })}

        {/* Disclaimer */}
        <div className="bg-sand-100 border border-ink-200 rounded-2xl p-6 text-sm text-ink-700 space-y-3">
          <p className="font-semibold">Declaración del inversionista</p>
          <p>
            Al proceder con la inversión, el inversionista declara haber leído, comprendido y
            aceptado todos los riesgos descritos en este documento, así como los riesgos
            adicionales que puedan surgir. [PENDIENTE LEGAL — revisar texto completo de
            declaración]
          </p>
          <p className="text-xs text-ink-400">
            Última actualización: [PENDIENTE] · Revisión legal: [PENDIENTE]
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/garantias" className="text-accent hover:underline">
            Ver garantías
          </Link>
          <span className="text-ink-300">·</span>
          <Link href="/faq" className="text-accent hover:underline">
            Preguntas frecuentes
          </Link>
          <span className="text-ink-300">·</span>
          <Link href="/legal/terminos" className="text-accent hover:underline">
            Términos y condiciones
          </Link>
        </div>
      </div>
    </div>
  )
}
