import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Building2, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce al equipo de Del Mar Capital y la historia de DM Boutique Servicios Turísticos S.A.P.I. de C.V.',
}

const STATS = [
  { value: '10+', label: 'Años de operación', note: 'Verificar antes de publicar' },
  { value: '159', label: 'Propiedades en gestión', note: 'ILUSTRATIVO — verificar' },
  { value: '604', label: 'Unidades en mandato', note: 'ILUSTRATIVO — verificar' },
  { value: '6', label: 'Destinos turísticos', note: 'ILUSTRATIVO — verificar' },
]

const TEAM = [
  {
    name: '[PENDIENTE]',
    role: 'Director General',
    bio: 'Perfil del Director General pendiente de redacción y aprobación.',
    linkedin: null,
  },
  {
    name: '[PENDIENTE]',
    role: 'Director de Inversiones',
    bio: 'Perfil del Director de Inversiones pendiente.',
    linkedin: null,
  },
  {
    name: '[PENDIENTE]',
    role: 'Directora de Operaciones',
    bio: 'Perfil de la Directora de Operaciones pendiente.',
    linkedin: null,
  },
  {
    name: '[PENDIENTE]',
    role: 'Director Legal',
    bio: 'Perfil del Director Legal pendiente.',
    linkedin: null,
  },
]

const DESTINATIONS = [
  'Los Cabos, BCS',
  'La Paz, BCS',
  'Puerto Vallarta, Jal',
  'San Miguel de Allende, Gto',
  'Tulum, Q. Roo',
  '[PENDIENTE — sexto destino]',
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="bg-ink-900 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">Nosotros</h1>
          <p className="text-ink-200 text-lg max-w-2xl">
            Del Mar Capital es el vehículo de inversión de DM Boutique Servicios Turísticos
            S.A.P.I. de C.V., empresa de gestión hotelera boutique con más de una década de
            operación en destinos turísticos de México.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Story */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">Nuestra historia</h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-4 text-ink-700">
            <p>
              DM Boutique Servicios Turísticos nació de la convicción de que el turismo de
              experiencia — pequeño, cuidadoso, auténtico — genera retornos superiores y un
              impacto local positivo. Durante más de una década hemos operado propiedades
              boutique en Los Cabos, La Paz y otros destinos de México, acumulando un track
              record que creemos justifica la confianza de inversionistas externos.
            </p>
            <p>
              Del Mar Capital es la estructura a través de la cual abrimos esa oportunidad a
              inversionistas que buscan exposición a bienes raíces turísticos de calidad con
              un equipo operador probado. No somos un desarrollador; somos operadores que
              también desarrollan, con alineación de incentivos real.
            </p>
            <p className="text-sm text-ink-400 italic">
              [Esta sección debe revisarse y aprobarse por el equipo antes de publicar.
              No hacemos afirmaciones de rendimiento histórico sin validación.]
            </p>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6 sr-only">
            Cifras clave
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-ink-100 p-5 text-center"
              >
                <p className="font-serif text-3xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-ink-800">{stat.label}</p>
                <p className="text-xs text-amber-600 mt-1">{stat.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            El equipo
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TEAM.map((member) => (
              <div
                key={`${member.name}-${member.role}`}
                className="bg-white rounded-xl border border-ink-100 p-5 flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-sand-200 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-ink-400" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900">{member.name}</p>
                  <p className="text-xs text-accent font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-ink-600">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="text-xs text-ink-400 hover:text-ink-700 mt-1 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
            Destinos de operación
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest}
                className="flex items-center gap-2 bg-white rounded-lg border border-ink-100 px-4 py-3"
              >
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-ink-700">{dest}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Legal info */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
            Información legal
          </h2>
          <div className="bg-white rounded-2xl border border-ink-100 p-6 sm:p-8 space-y-4 text-sm text-ink-700">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'Razón social',
                  value: 'DM Boutique Servicios Turísticos S.A.P.I. de C.V.',
                },
                { label: 'RFC', value: '[PENDIENTE]' },
                { label: 'Domicilio fiscal', value: '[PENDIENTE]' },
                { label: 'Ciudad', value: 'Los Cabos, BCS, México' },
                { label: 'Teléfono', value: '[PENDIENTE]' },
                { label: 'Email de contacto', value: 'contacto@delmarboutique.com' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-ink-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-medium text-ink-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink-900 text-white rounded-2xl p-8 text-center">
          <Building2 className="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 className="font-serif text-xl font-semibold mb-3">¿Quieres conocernos mejor?</h3>
          <p className="text-ink-300 mb-6 max-w-sm mx-auto text-sm">
            Agenda una llamada con el equipo o visita nuestras propiedades en Los Cabos.
          </p>
          <Link
            href="/agendar"
            className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Agendar llamada
          </Link>
        </section>
      </div>
    </div>
  )
}
