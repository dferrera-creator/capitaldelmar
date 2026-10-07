'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, Lock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FinancialData } from '@/lib/financials'
import type { ValuationData } from '@/components/football-field/football-field-chart'
import { KPIRow } from '@/components/financials/kpi-row'
import { PLChart } from '@/components/financials/pl-chart'
import { ScenariosTable } from '@/components/financials/scenarios-table'
import { FootballFieldChart } from '@/components/football-field/football-field-chart'

type Tab = 'kpis' | 'pl' | 'escenarios' | 'valuacion'

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'kpis', label: 'KPIs' },
  { id: 'pl', label: 'P&L Proyectado' },
  { id: 'escenarios', label: 'Escenarios' },
  { id: 'valuacion', label: 'Valuación' },
]

interface FinancialPanelProps {
  financials: FinancialData
  valuation?: ValuationData
}

export function FinancialPanel({ financials, valuation }: FinancialPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('kpis')

  return (
    <div className="rounded-2xl border border-ink-100 overflow-hidden">
      {/* ILUSTRATIVO banner */}
      {financials.status === 'ILUSTRATIVO' && (
        <div className="flex items-start gap-2 bg-amber-50 border-b border-amber-200 px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">ILUSTRATIVO</span> — Cifras con fines ilustrativos únicamente.
            No constituyen garantía de rendimiento ni oferta de inversión.
            Sujetas a validación legal y financiera antes de publicarse.
          </p>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex border-b border-ink-100 bg-sand-50 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
              activeTab === tab.id
                ? 'text-ink-900 border-b-2 border-accent bg-white'
                : 'text-ink-500 hover:text-ink-900 hover:bg-white/60',
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white p-5 sm:p-6" role="tabpanel">
        {activeTab === 'kpis' && (
          <div>
            <p className="text-xs text-ink-400 mb-4">
              Métricas clave del modelo financiero. Valores nulos (—) se publican una vez validado el modelo.
            </p>
            <KPIRow kpis={financials.kpis} />
          </div>
        )}

        {activeTab === 'pl' && (
          <div>
            <p className="text-xs text-ink-400 mb-4">
              Proyección de ingresos y EBITDA por año. Años 1–5 del horizonte de inversión.
            </p>
            <PLChart data={financials.plByYear} />
          </div>
        )}

        {activeTab === 'escenarios' && (
          <div>
            <p className="text-xs text-ink-400 mb-4">
              Comparativa de retornos bajo escenarios de mercado y stress tests operativos.
            </p>
            <ScenariosTable
              scenarios={financials.scenarios}
              stressTests={financials.stressTests}
            />
          </div>
        )}

        {activeTab === 'valuacion' && (
          <div>
            {valuation ? (
              <>
                <p className="text-xs text-ink-400 mb-4">
                  Análisis football field: 5 métodos de valuación independientes con reconciliación ponderada.
                </p>
                <FootballFieldChart data={valuation} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-sm text-ink-500 mb-3">Modelo de valuación en preparación.</p>
                <Link
                  href="/valuacion"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Ver metodología de valuación →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Download bar */}
      <div className="border-t border-ink-100 bg-sand-50 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-ink-500">
          Modelo financiero completo con supuestos y fórmulas.
        </p>
        {financials.download.requiresAuth ? (
          <Link
            href="/data-room"
            className="inline-flex items-center gap-2 text-xs font-medium text-ink-600 hover:text-ink-900 transition-colors"
          >
            <Lock className="h-3.5 w-3.5" />
            Disponible en el Data Room
          </Link>
        ) : (
          <a
            href={financials.download.url}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-white px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            {financials.download.label}
          </a>
        )}
      </div>
    </div>
  )
}
