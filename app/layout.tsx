import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Dr. Gabriel Mena | Medicina Integrativa y Salud Mental',
    template: '%s | Dr. Gabriel Mena',
  },
  description:
    'Plataforma clínica digital del Dr. Gabriel Ignacio Mena Bañados — Médico General especializado en salud mental, medicina integrativa y atención centrada en la persona.',
  keywords: [
    'psiquiatría',
    'salud mental',
    'médico',
    'Chile',
    'consulta médica',
    'ansiedad',
    'depresión',
    'bienestar',
  ],
  authors: [{ name: 'Dr. Gabriel Ignacio Mena Bañados' }],
  creator: 'Dr. Gabriel Mena',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    title: 'Dr. Gabriel Mena | Salud Mental & Medicina Integrativa',
    description:
      'Atención médica especializada en salud mental con enfoque integrador y humano.',
    siteName: 'Dr. Gabriel Mena',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
