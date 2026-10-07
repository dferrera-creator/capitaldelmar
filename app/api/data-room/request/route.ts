import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, message, ndaAccepted } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nombre requerido (mínimo 2 caracteres)' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Mensaje requerido (mínimo 10 caracteres)' },
        { status: 400 }
      )
    }
    if (!ndaAccepted) {
      return NextResponse.json(
        { error: 'Debes aceptar el acuerdo de confidencialidad' },
        { status: 400 }
      )
    }

    // Save to DB
    const request = await prisma.dataRoomRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        message: message.trim(),
        ndaSigned: ndaAccepted === true,
        status: 'PENDING',
      },
    })

    // Send notification email to team
    const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL ?? 'contacto@delmarboutique.com'
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'noreply@delmarboutique.com',
        to: teamEmail,
        subject: `[Data Room] Nueva solicitud de acceso — ${name}`,
        html: `
          <h2>Nueva solicitud de acceso al Data Room</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company ?? '—'}</p>
          <p><strong>NDA aceptado:</strong> ${ndaAccepted ? 'Sí' : 'No'}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote>${message}</blockquote>
          <p><strong>ID solicitud:</strong> ${request.id}</p>
          <hr />
          <p style="color:#666;font-size:12px">
            Del Mar Capital — Data Room Request System
          </p>
        `,
      })
    }

    return NextResponse.json({
      success: true,
      id: request.id,
      message: 'Solicitud recibida. El equipo la revisará en 1–2 días hábiles.',
    })
  } catch (err) {
    console.error('[data-room/request] Error:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
