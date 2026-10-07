import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Fallback illustrative rate if no real rate is available
const FALLBACK_RATE = 0.1025 // 10.25% — illustrative, not real-time

export async function GET() {
  try {
    // Try to get a cached rate from the DB (valid for today)
    const cached = await prisma.cetesRate.findFirst({
      where: {
        term: '28d',
        OR: [
          { validUntil: { gte: new Date() } },
          { validUntil: null },
        ],
      },
      orderBy: { fetchedAt: 'desc' },
    })

    if (cached) {
      return NextResponse.json({
        rate: Number(cached.rate),
        term: cached.term,
        source: cached.source,
        fetchedAt: cached.fetchedAt.toISOString(),
        cached: true,
      })
    }

    // If no cached value, return fallback with clear labeling
    return NextResponse.json({
      rate: FALLBACK_RATE,
      term: '28d',
      source: 'Valor de referencia ilustrativo — fuente Banxico pendiente de integración',
      fetchedAt: new Date().toISOString(),
      cached: false,
      illustrative: true,
    })
  } catch (err) {
    console.error('[api/cetes] Error:', err)
    return NextResponse.json({
      rate: FALLBACK_RATE,
      term: '28d',
      source: 'Valor de referencia ilustrativo',
      error: true,
    })
  }
}
