import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyTurnstile } from '@/lib/turnstile'
import { createContact } from '@/lib/hubspot'

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

const LeadSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo no válido'),
  phone: z.string().optional(),
  projectSlug: z.string().optional(),
  amountApprox: z.number().optional(),
  termMonths: z.number().optional(),
  privacyAccepted: z.literal(true, 'Debes aceptar el aviso de privacidad'),
  turnstileToken: z.string().optional(),
})

function calcLeadScore(data: z.infer<typeof LeadSchema>): number {
  let score = 0
  if (data.amountApprox) {
    if (data.amountApprox > 1_000_000) score += 30
    else if (data.amountApprox > 500_000) score += 20
  }
  if (data.projectSlug) score += 20
  return score
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta en 10 minutos.' },
        { status: 429 },
      )
    }

    // Parse body
    const body = await req.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Verify Turnstile
    if (data.turnstileToken) {
      const valid = await verifyTurnstile(data.turnstileToken, ip)
      if (!valid) {
        return NextResponse.json({ error: 'Verificación fallida' }, { status: 403 })
      }
    }

    const leadScore = calcLeadScore(data)
    let leadId: string | null = null

    // Save to DB
    try {
      const { prisma } = await import('@/lib/prisma')
      const lead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          projectSlug: data.projectSlug ?? null,
          amountApprox: data.amountApprox ?? null,
          termMonths: data.termMonths ?? null,
          score: leadScore,
          source: 'website',
        },
      })
      leadId = lead?.id ?? null
    } catch {
      // DB not ready or model missing — continue
    }

    // Send to HubSpot
    const hubspotId = await createContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      projectSlug: data.projectSlug,
      amountApprox: data.amountApprox,
      termMonths: data.termMonths,
      leadScore,
    })

    return NextResponse.json({
      success: true,
      leadId: leadId ?? hubspotId ?? crypto.randomUUID(),
    })
  } catch (err) {
    console.error('[/api/leads] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
