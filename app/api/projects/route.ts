import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/projects'


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const statusFilter = searchParams.get('status')

    let projects = getAllProjects()

    if (statusFilter) {
      projects = projects.filter(
        (p) => p.status.toUpperCase() === statusFilter.toUpperCase(),
      )
    }

    return NextResponse.json({ projects, count: projects.length })
  } catch (err) {
    console.error('[/api/projects] Error:', err)
    return NextResponse.json({ error: 'Error al cargar proyectos' }, { status: 500 })
  }
}
