import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import faqData from '@/content/faq.json'

interface FaqItem {
  id: string
  question: string
  answer: string
  isRisk?: boolean
}

export function FaqRisks() {
  const items = faqData as FaqItem[]

  return (
    <section className={cn('bg-white py-20 px-4')}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <p className="mb-10 text-ink-500">
          Las preguntas más comunes antes de invertir, con respuestas directas.
        </p>

        <Accordion type="single" collapsible className="space-y-0">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={cn(
                item.isRisk && 'border-risk/30 bg-red-50/50',
              )}
            >
              <AccordionTrigger
                className={cn(
                  item.isRisk && 'text-risk hover:text-risk',
                )}
              >
                <span className="flex items-center gap-2">
                  {item.isRisk && <AlertTriangle className="h-4 w-4 shrink-0 text-risk" />}
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-ink-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Link
            href="/legal/riesgos"
            className="inline-flex items-center gap-1 rounded-lg border border-risk/30 px-4 py-2 text-sm font-medium text-risk hover:bg-red-50"
          >
            <AlertTriangle className="h-4 w-4" />
            Ver todos los riesgos →
          </Link>
        </div>
      </div>
    </section>
  )
}
