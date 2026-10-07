import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FileText, TrendingUp, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description:
    'Entiende el proceso de inversión en Del Mar Capital: desde el análisis del proyecto hasta el cobro de rendimientos.',
}

const STEPS = [
  {
    number: '01',
    title: 'Analiza y decide',
    icon: FileText,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    description:
      'Revisas la ficha del proyecto: activo, ubicación, rendimiento esperado, plazo y estructura legal. Lees los riesgos con honestidad. Si tienes dudas, agendas una llamada con el equipo.',
    details: [
      'Ficha completa del proyecto disponible en la web',
      'Modelo de valuación en el Data Room (solicitar acceso)',
      'Llamada gratuita de 30 min con asesores',
      'Revisión independiente recomendada (abogado o contador)',
    ],
  },
  {
    number: '02',
    title: 'Firma y transfiere',
    icon: Shield,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    description:
      'Firmas el contrato de inversión (fracción de uso o contrato de préstamo, según el proyecto) y realizas la transferencia al fideicomiso de garantía. El notario certifica la operación.',
    details: [
      'Contrato revisado por notario público',
      'Fideicomiso de garantía sobre el activo inmobiliario',
      'Transferencia bancaria al fideicomiso (SPEI)',
      'Confirmación de registro en 24–48 horas hábiles',
    ],
  },
  {
    number: '03',
    title: 'Recibe rendimientos',
    icon: TrendingUp,
    color: 'bg-green-50 text-green-700 border-green-200',
    description:
      'Durante el plazo de la inversión recibes pagos de rendimiento según las condiciones pactadas. Al vencimiento, recibes el reembolso del capital más el rendimiento final.',
    details: [
      'Pagos periódicos según calendario del contrato',
      'Rendimiento referenciado a CETES 28d (ver condiciones)',
      'Reembolso al vencimiento en SPEI',
      'Reporte trimestral de operación del activo',
    ],
  },
]

const ASSET_TYPES = [
  {
    title: 'Fracción de uso',
    description:
      'Adquieres una fracción de los derechos de uso y goce de un activo inmobiliario turístico. El operador gestiona la propiedad y te distribuye la proporción de ingresos que corresponde a tu fracción.',
    example: 'Ejemplo: Bravante Los Cabos — villas de lujo con operador integrado.',
  },
  {
    title: 'Préstamo con garantía hipotecaria',
    description:
      'Otorgas un préstamo al desarrollador respaldado por una hipoteca sobre el activo. Recibes una tasa de interés fija o referenciada a CETES durante el plazo. Al vencimiento, se libera la garantía.',
    example: 'Ejemplo: proyectos en etapa de desarrollo o estabilización.',
  },
  {
    title: 'Participación en ingresos',
    description:
      'Tu inversión te da derecho a una fracción de los ingresos operativos netos del proyecto (Ingreso Del Mar) durante el plazo pactado.',
    example: 'Ejemplo: propiedades con operación turística establecida.',
  },
]

const FAQS = [
  {
    q: '¿Cuál es el monto mínimo de inversión?',
    a: 'El monto mínimo varía por proyecto. Para Bravante Los Cabos el mínimo es $500,000 MXN. Consulta cada ficha de proyecto para el mínimo específico.',
  },
  {
    q: '¿Hay liquidez? ¿Puedo salir antes del plazo?',
    a: 'En general, estas inversiones tienen liquidez limitada. No existe mercado secundario activo. El contrato puede incluir cláusulas de salida anticipada con ciertas condiciones; revisa el contrato específico.',
  },
  {
    q: '¿Están mis fondos protegidos?',
    a: 'Los fondos son transferidos a un fideicomiso de garantía sobre el activo inmobiliario. La garantía sobre el bien raíz ofrece protección, pero no elimina el riesgo de pérdida.',
  },
  {
    q: '¿Qué pasa si Del Mar Capital quiebra?',
    a: 'El fideicomiso es una estructura jurídica independiente. Los activos del fideicomiso no son propiedad de Del Mar Capital y no están sujetos a sus acreedores. [PENDIENTE LEGAL — confirmar con fiduciario]',
  },
  {
    q: '¿Hay implicaciones fiscales?',
    a: 'Los rendimientos pueden estar sujetos a retención de ISR. Te recomendamos consultar a un contador para tu situación específica. Del Mar Capital entrega la documentación necesaria para declarar.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Cómo funciona
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            De la selección del proyecto al cobro de rendimientos: el proceso completo en tres
            pasos claros.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-20">
        {/* 3-step process */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-10 text-center">
            El proceso de inversión
          </h2>
          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl border border-ink-100 overflow-hidden"
                >
                  <div className="p-6 sm:p-8 flex gap-6">
                    <div className="hidden sm:flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center ${step.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-ink-100 mt-4 mb-0" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-ink-400 bg-ink-50 px-2 py-0.5 rounded">
                          {step.number}
                        </span>
                        <h3 className="font-serif text-xl font-semibold text-ink-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-ink-600 mb-4">{step.description}</p>
                      <ul className="space-y-1">
                        {step.details.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-ink-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Línea de tiempo típica
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-ink-100" />
              <div className="space-y-6">
                {[
                  { day: 'Día 0', label: 'Primera consulta', desc: 'Agendas llamada con el equipo o descargas la ficha.' },
                  { day: 'Días 1–5', label: 'Due diligence', desc: 'Revisas el Data Room, modelo financiero y contrato.' },
                  { day: 'Días 5–10', label: 'Firma y transferencia', desc: 'Firmas el contrato y transfieres al fideicomiso.' },
                  { day: 'Día 10–15', label: 'Confirmación', desc: 'Recibes confirmación de registro y bienvenida.' },
                  { day: 'Según contrato', label: 'Primeros rendimientos', desc: 'Pagos según el calendario del contrato (mensual, trimestral o al vencimiento).' },
                  { day: 'Vencimiento', label: 'Reembolso total', desc: 'Capital más rendimiento final transferido a tu cuenta.' },
                ].map((item) => (
                  <div key={item.day} className="pl-10 relative">
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                    <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-mono font-semibold text-accent">{item.day}</span>
                      <span className="font-semibold text-ink-900">{item.label}</span>
                    </div>
                    <p className="text-sm text-ink-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you buy */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">¿Qué compras?</h2>
          <p className="text-ink-500 mb-6">
            Los proyectos de Del Mar Capital pueden tomar distintas estructuras jurídicas. Es
            importante entender cuál aplica a cada proyecto.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {ASSET_TYPES.map((t) => (
              <div key={t.title} className="bg-white rounded-xl border border-ink-100 p-5">
                <h3 className="font-semibold text-ink-900 mb-2">{t.title}</h3>
                <p className="text-sm text-ink-600 mb-3">{t.description}</p>
                <p className="text-xs text-ink-400 italic">{t.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl border border-ink-100 group"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-ink-900 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-sm text-ink-600 border-t border-ink-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/faq" className="text-sm text-accent hover:underline">
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink-900 text-white rounded-2xl p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold mb-3">¿Listo para empezar?</h3>
          <p className="text-ink-300 mb-6 max-w-sm mx-auto">
            Agenda una llamada sin compromiso con el equipo de Del Mar Capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/agendar"
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Agendar llamada
            </Link>
            <Link
              href="/simulador"
              className="border border-ink-600 text-ink-200 px-8 py-3 rounded-lg font-semibold hover:border-ink-400 hover:text-white transition-colors"
            >
              Probar simulador
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
