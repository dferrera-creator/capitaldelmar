import fs from 'fs'
import path from 'path'

export interface ProjectData {
  slug: string
  name: string
  status: 'OPEN' | 'COMING_SOON' | 'CLOSED' | 'ILUSTRATIVO' | 'ESTIMADO'
  tagline: string
  location: string
  assetType: string
  assetTypeLabel: string
  displayOrder?: number
  coverImage?: string
  active?: boolean
  what_you_buy: string
  returnRate: number
  returnRateDisplay: string
  returnType: 'FIXED' | 'ESTIMATED' | 'HISTORICAL'
  returnNote: string
  minTicket: number
  minTicketDisplay: string
  termMonths: number
  availableSlots: number
  totalSlots: number
  benefits: string[]
  protections: string[]
  risks: string[]
  valuation?: {
    status: string
    footballField: Array<{
      method: string
      low: number
      high: number
    }>
  }
  founderTicket?: Record<string, unknown>
}

export function getProject(slug: string): ProjectData {
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.json`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as ProjectData
}

export function getAllProjects(): ProjectData[] {
  const dir = path.join(process.cwd(), 'content', 'projects')
  const files = fs.readdirSync(dir)
  return files
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as ProjectData
    })
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
}

export function getProjectSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content', 'projects')
  const files = fs.readdirSync(dir)
  return files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
}
