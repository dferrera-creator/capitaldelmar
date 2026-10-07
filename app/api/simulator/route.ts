import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const VALID_TERMS = [12, 24, 36, 48, 60] as const

const SimulatorInput = z.object({
  email: z.string().email(),
  amount: z.number().min(100000, 'El monto mínimo es $100,000 MXN'),
  termMonths: z.number().refine((v) => (VALID_TERMS as readonly number[]).includes(v), {
    message: 'Plazo no válido',
  }),
  projectSlug: z.string().optional(),
})

interface Scenario {
  label: string
  rate: number
  finalAmount: number
  gain: number
}

function calcFinalAmount(amount: number, annualRate: number, termMonths: number): number {
  return amount * Math.pow(1 + annualRate, termMonths / 12)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = SimulatorInput.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { email, amount, termMonths, projectSlug } = parsed.data

    // Three illustrative scenarios
    const BEAR_RATE = 0.08
    const BASE_RATE = 0.14
    const BULL_RATE = 0.20

    const scenarios: Scenario[] = [
      {
        label: 'Conservador',
        rate: BEAR_RATE,
        finalAmount: Math.round(calcFinalAmount(amount, BEAR_RATE, termMonths)),
        gain: Math.round(calcFinalAmount(amount, BEAR_RATE, termMonths) - amount),
      },
      {
        label: 'Base',
        rate: BASE_RATE,
        finalAmount: Math.round(calcFinalAmount(amount, BASE_RATE, termMonths)),
        gain: Math.round(calcFinalAmount(amount, BASE_RATE, termMonths) - amount),
      },
      {
        label: 'Optimista',
        rate: BULL_RATE,
        finalAmount: Math.round(calcFinalAmount(amount, BULL_RATE, termMonths)),
        gain: Math.round(calcFinalAmount(amount, BULL_RATE, termMonths) - amount),
      },
    ]

    // Save to DB if available
    try {
      const { prisma } = await import('@/lib/prisma')
      // SimulatorRun model may not exist yet — catch and continue
      await (prisma as any).simulatorRun?.create?.({
        data: {
          email,
          amountMxn: amount,
          termMonths,
          projectSlug: projectSlug ?? null,
          scenariosJson: JSON.stringify(scenarios),
        },
      })
    } catch {
      // DB not available or model missing — continue anyway
    }

    // Send email if Resend configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Del Mar Capital <capital@delmarboutique.com>',
          to: email,
          subject: `Tu simulación de inversión — Del Mar Capital`,
          text: [
            'Hola,',
            '',
            `Aquí están los escenarios para tu inversión de $${amount.toLocaleString('es-MX')} MXN a ${termMonths} meses:`,
            '',
            ...scenarios.map(
              (s) =>
                `${s.label}: $${s.finalAmount.toLocaleString('es-MX')} MXN (+$${s.gain.toLocaleString('es-MX')} MXN a ${(s.rate * 100).toFixed(0)}% anual)`,
            ),
            '',
            'Nota: Cálculo orientativo e ILUSTRATIVO. No constituye promesa de rendimiento. Los rendimientos reales dependen de las condiciones de cada proyecto y pueden ser menores o nulos.',
            '',
            'Equipo Del Mar Capital',
          ].join('\n'),
        })
      } catch (emailErr) {
        console.error('[Simulator] Email error:', emailErr)
      }
    }

    return NextResponse.json({
      scenarios,
      note: 'Proyecciones ILUSTRATIVAS. No constituyen promesa de rendimiento. Las tasas reales dependen del proyecto y las condiciones contractuales.',
    })
  } catch (err) {
    console.error('[/api/simulator] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
