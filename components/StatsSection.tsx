'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

// Só fatos do produto — nada de "+5.000 pacientes" que a gente não tem como provar.
const stats = [
  { value: 0, suffix: '', label: 'apps pra baixar: é o WhatsApp que você já usa' },
  { value: 4, suffix: '', label: 'jeitos de registrar: foto, áudio, texto ou código de barras' },
  { value: 7, suffix: ' dias', label: 'por semana de lembrete, inclusive sábado e domingo' },
  { value: 1, suffix: ' resumo', label: 'toda semana, pra você e seu nutricionista ajustarem o plano' },
]

export default function StatsSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.stat-card', {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        })
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count)
          const obj = { n: end === 0 ? 9 : 0 }
          gsap.to(obj, {
            n: end,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.n))
            },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="py-16 md:py-20 relative">
      <div className="max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <p
                className="font-display mb-2 tabular-nums"
                style={{
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 1,
                  color: '#2D5016',
                  letterSpacing: '-0.02em',
                }}
              >
                <span data-count={s.value}>{s.value}</span>
                <span style={{ fontSize: '0.42em', letterSpacing: 0 }}>{s.suffix}</span>
              </p>
              <p className="text-claro-br text-xs md:text-sm leading-snug text-pretty">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
