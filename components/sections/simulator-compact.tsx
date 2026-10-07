'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn, formatCurrency } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface Scenario {
  label: string
  rate: number
  finalAmount: number
  gain: number
}

interface SimulatorResult {
  scenarios: Scenario[]
  note: string
}

export function SimulatorCompact() {
  const [amount, setAmount] = useState('')
  const [termMonths, setTermMonths] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulatorResult | null>(null)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const amountNum = parseFloat(amount.replace(/[^0-9.]/g, ''))
    if (isNaN(amountNum) || amountNum < 100000) {
      setError('El monto mínimo es $100,000 MXN.')
      setLoading(false)
      return
    }
    if (!termMonths) {
      setError('Selecciona un plazo.')
      setLoading(false)
      return
    }
    if (!email || !email.includes('@')) {
      setError('Ingresa un correo válido.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountNum,
          termMonths: parseInt(termMonths),
          email,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al calcular. Intenta de nuevo.')
      } else {
        setResult(data)
        setSent(true)
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn('bg-ink py-20 px-4')}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 font-serif text-3xl font-semibold text-sand sm:text-4xl">
          ¿Cuánto podría crecer tu inversión?
        </h2>
        <p className="mb-8 text-ink-300">
          Un cálculo orientativo para visualizar escenarios. No constituye promesa de rendimiento.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink-600 bg-ink-800 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-sand-300">
                  Monto de inversión (MXN)
                </Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="$1,000,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-ink-600 bg-ink-900 text-sand placeholder:text-ink-500"
                  required
                />
                <p className="text-xs text-ink-500">Mínimo $100,000 MXN</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="term" className="text-sand-300">
                  Plazo
                </Label>
                <Select onValueChange={setTermMonths}>
                  <SelectTrigger className="border-ink-600 bg-ink-900 text-sand">
                    <SelectValue placeholder="Selecciona plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="48">48 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sim-email" className="text-sand-300">
                Correo electrónico
              </Label>
              <Input
                id="sim-email"
                type="email"
                placeholder="nombre@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-ink-600 bg-ink-900 text-sand placeholder:text-ink-500"
                required
              />
              <p className="text-xs text-ink-500">El resultado detallado llega a tu correo.</p>
            </div>

            {error && (
              <p className="flex items-center gap-2 text-sm text-risk">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Calculando…' : 'Calcular'}
            </Button>

            <p className="text-center text-xs text-ink-500">
              Cálculo orientativo. No constituye promesa de rendimiento. (ILUSTRATIVO)
            </p>
          </form>
        ) : result ? (
          <div className="rounded-2xl border border-ink-600 bg-ink-800 p-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-sand-300">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Resultado enviado a {email}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {result.scenarios.map((s) => (
                <div key={s.label} className="rounded-xl border border-ink-600 bg-ink-900 p-4 text-center">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-400">
                    {s.label}
                  </p>
                  <p className="font-serif text-2xl font-bold text-sand">
                    {formatCurrency(s.finalAmount)}
                  </p>
                  <p className="mt-1 text-xs text-ink-400">
                    +{formatCurrency(s.gain)} ({(s.rate * 100).toFixed(0)}% anual)
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-ink-500">
              {result.note}
            </p>

            <button
              onClick={() => { setSent(false); setResult(null) }}
              className="mt-4 text-xs text-accent hover:underline"
            >
              Calcular de nuevo
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
