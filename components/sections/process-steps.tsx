import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: 'Carta de reserva',
    description:
      '7 días para reservar tu participación. Sin compromiso de pago en esta etapa. Bloquea las posiciones disponibles mientras completas tu revisión.',
    duration: '7 días',
  },
  {
    number: '02',
    title: 'Due diligence',
    description:
      '7 días para revisar todos los documentos del proyecto en el data room: contrato, estados financieros, valuación, escrituras y estructura legal.',
    duration: '7 días',
  },
  {
    number: '03',
    title: 'Firma y transferencia',
    description:
      '5 días hábiles para formalizar tu inversión. Firma del contrato de participación y transferencia de fondos a la cuenta del fideicomiso.',
    duration: '5 días hábiles',
  },
]

export function ProcessSteps() {
  return (
    <section className={cn('bg-sand py-20 px-4')}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          El proceso, paso a paso
        </h2>
        <p className="mb-12 text-ink-500">
          De la primera llamada a la firma del contrato: un proceso claro y documentado.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              {/* Step number */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900">
                <span className="font-serif text-sm font-bold text-sand">{step.number}</span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>

              <div className="mt-4 inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800">
                {step.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
