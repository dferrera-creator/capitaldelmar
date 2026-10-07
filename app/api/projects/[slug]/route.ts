import { NextRequest, NextResponse } from 'next/server'
import { getProject } from '@/lib/projects'


export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const project = getProject(slug)
    return NextResponse.json({ project })
  } catch (err) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }
}
