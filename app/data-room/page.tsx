import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Download, Lock, FolderOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Data Room',
  description: 'Acceso a la documentación de los proyectos de Del Mar Capital.',
}

// Placeholder document structure — in production, fetched from DB
const DOCUMENTS = [
  {
    project: 'Bravante Los Cabos',
    slug: 'bravante',
    docs: [
      {
        id: 'bravante-term-sheet',
        name: 'Term Sheet',
        type: 'PDF',
        date: '2024-01-15',
        requiresNDA: false,
        size: '245 KB',
      },
      {
        id: 'bravante-modelo-financiero',
        name: 'Modelo financiero (Excel)',
        type: 'XLSX',
        date: '2024-01-15',
        requiresNDA: true,
        size: '1.2 MB',
      },
      {
        id: 'bravante-contrato-fideicomiso',
        name: 'Contrato de fideicomiso (borrador)',
        type: 'PDF',
        date: '2024-01-10',
        requiresNDA: true,
        size: '890 KB',
      },
      {
        id: 'bravante-due-diligence',
        name: 'Due Diligence — resumen ejecutivo',
        type: 'PDF',
        date: '2024-01-12',
        requiresNDA: true,
        size: '560 KB',
      },
    ],
  },
  {
    project: 'Reserva San Gregorio',
    slug: 'reserva-san-gregorio',
    docs: [
      {
        id: 'rsg-term-sheet',
        name: 'Term Sheet',
        type: 'PDF',
        date: '2024-02-01',
        requiresNDA: false,
        size: '210 KB',
      },
      {
        id: 'rsg-modelo',
        name: 'Modelo financiero',
        type: 'XLSX',
        date: '2024-02-01',
        requiresNDA: true,
        size: '980 KB',
      },
    ],
  },
]

const ACCESS_LOG = [
  { document: 'Term Sheet — Bravante', date: '2024-01-20', action: 'Descarga' },
  { document: 'Due Diligence — Bravante', date: '2024-01-22', action: 'Vista' },
]

function FileTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    PDF: 'bg-red-50 text-red-700 border-red-200',
    XLSX: 'bg-green-50 text-green-700 border-green-200',
    DOCX: 'bg-blue-50 text-blue-700 border-blue-200',
  }
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border ${colors[type] ?? 'bg-sand-100 text-ink-700 border-ink-200'}`}
    >
      {type}
    </span>
  )
}

export default async function DataRoomPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/data-room')
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="bg-ink-900 text-white pt-24 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Lock className="w-4 h-4" />
            <span>Acceso restringido</span>
          </div>
          <h1 className="font-serif text-4xl font-semibold mb-2">Data Room</h1>
          <p className="text-ink-300">
            Bienvenido, {session.user.email}. Documentación confidencial de los proyectos.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Documents by project */}
        {DOCUMENTS.map((group) => (
          <section key={group.slug}>
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-5 h-5 text-accent" />
              <h2 className="font-serif text-xl font-semibold text-ink-900">{group.project}</h2>
            </div>
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sand-50 text-ink-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3">Documento</th>
                      <th className="text-left px-4 py-3">Tipo</th>
                      <th className="text-left px-4 py-3">Fecha</th>
                      <th className="text-left px-4 py-3">Tamaño</th>
                      <th className="text-right px-5 py-3">Acceso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {group.docs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-sand-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-ink-400 flex-shrink-0" />
                            <span className="font-medium text-ink-900">{doc.name}</span>
                            {doc.requiresNDA && (
                              <span className="text-xs text-ink-400 bg-ink-50 border border-ink-200 px-1.5 py-0.5 rounded">
                                NDA
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <FileTypeBadge type={doc.type} />
                        </td>
                        <td className="px-4 py-4 text-ink-500">{formatDate(doc.date)}</td>
                        <td className="px-4 py-4 text-ink-500">{doc.size}</td>
                        <td className="px-5 py-4 text-right">
                          <a
                            href={`/api/data-room/file/${doc.id}`}
                            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-600 font-medium text-xs"
                            aria-label={`Descargar ${doc.name}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            Descargar
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        {/* Access log */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">Tu historial de acceso</h2>
          <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
            {ACCESS_LOG.length === 0 ? (
              <p className="text-center text-ink-400 py-8 text-sm">
                Aún no has accedido a ningún documento.
              </p>
            ) : (
              <div className="divide-y divide-ink-100">
                {ACCESS_LOG.map((entry, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between text-sm">
                    <span className="text-ink-700">{entry.document}</span>
                    <div className="flex items-center gap-3 text-ink-400">
                      <span>{entry.action}</span>
                      <span>{formatDate(entry.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer note */}
        <div className="text-center text-xs text-ink-400 space-y-1">
          <p>
            La información de este Data Room es confidencial. No la compartas sin autorización
            de Del Mar Capital.
          </p>
          <p>
            ¿Necesitas un documento adicional?{' '}
            <Link href="/agendar" className="text-accent hover:underline">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
