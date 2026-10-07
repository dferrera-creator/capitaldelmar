import { NextResponse } from 'next/server'

export const revalidate = 3600 // 1 hour

interface CetesResponse {
  rate: number
  term: string
  date: string
  source: string
  status: 'live' | 'cached' | 'fallback'
}

export async function GET(): Promise<NextResponse<CetesResponse>> {
  try {
    // In a real implementation, query the DB for a cached rate fetched from Banxico.
    // For now, return a fallback value so the page always loads.
    // Replace this with a Prisma query once the CetesRate model is available.
    const fallback: CetesResponse = {
      rate: 0,
      term: '28d',
      date: new Date().toISOString().split('T')[0],
      source: 'banxico',
      status: 'fallback',
    }

    return NextResponse.json(fallback, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[/api/cetes] Error:', err)
    return NextResponse.json(
      { rate: 0, term: '28d', date: new Date().toISOString().split('T')[0], source: 'banxico', status: 'fallback' },
      { status: 200 },
    )
  }
}
