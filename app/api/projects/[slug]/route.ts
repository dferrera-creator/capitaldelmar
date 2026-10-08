import fs from 'fs'
import path from 'path'
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
  } catch {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  }

  const { slug } = await params
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.json`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }

  const { field, value } = (await req.json()) as { field: string; value: unknown }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  // Support dot-notation paths like "risks.0" or "what_you_buy"
  const parts = String(field).split('.')
  let cursor = data
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (cursor[key] === undefined || cursor[key] === null) {
      return NextResponse.json({ error: `Field "${field}" not found` }, { status: 400 })
    }
    cursor = cursor[key]
  }
  cursor[parts[parts.length - 1]] = value

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ ok: true })
}
