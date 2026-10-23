import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Prévia do link no WhatsApp/Instagram/X. Gerada no build (rota estática).
// O gerador não lê WebP nem WOFF2: por isso a foto em JPEG e a fonte em TTF
// ficam em assets/.
export const alt = 'NutriChat — o plano do seu nutricionista no WhatsApp, todo dia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [fonte, foto] = await Promise.all([
    readFile(join(process.cwd(), 'assets/InstrumentSerif-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/og-bg.jpg')),
  ])
  const fundo = `data:image/jpeg;base64,${foto.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fundo} alt="" width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover' }} />
        <div
          style={{
            // Satori não suporta `inset` — posição explícita.
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: 'linear-gradient(90deg, rgba(20,38,10,0.96) 0%, rgba(20,38,10,0.86) 48%, rgba(20,38,10,0.15) 85%)',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', width: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #4A7C2F, #7DB85A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F0F7EC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Instrument Serif', fontSize: 40, color: '#F0F7EC' }}>NutriChat</span>
          </div>
          <div style={{ fontFamily: 'Instrument Serif', fontSize: 76, lineHeight: 1.05, color: '#F0F7EC', letterSpacing: -1 }}>
            Sua dieta vira rotina quando alguém anda junto.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: '#C8E6C0', lineHeight: 1.35 }}>
            O plano do seu nutricionista no WhatsApp, todo dia. Sem app, sem login.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Instrument Serif', data: fonte, style: 'normal', weight: 400 }],
    },
  )
}
