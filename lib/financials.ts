import fs from 'fs'
import path from 'path'
import type { ValuationData } from '@/components/football-field/football-field-chart'

export interface FinancialKPIs {
  ventaTotalAnio1: number | null
  ingresoDelMarAnio1: number | null
  ebitdaAnio1: number | null
  ebitdaAnio5: number | null
  ebitdaAcumulado60m: number | null
  fcffNormalizado: number | null
  valorContrato: number | null
  evEbitda: number | null
  valorPorLlave: number | null
  tir: number | null
  vpnWacc: number | null
  moic: number | null
  deficitMaximoCaja: number | null
  dscrMinimo: number | null
}

export interface PLRow {
  year: number
  ventaTotal: number | null
  ingresoDelMar: number | null
  ebitda: number | null
  ebitdaMargin: number | null
}

export interface ScenarioData {
  label: string
  description: string
  tir: number | null
  moic: number | null
  ebitdaAnio1: number | null
  vpn: number | null
}

export interface StressTest {
  id: string
  label: string
  revparImpact: number
  description: string
  tir: number | null
  moic: number | null
}

export interface UnitEconomics {
  adr: number | null
  occupancy: number | null
  revpar: number | null
  channelMix: {
    airbnb: number | null
    vrbo: number | null
    direct: number | null
    other: number | null
  }
}

export interface FinancialAssumptions {
  adrGrowthAnnual: number | null
  rampMonths: number | null
  wacc: number | null
  stabilizedOccupancy: number | null
  managementFee: number | null
  channelMixAirbnb: number | null
}

export interface FinancialDownload {
  url: string
  requiresAuth: boolean
  label: string
}

export interface FinancialData {
  slug: string
  status: 'ILUSTRATIVO' | 'REAL'
  version: string
  modelDate: string
  source: string
  currency: 'MXN'
  download: FinancialDownload
  kpis: FinancialKPIs
  plByYear: PLRow[]
  scenarios: {
    bear: ScenarioData
    base: ScenarioData
    bull: ScenarioData
  }
  stressTests: StressTest[]
  unitEconomics: UnitEconomics
  assumptions: FinancialAssumptions
}

export function getFinancials(slug: string): FinancialData | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'financials', `${slug}.json`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as FinancialData
  } catch {
    return null
  }
}

export function getValuationData(slug: string): ValuationData | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'valuation', `${slug}.json`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as ValuationData
  } catch {
    return null
  }
}
