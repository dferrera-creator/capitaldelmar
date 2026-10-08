'use client'

import { useRef, useState } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditableFieldProps {
  slug: string
  field: string
  value: string
  multiline?: boolean
  className?: string
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
}

export function EditableField({
  slug,
  field,
  value: initialValue,
  multiline = false,
  className,
  as: Tag = 'p',
}: EditableFieldProps) {
  const [value, setValue] = useState(initialValue)
  const [draft, setDraft] = useState(initialValue)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  const startEdit = () => {
    setDraft(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const cancel = () => {
    setEditing(false)
    setDraft(value)
    setError(false)
  }

  const save = async () => {
    if (draft === value) { setEditing(false); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value: draft }),
      })
      if (!res.ok) throw new Error()
      setValue(draft)
      setEditing(false)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') cancel()
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !multiline)) {
      e.preventDefault()
      save()
    }
  }

  if (editing) {
    return (
      <div className="relative group/edit">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(3, draft.split('\n').length + 1)}
            className={cn(
              'w-full resize-none rounded-lg border px-3 py-2 text-sm leading-relaxed outline-none',
              error ? 'border-red-400 bg-red-50' : 'border-accent bg-sand-50',
              className,
            )}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              'w-full rounded-lg border px-3 py-1.5 text-sm outline-none',
              error ? 'border-red-400 bg-red-50' : 'border-accent bg-sand-50',
              className,
            )}
          />
        )}
        <div className="flex items-center gap-1 mt-1.5 justify-end">
          {error && <span className="text-xs text-red-500 mr-2">Error al guardar</span>}
          <button
            type="button"
            onClick={cancel}
            className="rounded p-1 text-ink-400 hover:text-ink-700 hover:bg-ink-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded p-1 text-accent hover:text-white hover:bg-accent disabled:opacity-50"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>
        {multiline && (
          <p className="text-[11px] text-ink-400 mt-1">Ctrl+Enter para guardar · Esc para cancelar</p>
        )}
      </div>
    )
  }

  return (
    <div className="group/edit relative inline-block w-full">
      <Tag className={className}>{value}</Tag>
      <button
        type="button"
        onClick={startEdit}
        title="Editar"
        className="absolute -right-6 top-0 opacity-0 group-hover/edit:opacity-100 transition-opacity rounded p-1 text-ink-300 hover:text-accent hover:bg-sand-50"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

interface EditableListItemProps {
  slug: string
  field: string
  value: string
  className?: string
}

export function EditableListItem({ slug, field, value: initialValue, className }: EditableListItemProps) {
  const [value, setValue] = useState(initialValue)
  const [draft, setDraft] = useState(initialValue)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEdit = () => {
    setDraft(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const cancel = () => { setEditing(false); setDraft(value) }

  const save = async () => {
    if (draft === value) { setEditing(false); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value: draft }),
      })
      if (res.ok) { setValue(draft); setEditing(false) }
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 w-full">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') cancel()
            if (e.key === 'Enter') { e.preventDefault(); save() }
          }}
          className="flex-1 rounded border border-accent bg-sand-50 px-2 py-1 text-sm outline-none"
        />
        <button type="button" onClick={cancel} className="text-ink-400 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        <button type="button" onClick={save} disabled={saving} className="text-accent"><Check className="h-3.5 w-3.5" /></button>
      </div>
    )
  }

  return (
    <div className="group/edit relative flex items-start gap-3 w-full">
      <span className={cn('flex-1', className)}>{value}</span>
      <button
        type="button"
        onClick={startEdit}
        className="shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-ink-300 hover:text-accent"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
