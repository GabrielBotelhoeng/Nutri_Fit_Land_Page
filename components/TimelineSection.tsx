'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

type Event = {
  time: string
  type: 'bot' | 'user'
  text: string
  media?: 'photo' | 'audio'
}

const events: Event[] = [
  { time: '08:00', type: 'bot', text: '☀️ Bom dia! Hora do café da manhã. Lembra de registrar o que você comer!' },
  { time: '08:15', type: 'user', text: 'Foto do prato', media: 'photo' },
  { time: '08:15', type: 'bot', text: 'Identifiquei: ovos mexidos, pão integral e café. Confirma?' },
  { time: '08:16', type: 'user', text: 'Isso mesmo! ✅' },
  { time: '08:16', type: 'bot', text: '✅ Registrado! +320 kcal · Prot 18 g · Carb 28 g · Gord 12 g\nVocê consumiu 320 de 1.900 kcal hoje.' },
  { time: '12:00', type: 'bot', text: '🍽️ Hora do almoço! Lembra de registrar sua refeição.' },
  { time: '12:32', type: 'user', text: 'Áudio de 8 segundos', media: 'audio' },
  { time: '12:32', type: 'bot', text: '🎤 Entendi: arroz, feijão, frango grelhado e salada. Registrado!\n+640 kcal · Você já consumiu 960 de 1.900 kcal.' },
  { time: '19:00', type: 'bot', text: '🌙 Hora do jantar! E não esquece da sua creatina hoje 💊' },
]

const periodo = (t: string) => {
  const h = Number(t.slice(0, 2))
  return h < 11 ? 'Café da manhã' : h < 17 ? 'Almoço' : 'Jantar'
}

/* "Um dia com o NutriChat": a linha de progresso acompanha o scroll e o
   relógio fixo avança até a hora da última mensagem que entrou na tela. */
export default function TimelineSection() {
  const root = useRef<HTMLElement>(null)
  const clock = useRef<HTMLSpanElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const setClock = (i: number) => {
        if (clock.current) clock.current.textContent = events[i].time
        if (label.current) label.current.textContent = periodo(events[i].time)
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.tl-progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.tl-list', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
          },
        )

        gsap.utils.toArray<HTMLElement>('.tl-item').forEach((el, i) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
                onEnter: () => setClock(i),
                onLeaveBack: () => setClock(Math.max(0, i - 1)),
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="py-20 md:py-28 bg-creme">
      <div className="max-w-[1080px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="eyebrow mb-7">Um dia com o NutriChat</p>
          <h2 className="hd-2 mb-6 text-balance">É essa a conversa, todo dia</h2>
          <p className="lead text-pretty max-w-lg mx-auto">
            Role a página e acompanhe um dia inteiro. Não tem formulário, não tem app. Tem você e o WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[280px_1fr] md:gap-14">
          {/* Relógio fixo */}
          <div className="tl-clock-wrap">
            <div className="tl-clock">
              <span className="tl-clock-label" ref={label}>
                Café da manhã
              </span>
              <span className="tl-clock-time tabular-nums" ref={clock}>
                08:00
              </span>
              <span className="text-xs text-claro-br">O NutriChat lembra, você responde.</span>
            </div>
          </div>

          {/* Mensagens */}
          <div className="tl-list relative pl-8 md:pl-10">
            <div aria-hidden className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] rounded-full bg-menta" />
            <div aria-hidden className="tl-progress absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] rounded-full origin-top bg-gradient-to-b from-claro to-floresta" />

            <div className="flex flex-col gap-5">
              {events.map((ev, i) => (
                <div key={i} className="tl-item relative">
                  <span
                    aria-hidden
                    className="absolute -left-8 md:-left-10 top-3 h-[14px] w-[14px] translate-x-[5px] md:translate-x-[9px] rounded-full border-2 border-creme"
                    style={{ background: ev.type === 'bot' ? '#2D5016' : '#7DB85A' }}
                  />
                  <div className={`flex flex-col ${ev.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[88%] sm:max-w-[400px] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        ev.type === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                      }`}
                      style={
                        ev.type === 'user'
                          ? { background: '#D9F5C5', color: '#1b2416' }
                          : { background: '#fff', color: '#4A3122', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                      }
                    >
                      {ev.media === 'photo' && <span className="block text-2xl mb-1">🖼️</span>}
                      {ev.media === 'audio' && (
                        <span className="mb-1 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-floresta text-[9px] text-white">▶</span>
                          <span className="flex h-4 items-center gap-[2px]" aria-hidden>
                            {[5, 9, 14, 7, 12, 16, 10, 6, 13, 8, 15, 9].map((h, k) => (
                              <span key={k} className="w-[2px] rounded-full bg-floresta/60" style={{ height: h }} />
                            ))}
                          </span>
                        </span>
                      )}
                      {ev.text}
                    </div>
                    <span className="mt-1 text-[11px] font-semibold text-claro-br">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
