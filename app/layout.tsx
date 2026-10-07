import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/layout/cookie-banner'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://capital.delmarboutique.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Del Mar Capital — Inversiones en Bienes Raíces Turísticos',
    template: '%s | Del Mar Capital',
  },
  description:
    'Invierte en proyectos de bienes raíces turísticos en Los Cabos con respaldo hipotecario. Rendimientos atractivos, transparencia total y equipo experto.',
  keywords: [
    'inversiones Los Cabos',
    'bienes raíces turísticos',
    'inversiones inmobiliarias México',
    'Del Mar Capital',
    'inversión hipotecaria',
    'rendimientos Los Cabos',
  ],
  authors: [{ name: 'Del Mar Capital' }],
  creator: 'Del Mar Capital',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: APP_URL,
    siteName: 'Del Mar Capital',
    title: 'Del Mar Capital — Inversiones en Bienes Raíces Turísticos',
    description:
      'Invierte en proyectos de bienes raíces turísticos en Los Cabos con respaldo hipotecario.',
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Del Mar Capital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Del Mar Capital — Inversiones en Bienes Raíces Turísticos',
    description:
      'Invierte en proyectos de bienes raíces turísticos en Los Cabos con respaldo hipotecario.',
    images: [`${APP_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-MX"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Analytics placeholder — add GA4/PostHog scripts here */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-sand-50 text-ink">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
