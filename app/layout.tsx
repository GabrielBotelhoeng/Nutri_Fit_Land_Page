import { Inter, Instrument_Serif } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { marca } from '@/lib/nutricionista'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

const titulo = `${marca} — Acompanhamento nutricional pelo WhatsApp`
const descricao =
  'O plano do seu nutricionista no WhatsApp, todo dia: registro de refeições por foto ou áudio, lembretes nos horários certos e resumo semanal.'

export const metadata: Metadata = {
  // Base pras URLs absolutas da prévia (og:image etc.). Na Vercel usa o domínio
  // de produção; local, o localhost.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
  title: titulo,
  description: descricao,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: marca,
    title: titulo,
    description: descricao,
  },
  twitter: { card: 'summary_large_image', title: titulo, description: descricao },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
