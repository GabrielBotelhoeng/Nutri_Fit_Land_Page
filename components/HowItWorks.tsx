'use client'

import { useRef } from 'react'
import { ClipboardList, FileText, MessageCircle, TrendingUp } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'

const steps = [
  {
    icon: ClipboardList,
    title: 'Você conversa com um nutricionista',
    desc: 'Seu corpo, sua rotina, o que você já tentou. O plano é montado por um profissional, pensando em você. Nada de dieta copiada.',
  },
  {
    icon: MessageCircle,
    title: 'O NutriChat acompanha você todo dia',
    desc: 'Foto do prato, áudio ou texto no WhatsApp. Ele registra, soma os macros e lembra da próxima refeição, sem app nenhum.',
  },
  {
    icon: TrendingUp,
    title: 'Toda semana, o plano é ajustado',
    desc: 'O resumo de domingo mostra onde você foi bem e onde escorregou. Com ele, o plano é afinado com o seu nutricionista.',
  },
]

/* Mini-ilustrações de cada etapa — decorativas. */
function Visual({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="hw-visual">
        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(45,80,22,.1)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDECEA] text-[#C0392B]">
            <FileText size={16} />
          </span>
          <div className="text-left leading-tight">
            <p className="text-[12px] font-semibold text-[#2b2219]">Plano alimentar.pdf</p>
            <p className="text-[10.5px] text-[#6b5b49]">feito pra sua rotina</p>
          </div>
        </div>
      </div>
    )
  }
  if (i === 1) {
    return (
      <div className="hw-visual flex flex-col gap-1.5">
        <span className="self-end rounded-xl rounded-tr-sm bg-[#D9F5C5] px-2.5 py-1.5 text-[11.5px] text-[#1b2416]">📷 almoço</span>
        <span className="self-start rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[11.5px] text-[#1b2416] shadow-[0_1px_2px_rgba(0,0,0,.08)]">
          +610 kcal anotado ✅
        </span>
      </div>
    )
  }
  return (
    <div className="hw-visual flex h-[58px] items-end justify-center gap-1.5">
      {[60, 85, 50, 78, 92, 44, 70].map((h, k) => (
        <span key={k} className="hw-bar w-3 rounded-t-[3px]" style={{ height: `${h}%`, background: k === 4 ? '#2D5016' : '#C8E6C0' }} />
      ))}
    </div>
  )
}

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null)

  /* A linha entre os passos se desenha com a rolagem e cada passo "acende"
     (ganha cor) quando a linha chega nele. Com movimento reduzido, tudo já aparece aceso. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.hw-grid', start: 'top 75%', end: 'bottom 60%', scrub: 0.5 },
        })
        const cards = gsap.utils.toArray<HTMLElement>('.hw-card')
        cards.forEach((card, i) => {
          // "Apagado" = sem cor e um pouco abaixo; nunca com opacidade baixa, pra o
          // texto seguir legível (contraste) em qualquer ponto da rolagem.
          tl.fromTo(
            card,
            { y: 24, filter: 'grayscale(1) saturate(0.4)' },
            { y: 0, filter: 'grayscale(0) saturate(1)', duration: 0.6 },
            i * 0.9,
          )
          tl.fromTo(card.querySelectorAll('.hw-bar'), { scaleY: 0 }, { scaleY: 1, stagger: 0.05, duration: 0.4 }, i * 0.9 + 0.2)
          if (i < cards.length - 1) {
            tl.fromTo(`.hw-line-${i}`, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'none' }, i * 0.9 + 0.3)
          }
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="como-funciona" className="py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-a"
        style={{
          width: 380,
          height: 380,
          background: 'radial-gradient(circle, rgba(125,184,90,0.20), rgba(125,184,90,0))',
          top: '-12%',
          left: '-6%',
          opacity: 0.7,
        }}
      />
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <p className="eyebrow mb-7">Como funciona</p>
          <h2 className="hd-2 mb-6 text-balance">Três passos pra você sair do achismo</h2>
          <p className="lead max-w-lg mx-auto text-pretty">
            Sem mistério: plano de nutricionista, acompanhamento diário e ajuste toda semana.
          </p>
        </div>

        <div className="hw-grid grid md:grid-cols-3 gap-10 md:gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="relative">
                {/* Conector até o próximo passo: horizontal no desktop, vertical no mobile */}
                {i < steps.length - 1 && (
                  <span aria-hidden className={`hw-line hw-line-${i}`} />
                )}
                <div className="hw-card glow-card relative bg-branco rounded-2xl p-7 flex flex-col gap-4 border border-menta text-center h-full">
                  <div
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
                      color: '#F0F7EC',
                      boxShadow: '0 8px 22px rgba(45,80,22,0.28), 0 0 0 6px rgba(255,255,255,0.95)',
                    }}
                  >
                    <Icon size={24} strokeWidth={2.2} />
                    <span
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #C8E6C0, #7DB85A)', color: '#2D5016' }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-floresta font-semibold text-lg mb-2 text-balance">{step.title}</h3>
                    <p className="text-claro-br text-sm leading-relaxed text-pretty">{step.desc}</p>
                  </div>
                  <Visual i={i} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
