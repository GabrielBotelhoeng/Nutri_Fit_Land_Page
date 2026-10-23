import { Inter, Instrument_Serif } from 'next/font/google'
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

export const metadata = {
  title: `${marca} — Acompanhamento nutricional pelo WhatsApp`,
  description:
    'O plano do seu nutricionista no WhatsApp, todo dia: registro de refeições por foto ou áudio, lembretes nos horários certos e resumo semanal.',
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
