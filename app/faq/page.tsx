import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, HelpCircle, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description:
    'Respuestas a las preguntas más comunes sobre invertir con Del Mar Capital.',
}

interface FAQ {
  q: string
  a: string
  category: string
}

const FAQS: FAQ[] = [
  // Inversión
  {
    category: 'Inversión',
    q: '¿Cuál es el monto mínimo de inversión?',
    a: 'El monto mínimo varía por proyecto. Para Bravante Los Cabos el mínimo es $500,000 MXN. Consulta la ficha de cada proyecto para el mínimo específico.',
  },
  {
    category: 'Inversión',
    q: '¿Qué proyectos están disponibles para invertir?',
    a: 'Los proyectos disponibles se actualizan en nuestra sección de proyectos. Actualmente incluyen Bravante Los Cabos, Reserva San Gregorio y otros en proceso de apertura.',
  },
  {
    category: 'Inversión',
    q: '¿Cómo sé que es una inversión legítima?',
    a: 'Cada inversión está respaldada por un contrato firmado ante notario, un fideicomiso de garantía sobre el activo inmobiliario y un fiduciario institucional. Recomendamos consultar a un abogado independiente antes de invertir.',
  },
  {
    category: 'Inversión',
    q: '¿Puedo invertir desde el extranjero?',
    a: 'Sí, en principio. Sin embargo, existen consideraciones fiscales y regulatorias específicas para inversionistas no residentes. Consulta con el equipo antes de proceder.',
  },
  // Rendimientos
  {
    category: 'Rendimientos',
    q: '¿Los rendimientos están garantizados?',
    a: 'No. Los rendimientos no están garantizados. Algunas estructuras incluyen un "piso de rendimiento" referenciado a CETES, que es un compromiso contractual del emisor — no un seguro. El riesgo de crédito del emisor aplica. Ver sección de garantías.',
  },
  {
    category: 'Rendimientos',
    q: '¿Cómo se calculan los rendimientos?',
    a: 'Los rendimientos se expresan como TIR (Tasa Interna de Retorno) anualizada sobre el capital invertido durante el plazo. Ver metodología completa en la sección Track Record.',
  },
  {
    category: 'Rendimientos',
    q: '¿Cuándo recibo los pagos?',
    a: 'El calendario de pagos está definido en el contrato de cada proyecto (mensual, trimestral o al vencimiento). Consulta la ficha del proyecto específico.',
  },
  {
    category: 'Rendimientos',
    q: '¿Los rendimientos incluyen impuestos?',
    a: 'No. Los rendimientos reportados son nominales antes de ISR. Los rendimientos pueden estar sujetos a retención según la normativa fiscal aplicable. Consulta a un contador para tu situación específica.',
  },
  // Liquidez y riesgos
  {
    category: 'Liquidez y riesgos',
    q: '¿Puedo salir antes del vencimiento?',
    a: 'En general, estas inversiones tienen liquidez limitada. No existe mercado secundario activo. Algunos proyectos incluyen mecanismos de salida anticipada (ver "comprador de última instancia"), pero están sujetos a condiciones contractuales.',
  },
  {
    category: 'Liquidez y riesgos',
    q: '¿Qué pasa si el proyecto fracasa?',
    a: 'En caso de incumplimiento grave, el fideicomisario puede ejecutar la garantía hipotecaria sobre el activo y con el producto de la liquidación pagar a los inversionistas. Sin embargo, el valor de liquidación puede ser menor al capital invertido.',
  },
  {
    category: 'Liquidez y riesgos',
    q: '¿Qué pasa si Del Mar Capital quiebra?',
    a: 'El fideicomiso es una estructura jurídica independiente. Los activos del fideicomiso, en principio, no son propiedad de Del Mar Capital y no estarían sujetos a sus acreedores. [PENDIENTE LEGAL — confirmar con fiduciario la protección exacta].',
  },
  // Proceso
  {
    category: 'Proceso',
    q: '¿Cuánto tiempo tarda el proceso de inversión?',
    a: 'Desde la primera consulta hasta la confirmación de inversión: típicamente 5–15 días hábiles, dependiendo de la velocidad con que se completa el proceso de firma y transferencia.',
  },
  {
    category: 'Proceso',
    q: '¿Necesito abrir una cuenta especial?',
    a: 'No. La transferencia se realiza por SPEI desde tu cuenta bancaria habitual al fideicomiso. No se requiere cuenta de inversión especial.',
  },
  {
    category: 'Proceso',
    q: '¿Qué documentos necesito?',
    a: 'Identificación oficial vigente, comprobante de domicilio reciente y comprobante de origen de fondos (para cumplimiento antilavado). El equipo te indicará el listado completo al inicio del proceso.',
  },
]

const RISKS = [
  {
    title: 'Pérdida parcial o total del capital',
    description:
      'Si la ocupación turística cae de manera sostenida o si el activo pierde valor, el inversionista puede recuperar menos de lo que invirtió.',
  },
  {
    title: 'Liquidez limitada',
    description:
      'No existe mercado secundario activo. Vender la fracción antes del vencimiento puede ser difícil o imposible.',
  },
  {
    title: 'Riesgo operativo',
    description:
      'Cambios en el equipo operativo, en las plataformas de distribución o en la normativa turística pueden afectar los ingresos.',
  },
  {
    title: 'Riesgo de crédito del emisor',
    description:
      'Si DM Boutique Servicios Turísticos no puede cumplir sus obligaciones contractuales (garantía de piso, comprador de última instancia), el inversionista puede no recibir los beneficios prometidos.',
  },
  {
    title: 'Riesgo regulatorio',
    description:
      'Cambios en la legislación fiscal, inmobiliaria o turística en México pueden afectar el valor y la rentabilidad de los activos.',
  },
  {
    title: 'Riesgo de concentración geográfica',
    description:
      'Los principales activos están concentrados en Los Cabos, BCS. Un evento adverso en esa región (desastre natural, crisis turística) afectaría de manera desproporcionada al portafolio.',
  },
]

const categories = [...new Set(FAQS.map((f) => f.category))]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Respuestas directas a las preguntas más comunes. Si no encuentras lo que buscas,
            habla con el equipo.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        {/* FAQ sections by category */}
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">{cat}</h2>
            <div className="space-y-2">
              {FAQS.filter((f) => f.category === cat).map((faq) => (
                <details
                  key={faq.q}
                  className="bg-white rounded-xl border border-ink-100 group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink-900 list-none">
                    <span>{faq.q}</span>
                    <span className="text-ink-400 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                      ↓
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-ink-600 border-t border-ink-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* ¿Qué puede salir mal? */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">
            ¿Qué puede salir mal?
          </h2>
          <p className="text-ink-500 text-sm mb-6">
            Ser honesto sobre los riesgos es central a nuestra propuesta. Aquí los principales:
          </p>
          <div className="space-y-3">
            {RISKS.map((risk) => (
              <div
                key={risk.title}
                className="flex items-start gap-3 bg-white rounded-xl border border-ink-100 p-4"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink-900 text-sm">{risk.title}</p>
                  <p className="text-sm text-ink-600 mt-0.5">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/legal/riesgos" className="text-sm text-accent hover:underline">
              Ver divulgación completa de riesgos →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink-900 text-white rounded-2xl p-8 text-center">
          <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 className="font-serif text-xl font-semibold mb-2">
            ¿Aún tienes preguntas?
          </h3>
          <p className="text-ink-300 text-sm mb-6 max-w-sm mx-auto">
            Agenda una llamada de 30 minutos con un asesor del equipo. Sin compromiso.
          </p>
          <Link
            href="/agendar"
            className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Agendar llamada
          </Link>
        </section>
      </div>
    </div>
  )
}
