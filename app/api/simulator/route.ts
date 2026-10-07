import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, termMonths, projectSlug, email, result } = body

    // Validate
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    if (!amount || amount < 100000 || amount > 10000000) {
      return NextResponse.json({ error: 'Monto fuera de rango' }, { status: 400 })
    }
    if (![12, 24, 36, 48, 60].includes(termMonths)) {
      return NextResponse.json({ error: 'Plazo inválido' }, { status: 400 })
    }

    // Save simulator run to DB
    const run = await prisma.simulatorRun.create({
      data: {
        email: email.trim().toLowerCase(),
        amount,
        termMonths,
        projectSlug: projectSlug ?? null,
        scenarioBear: result?.scenarios?.bear ?? {},
        scenarioBase: result?.scenarios?.base ?? {},
        scenarioBull: result?.scenarios?.bull ?? {},
        emailSent: false,
      },
    })

    // Format currency helper
    const fmt = (n: number) =>
      new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(n)

    // Send results email
    if (process.env.RESEND_API_KEY && result) {
      const { base, bear, bull } = result.scenarios ?? {}
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'noreply@delmarboutique.com',
        to: email.trim().toLowerCase(),
        subject: `Tu simulación de inversión — Del Mar Capital`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0d2137">
            <h2 style="font-family:Georgia,serif;color:#0d2137">Tu simulación de inversión</h2>
            <p>Hola, aquí están los resultados de tu simulación:</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <thead>
                <tr style="background:#f9f0d9">
                  <th style="text-align:left;padding:8px;border:1px solid #e2e8f0">Escenario</th>
                  <th style="text-align:right;padding:8px;border:1px solid #e2e8f0">Monto inicial</th>
                  <th style="text-align:right;padding:8px;border:1px solid #e2e8f0">Monto final est.</th>
                  <th style="text-align:right;padding:8px;border:1px solid #e2e8f0">TIR anual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:8px;border:1px solid #e2e8f0">Pesimista</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${fmt(amount)}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${fmt(bear?.finalAmount ?? 0)}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${bear?.irr?.toFixed(1)}%</td>
                </tr>
                <tr style="background:#fff8eb">
                  <td style="padding:8px;border:1px solid #e2e8f0"><strong>Base</strong></td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${fmt(amount)}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0"><strong>${fmt(base?.finalAmount ?? 0)}</strong></td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0"><strong>${base?.irr?.toFixed(1)}%</strong></td>
                </tr>
                <tr>
                  <td style="padding:8px;border:1px solid #e2e8f0">Optimista</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${fmt(amount)}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${fmt(bull?.finalAmount ?? 0)}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e2e8f0">${bull?.irr?.toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:12px;color:#627d98;border-top:1px solid #e2e8f0;padding-top:12px">
              <strong>Aviso:</strong> Esta simulación es orientativa y no constituye promesa de rendimiento.
              Las cifras son ilustrativas. Toda inversión conlleva riesgo de pérdida.
            </p>
            <p style="margin-top:16px">
              <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://capital.delmarboutique.com'}/agendar"
                 style="background:#e89b0a;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
                Hablar con un asesor
              </a>
            </p>
          </div>
        `,
      })

      await prisma.simulatorRun.update({
        where: { id: run.id },
        data: { emailSent: true },
      })
    }

    return NextResponse.json({ success: true, id: run.id })
  } catch (err) {
    console.error('[simulator] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
