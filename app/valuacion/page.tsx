import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { AlertTriangle, Download, BookOpen, BarChart3 } from 'lucide-react'
import { FootballFieldChart, type ValuationData } from '@/components/football-field/football-field-chart'

export const metadata: Metadata = {
  title: 'Metodología de valuación',
  description:
    'Cómo valuamos los proyectos de Del Mar Capital: 5 métodos independientes, escenarios y reconciliación ponderada.',
}

async function getValuationData(slug: string): Promise<ValuationData | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'valuation', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as ValuationData
  } catch {
    return null
  }
}

const METHODS = [
  {
    id: 'dcf_multiples',
    name: 'DCF con múltiplo de salida',
    icon: '📊',
    description:
      'Descontamos los flujos libres de efectivo proyectados a lo largo del horizonte de inversión y añadimos un valor terminal basado en el múltiplo EV/EBITDA que típicamente pagan compradores estratégicos en la industria hotelera turística.',
  },
  {
    id: 'dcf_runoff',
    name: 'DCF run-off (sin valor terminal)',
    icon: '📉',
    description:
      'Escenario conservador: valuamos únicamente los flujos durante el período de inversión, sin asumir ningún valor residual. Sirve como piso de referencia.',
  },
  {
    id: 'ev_ebitda',
    name: 'Múltiplo EV/EBITDA',
    icon: '✖',
    description:
      'Aplicamos un rango de múltiplos observados en transacciones comparables de activos hoteleros turísticos en México. El rango refleja incertidumbre en la ocupación y la maduración del proyecto.',
  },
  {
    id: 'ev_revenue',
    name: 'Múltiplo EV/Ingresos (Ingreso Del Mar)',
    icon: '💰',
    description:
      'Aplicamos un múltiplo sobre el Ingreso Del Mar — la porción de ingresos que fluye al inversionista — no sobre la venta total del activo. Esto refleja mejor la naturaleza de la inversión en fracción de uso.',
  },
  {
    id: 'comp_key',
    name: 'Valor por llave comparable',
    icon: '🔑',
    description:
      'Precio implícito por habitación/llave en transacciones comparables. Ajustamos por ubicación, categoría, ocupación y condición del activo.',
  },
]

export default async function ValuacionPage() {
  const data = await getValuationData('bravante')

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>Metodología</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            Metodología de valuación
          </h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Usamos cinco métodos de valuación independientes para estimar el rango de valor de cada proyecto.
            Ningún método aislado es suficiente; la reconciliación ponderada reduce el sesgo.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Why 5 methods */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            ¿Por qué 5 métodos?
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8">
            <p className="text-ink-700 mb-4">
              Cada método de valuación captura una dimensión distinta del valor: flujos futuros,
              comparables de mercado, valor de reposición, múltiplos de transacción. Cuando varios
              métodos convergen en un rango similar, la convicción aumenta. Cuando divergen,
              identificamos los factores que explican la diferencia.
            </p>
            <p className="text-ink-700 mb-4">
              En bienes raíces turísticos, el flujo de caja descontado captura bien los ingresos
              por renta, pero puede ser sensible a supuestos de ocupación. Los comparables de
              mercado anclan la valuación en transacciones reales. El costo de reposición establece
              un piso. Los múltiplos de EBITDA reflejan lo que pagaría un comprador estratégico.
            </p>
            <p className="text-ink-700">
              El resultado es un <strong>rango de valuación</strong> —no un número puntual— que
              refleja honestamente la incertidumbre inherente a cualquier estimación de valor.
            </p>
          </div>
        </section>

        {/* Methods */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">Los 5 métodos</h2>
          <div className="space-y-4">
            {METHODS.map((m, i) => (
              <div
                key={m.id}
                className="bg-white rounded-xl border border-ink-100 p-5 flex gap-4"
              >
                <div className="text-2xl leading-none mt-0.5">{m.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
                      Método {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink-900 mb-2">{m.name}</h3>
                  <p className="text-sm text-ink-600">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ingreso Del Mar note */}
        <section>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-semibold text-amber-900 mb-3">
              Ingreso Del Mar vs. venta total del activo
            </h3>
            <p className="text-amber-800 text-sm mb-3">
              En el método de múltiplo EV/Ingresos, usamos el <strong>Ingreso Del Mar</strong>:
              la fracción de los ingresos operativos que corresponde al inversionista según el
              contrato de fideicomiso. Esto es diferente —y normalmente menor— que los ingresos
              totales del activo o de la operación hotelera.
            </p>
            <p className="text-amber-800 text-sm">
              Este enfoque es más conservador y más representativo de lo que realmente recibirá
              el inversionista a lo largo del plazo de la inversión.
            </p>
          </div>
        </section>

        {/* Football field chart */}
        {data ? (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">
              Football Field — Bravante Los Cabos
            </h2>
            <p className="text-ink-500 text-sm mb-6">
              Ejemplo ilustrativo. Todas las cifras son estimadas y no constituyen garantía de
              rendimiento ni oferta de inversión.
            </p>
            <FootballFieldChart data={data} />
          </section>
        ) : (
          <section className="bg-white rounded-2xl border border-ink-100 p-8 text-center text-ink-500">
            <p>Modelo de valuación en preparación.</p>
          </section>
        )}

        {/* How to read */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Cómo leer el gráfico football field
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Las barras horizontales',
                body: 'Cada barra muestra el rango mínimo–máximo de un método de valuación bajo el escenario seleccionado. Una barra más larga indica mayor incertidumbre en ese método.',
              },
              {
                title: 'La línea dorada',
                body: 'El valor reconciliado: promedio ponderado de todos los métodos. Es el "mejor estimado puntual" del valor justo del activo bajo el escenario.',
              },
              {
                title: 'La línea punteada',
                body: 'El precio de entrada de la fracción ofertada. Si está a la izquierda de la mayoría de barras, el mercado implica que compras con margen de seguridad.',
              },
              {
                title: 'Los escenarios',
                body: 'Pesimista, Base y Optimista cambian los supuestos de ocupación, crecimiento y múltiplos. El escenario Base es el más probable según el equipo.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-ink-100 p-5"
              >
                <h4 className="font-semibold text-ink-900 mb-2">{item.title}</h4>
                <p className="text-sm text-ink-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download model */}
        <section className="bg-ink-900 text-white rounded-2xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 className="font-serif text-xl font-semibold mb-2">
            Descarga el modelo completo
          </h3>
          <p className="text-ink-300 text-sm mb-6 max-w-sm mx-auto">
            El modelo Excel con todos los supuestos y fórmulas está disponible en el Data Room.
            Requiere acceso previo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/data-room"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              <Download className="w-4 h-4" /> Ir al Data Room
            </Link>
            <Link
              href="/data-room/solicitar"
              className="inline-flex items-center gap-2 border border-ink-600 text-ink-200 px-6 py-3 rounded-lg font-semibold hover:border-ink-400 hover:text-white transition-colors"
            >
              Solicitar acceso
            </Link>
          </div>
        </section>

        {/* Risk note */}
        <section>
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-800">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Advertencia de riesgo</p>
              <p>
                Las valuaciones aquí mostradas son <strong>ilustrativas</strong> y están basadas
                en supuestos que pueden no materializarse. Las inversiones en bienes raíces
                turísticos conllevan riesgo de pérdida parcial o total del capital. Consulta la{' '}
                <Link href="/legal/riesgos" className="underline hover:no-underline">
                  divulgación completa de riesgos
                </Link>{' '}
                antes de invertir.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
