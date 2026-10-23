'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const ITEMS = [
  'Sem app pra baixar',
  'Foto do prato vira registro',
  'Lembrete na hora certa',
  'Áudio também vale',
  'Código de barras no mercado',
  'Resumo toda semana',
  'Plano feito por nutricionista',
  'Funciona no WhatsApp que você já usa',
]

/* Faixa infinita de benefícios (padrão CoraHub). A velocidade responde ao
   scroll: rolar rápido acelera a faixa e inverte o sentido ao subir. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const loop = gsap.to(track.current, {
          xPercent: -50,
          ease: 'none',
          duration: 38,
          repeat: -1,
        })

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 300)
            const dir = self.direction === -1 ? -1 : 1
            gsap.to(loop, {
              timeScale: dir * (1 + Math.abs(boost)),
              duration: 0.25,
              overwrite: true,
            })
            gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, overwrite: false })
          },
        })

        return () => {
          st.kill()
          loop.kill()
        }
      })
    },
    { scope: root },
  )

  const row = [...ITEMS, ...ITEMS]

  return (
    // O wrapper corta a sobra da faixa inclinada — sem ele a página ganha scroll horizontal.
    <div ref={root} className="overflow-hidden py-3">
      <div className="marquee-band" aria-label="Benefícios do NutriChat">
        <div ref={track} className="marquee-track">
          {row.map((t, i) => (
            <span key={i} className="marquee-item" aria-hidden={i >= ITEMS.length}>
              {t}
              <span className="marquee-sep" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
