import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { nutri } from '@/lib/nutricionista'

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
  title: `${nutri.marca} — Acompanhamento nutricional pelo WhatsApp`,
  description: `${nutri.especialidade} (${nutri.crn}). Acompanhamento diário pelo WhatsApp — registro de refeições, alertas e relatórios semanais.`,
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
