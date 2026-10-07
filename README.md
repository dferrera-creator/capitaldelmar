# Del Mar Capital — Plataforma de Inversión

Sitio web full-stack para la captación de capital de Del Mar Boutique (DM Boutique Servicios Turísticos S.A.P.I. de C.V.). Permite a inversionistas conocer proyectos turísticos, explorar la metodología de valuación (football field), usar el simulador y agendar una llamada con el equipo de capital.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 + sistema de diseño propio (tokens ink/sand/accent/risk)
- **UI:** Radix UI + CVA (clase-variance-authority)
- **Base de datos:** PostgreSQL + Prisma ORM v6
- **Autenticación:** Auth.js v5 (magic link vía Resend)
- **Correo:** Resend
- **CRM:** HubSpot API v3
- **Anti-bot:** Cloudflare Turnstile
- **Gráficos:** Recharts
- **Despliegue:** Vercel

## Instalación local

```bash
# 1. Clonar e instalar
git clone <repo>
cd capitaldelmar
npm install

# 2. Variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores reales

# 3. Generar cliente Prisma
npx prisma generate

# 4. Correr migraciones (requiere DATABASE_URL real)
npx prisma migrate dev --name init

# 5. Seed inicial (opcional)
npx prisma db seed

# 6. Desarrollo
npm run dev
```

## Variables de entorno requeridas

Ver `.env.example` para la lista completa. Las mínimas para desarrollo local:

```
DATABASE_URL=          # PostgreSQL (Neon o Supabase recomendado)
AUTH_SECRET=           # Generado con: openssl rand -base64 32
RESEND_API_KEY=        # Para magic links y correos del simulador
RESEND_FROM_EMAIL=     # Dirección de envío verificada en Resend
```

## Scripts

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run lint         # ESLint
npm run typecheck    # TypeScript sin emitir
npm run build:valuation  # Valida y compila JSONs de football field
```

## Estructura

```
app/                   Rutas (App Router)
  api/                 Endpoints: leads, simulator, cetes, projects, data-room, auth
  proyectos/           Lista y ficha de proyectos
  simulador/           Simulador de inversión
  garantias/           Las dos garantías
  valuacion/           Football field
  data-room/           Acceso protegido (requiere auth)
  legal/               Privacidad, términos, riesgos, cookies
components/
  layout/              Navbar, Footer, CookieBanner
  ui/                  Sistema de diseño (Button, Card, Badge, etc.)
  sections/            Secciones del home
  football-field/      Gráfico de valuación
  projects/            ProjectCard
content/               Datos editables (JSON/MDX)
  projects/            7 proyectos (ILUSTRATIVO)
  faq.json             12 preguntas frecuentes
  team.json            Equipo (pendiente datos reales)
  legal/               Disclaimer, avisos
data/valuation/        Modelos de football field por proyecto
prisma/
  schema.prisma        Modelos: Lead, Project, Document, DataRoomRequest, etc.
  seed.ts              Seed inicial
scripts/
  build-valuation.ts   Valida y exporta JSONs de valuación
```

## Despliegue en Vercel

1. Conectar el repositorio en vercel.com
2. Agregar todas las variables de entorno de `.env.example`
3. Build command: `npm run build`
4. Output directory: `.next`
5. Para la base de datos: usar Neon (neon.tech) o Supabase

## CI/CD

GitHub Actions en `.github/workflows/ci.yml`:
- **lint:** ESLint
- **typecheck:** `tsc --noEmit`
- **build:** `next build`

## Pendientes de decisión humana

1. **Garantías:** Definición exacta de mecánica, contraparte, condiciones y límites del piso de CETES y del comprador de última instancia. Actualmente marcadas `[PENDIENTE LEGAL]`.
2. **Modo de publicación:** Decidir si el sitio es `public` (solo información general) o `gated` (exige verificación de perfil). Variable `PUBLIC_MODE` en `.env`.
3. **Revisión legal:** Todo el copy, avisos de riesgo y textos de garantías requieren revisión y aprobación legal antes de publicar.
4. **Modelo financiero:** Validar y corregir las cifras de valuación (football field) antes de mostrar datos reales. Actualmente todo es `ILUSTRATIVO`.
5. **Contenido real:** Fotos de activos, nombre y foto del equipo, premios y prensa con fuente, datos de rendimiento verificados.
6. **Proveedor de calendario:** Configurar HubSpot Meetings o Calendly (variable `NEXT_PUBLIC_HUBSPOT_MEETING_LINK`).
7. **Tasa CETES en vivo:** Configurar el token de Banxico (`BANXICO_TOKEN`) para obtener la tasa en tiempo real.
8. **Almacenamiento S3:** Configurar bucket para documentos del data room (`S3_*` variables).
9. **WhatsApp:** Actualizar el número real en la variable `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Avisos importantes

- **No invierte por sí solo:** Este software no constituye asesoría financiera ni oferta pública de valores.
- Todo dato marcado `(ILUSTRATIVO)` debe ser validado y aprobado por el equipo antes de publicar.
- La revisión legal del copy es **obligatoria** antes del lanzamiento.
