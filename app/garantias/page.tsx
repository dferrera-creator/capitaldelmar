import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, AlertTriangle, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Las dos garantías',
  description:
    'Conoce los dos mecanismos de protección al inversionista en Del Mar Capital: el piso de rendimiento referenciado a CETES y el comprador de última instancia.',
}

async function getCetesRate(): Promise<{ rate: number | null; term: string; source: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/cetes`, { next: { revalidate: 3600 } })
    if (!res.ok) return { rate: null, term: '28d', source: 'no disponible' }
    const data = await res.json()
    return data
  } catch {
    return { rate: null, term: '28d', source: 'no disponible' }
  }
}

const PILLARS = [
  {
    title: 'Fideicomiso de garantía',
    description:
      'Los fondos de los inversionistas son administrados por un fideicomiso jurídicamente independiente de Del Mar Capital. Los activos del fideicomiso no son propiedad de la empresa y no están sujetos a sus acreedores en caso de insolvencia.',
    icon: '🏛️',
  },
  {
    title: 'Garantía hipotecaria',
    description:
      'El activo inmobiliario subyacente sirve como garantía real. En caso de incumplimiento del emisor, el fideicomisario puede ejecutar la garantía y con el producto de la liquidación pagar a los inversionistas.',
    icon: '🏠',
  },
  {
    title: 'Transparencia de operación',
    description:
      'El equipo de Del Mar Capital publica reportes trimestrales de ocupación, ingresos y estado del activo. Los inversionistas tienen acceso al Data Room con información actualizada.',
    icon: '📋',
  },
]

const FAQS = [
  {
    q: '¿La garantía CETES es un seguro?',
    a: 'No. Es un compromiso contractual del emisor de completar el rendimiento hasta el piso acordado si los ingresos del activo resultan insuficientes. No es un seguro regulado. El riesgo de crédito del emisor aplica. [PENDIENTE LEGAL — revisar redacción exacta]',
  },
  {
    q: '¿Quién es el comprador de última instancia?',
    a: 'El comprador de última instancia es [PENDIENTE LEGAL — identificar contraparte]. Se trata de una entidad con capacidad financiera suficiente para adquirir la fracción del inversionista al precio de entrada. Las condiciones exactas y el período de vigencia están en revisión legal.',
  },
  {
    q: '¿Qué pasa si el comprador de última instancia no puede comprar?',
    a: 'En ese escenario, el inversionista mantiene sus derechos sobre la fracción y puede intentar venderla en el mercado, aunque la liquidez puede ser limitada. [PENDIENTE LEGAL — detallar mecanismo de respaldo]',
  },
  {
    q: '¿Las garantías se aplican automáticamente?',
    a: 'Las condiciones exactas de activación de cada garantía están definidas en el contrato. No necesariamente son automáticas; pueden requerir notificación y proceso de verificación. [PENDIENTE LEGAL]',
  },
  {
    q: '¿En qué año aplica el piso de rendimiento?',
    a: 'El piso de rendimiento referenciado a CETES aplica durante el plazo acordado en el contrato. Las condiciones específicas por proyecto pueden variar. [PENDIENTE LEGAL — especificar por proyecto]',
  },
]

export default async function GarantiasPage() {
  const cetesData = await getCetesRate()

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Protección al inversionista</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Las dos garantías
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Dos mecanismos de protección diseñados para reducir el riesgo de pérdida del
            inversionista: un piso de rendimiento y un comprador comprometido. Ambos sujetos a
            condiciones contractuales.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-900/40 border border-amber-700 rounded-lg px-3 py-2 text-amber-200 text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            Condiciones en revisión legal — ver marcadores [PENDIENTE LEGAL]
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* CETES rate widget */}
        <section>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wider mb-1">
                CETES {cetesData.term} — tasa de referencia
              </p>
              <p className="font-serif text-3xl font-bold text-ink-900">
                {cetesData.rate != null
                  ? `${(cetesData.rate * 100).toFixed(2)}%`
                  : '[No disponible]'}
                <span className="text-sm font-normal text-ink-400 ml-2">anual</span>
              </p>
              <p className="text-xs text-ink-400 mt-1">Fuente: {cetesData.source}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-500 mb-1">La garantía de piso referencia esta tasa</p>
              <p className="text-sm font-medium text-ink-700">
                CETES + diferencial pactado en contrato
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee 1 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-lg">
              1
            </div>
            <h2 className="font-serif text-2xl font-semibold text-ink-900">
              Piso de rendimiento referenciado a CETES
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-6">
            <p className="text-ink-700">
              El emisor se compromete contractualmente a que el inversionista recibirá un
              rendimiento mínimo equivalente a la tasa CETES 28d más un diferencial acordado,
              independientemente de la ocupación o los ingresos del activo.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-sand-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 mb-2 text-sm">¿Cómo funciona?</h4>
                <p className="text-sm text-ink-600">
                  Si los ingresos del activo no alcanzan para cubrir el piso, el emisor (Del Mar
                  Capital o el vehículo de inversión) aporta la diferencia de su propio flujo
                  operativo o reserva.
                </p>
              </div>
              <div className="bg-sand-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 mb-2 text-sm">Contraparte</h4>
                <p className="text-sm text-ink-600">
                  DM Boutique Servicios Turísticos S.A.P.I. de C.V. (emisor). El riesgo de
                  crédito del emisor aplica.
                </p>
              </div>
            </div>

            <div className="border border-dashed border-amber-300 bg-amber-50 rounded-xl p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                Condiciones sujetas a revisión legal [PENDIENTE LEGAL]
              </p>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Período de vigencia del piso: [PENDIENTE LEGAL]</li>
                <li>• Diferencial sobre CETES: [PENDIENTE LEGAL]</li>
                <li>• Eventos que suspenden la garantía: [PENDIENTE LEGAL]</li>
                <li>• Mecanismo de reclamación: [PENDIENTE LEGAL]</li>
                <li>• Jerarquía de prioridad de pagos: [PENDIENTE LEGAL]</li>
              </ul>
            </div>

            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Este mecanismo no elimina el riesgo de pérdida. Si el emisor no puede cumplir con
                la garantía (por insolvencia u otra causa), el inversionista puede no recibir el
                piso prometido.
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee 2 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-lg">
              2
            </div>
            <h2 className="font-serif text-2xl font-semibold text-ink-900">
              Comprador de última instancia
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-6">
            <p className="text-ink-700">
              Durante el primer año de la inversión (o el período que se especifique en el
              contrato), existe un comprador comprometido que puede adquirir la fracción del
              inversionista al precio de entrada si este desea liquidar su posición.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-sand-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 mb-2 text-sm">¿Cómo funciona?</h4>
                <p className="text-sm text-ink-600">
                  El inversionista notifica al fideicomisario su intención de salida. El comprador
                  de última instancia tiene un plazo para ejercer su opción de compra al precio de
                  entrada pactado.
                </p>
              </div>
              <div className="bg-sand-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 mb-2 text-sm">Contraparte</h4>
                <p className="text-sm text-ink-600">
                  [PENDIENTE LEGAL — identificar entidad compradora y verificar capacidad financiera]
                </p>
              </div>
            </div>

            <div className="border border-dashed border-amber-300 bg-amber-50 rounded-xl p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                Condiciones sujetas a revisión legal [PENDIENTE LEGAL]
              </p>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Período de vigencia del mecanismo: [PENDIENTE LEGAL]</li>
                <li>• Plazo para ejercer la opción de compra: [PENDIENTE LEGAL]</li>
                <li>• Precio de compra garantizado: [PENDIENTE LEGAL]</li>
                <li>• Condiciones de activación: [PENDIENTE LEGAL]</li>
                <li>• Exclusiones: [PENDIENTE LEGAL]</li>
              </ul>
            </div>

            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                La existencia del comprador de última instancia no garantiza liquidez inmediata.
                El mecanismo está sujeto a condiciones contractuales y a la capacidad del comprador.
              </p>
            </div>
          </div>
        </section>

        {/* 3 pillars */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Los 3 pilares de protección
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-white rounded-xl border border-ink-100 p-5">
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-ink-900 mb-2">{p.title}</h3>
                <p className="text-sm text-ink-600">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fideicomiso diagram */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Cómo funciona el fideicomiso
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
              {[
                { label: 'Inversionista', sub: 'Aporta capital', icon: '👤' },
                { label: 'Fideicomiso', sub: 'Administra activo y flujos', icon: '🏛️' },
                { label: 'Activo inmobiliario', sub: 'Garantía real', icon: '🏠' },
              ].map((node, i) => (
                <div key={node.label} className="flex flex-col items-center gap-2">
                  <div className="text-3xl">{node.icon}</div>
                  <div className="font-semibold text-ink-900">{node.label}</div>
                  <div className="text-ink-500 text-xs">{node.sub}</div>
                  {i < 2 && (
                    <div className="hidden sm:block absolute" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-ink-600">
              <p><CheckCircle2 className="w-4 h-4 inline text-green-500 mr-1" />El fideicomiso es independiente del patrimonio de Del Mar Capital.</p>
              <p><CheckCircle2 className="w-4 h-4 inline text-green-500 mr-1" />Los activos del fideicomiso no responden por deudas del emisor.</p>
              <p><CheckCircle2 className="w-4 h-4 inline text-green-500 mr-1" />El fiduciario es una institución financiera regulada [PENDIENTE — identificar fiduciario].</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Preguntas sobre las garantías
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-ink-100 group">
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
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-ink-600 mb-4">
            ¿Quieres entender cómo aplican estas garantías en un proyecto específico?
          </p>
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Hablar con el equipo
          </Link>
        </section>
      </div>
    </div>
  )
}
