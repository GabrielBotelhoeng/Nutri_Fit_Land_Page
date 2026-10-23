'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { waLink, whatsappAtivo } from '@/lib/whatsapp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const plans = [
  {
    label: 'Mensal',
    meses: 1,
    priceMonth: 330,
    desc: 'Pra conhecer o acompanhamento antes de fechar um período mais longo.',
    badge: null,
  },
  {
    label: 'Trimestral',
    meses: 3,
    priceMonth: 222,
    desc: 'Três meses é um bom tempo pra ver mudança real no corpo e na rotina.',
    badge: 'Recomendado',
  },
  {
    label: 'Semestral',
    meses: 6,
    priceMonth: 130,
    desc: 'Seis meses pra consolidar o hábito e chegar na meta sem voltar atrás.',
    badge: null,
  },
  {
    label: 'Anual',
    meses: 12,
    priceMonth: 89.9,
    desc: 'Pra quem não quer só perder uns quilos: quer mudar a relação com a comida.',
    badge: 'Melhor custo-benefício',
  },
]

const BASE = plans[0].priceMonth

const included = [
  'Acompanhamento pelo WhatsApp, todo dia',
  'Plano alimentar personalizado em PDF',
  'Registro por foto, áudio, texto e código de barras',
  'Lembretes nos horários das suas refeições',
  'Resumo semanal todo domingo',
  'Substituições aprovadas pelo seu nutricionista',
]

const brl = (n: number) =>
  n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/* Preço que "rola" até o valor novo quando o plano muda. */
function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.textContent = brl(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration: 0.6,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = brl(v)
      },
    })
    prev.current = value
    return () => controls.stop()
  }, [value, reduced])

  return <span ref={ref}>{brl(value)}</span>
}

export default function Plans() {
  const [sel, setSel] = useState(1)
  const plan = plans[sel]
  const economia = Math.round((1 - plan.priceMonth / BASE) * 100)
  const total = plan.priceMonth * plan.meses

  return (
    <section id="planos" className="py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(125,184,90,0.20), rgba(125,184,90,0))',
          top: '-12%',
          right: '-8%',
          opacity: 0.6,
        }}
      />
      <div className="relative z-[2] max-w-[1080px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-7">Planos</p>
          <h2 className="hd-2 mb-6 text-balance">
            Quanto mais tempo de acompanhamento, mais em conta fica
          </h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Todo plano tem o acompanhamento inteiro. Escolha só por quanto tempo.
          </p>
        </div>

        {/* Seletor de duração */}
        <div className="flex justify-center mb-8">
          <div className="plan-switch" role="radiogroup" aria-label="Duração do plano">
            {plans.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="radio"
                aria-checked={i === sel}
                onClick={() => setSel(i)}
                className="plan-switch-btn"
              >
                {i === sel && (
                  <motion.span
                    layoutId="plan-pill"
                    className="absolute inset-0 rounded-full bg-floresta shadow-[0_6px_18px_rgba(45,80,22,.3)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative ${i === sel ? 'text-offwhite' : 'text-floresta'}`}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="plan-card grid lg:grid-cols-[1.05fr_1fr]">
          {/* Lado do preço */}
          <div className="plan-card-price relative p-7 md:p-10 flex flex-col">
            <div className="flex items-center gap-2 mb-5 min-h-[26px]">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-menta">{plan.label}</span>
              <AnimatePresence mode="popLayout">
                {plan.badge && (
                  <motion.span
                    key={plan.badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="rounded-full bg-menta px-3 py-1 text-[11px] font-bold text-floresta"
                  >
                    {plan.badge}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-end gap-2 text-offwhite">
              <span className="text-lg font-semibold mb-2.5">R$</span>
              <span className="font-display tabular-nums leading-none" style={{ fontSize: 'clamp(56px, 8vw, 84px)' }}>
                <AnimatedPrice value={plan.priceMonth} />
              </span>
              <span className="text-menta mb-2.5">/mês</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={plan.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-3"
              >
                <p className="text-sm text-menta">
                  {plan.meses === 1 ? 'Cobrança mensal' : `R$ ${brl(total)} por ${plan.meses} meses`}
                  {economia > 0 && (
                    <span className="ml-2 rounded-full bg-[rgba(125,184,90,.25)] px-2 py-0.5 text-xs font-semibold text-offwhite">
                      {economia}% mais em conta que o mensal
                    </span>
                  )}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-offwhite/85 max-w-sm text-pretty">{plan.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Preço por mês de cada plano — barras clicáveis */}
            <div className="mt-8 lg:mt-auto pt-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-menta/80">
                Quanto custa cada mês
              </p>
              <div className="flex flex-col gap-2">
                {plans.map((p, i) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setSel(i)}
                    className="group grid grid-cols-[78px_1fr_70px] items-center gap-3 text-left"
                  >
                    <span className={`text-xs ${i === sel ? 'font-bold text-offwhite' : 'text-menta/80 group-hover:text-offwhite'}`}>
                      {p.label}
                    </span>
                    <span className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.span
                        className="block h-full rounded-full"
                        initial={false}
                        animate={{
                          width: `${(p.priceMonth / BASE) * 100}%`,
                          backgroundColor: i === sel ? '#7DB85A' : 'rgba(200,230,192,0.35)',
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </span>
                    <span className={`text-right text-xs tabular-nums ${i === sel ? 'font-bold text-offwhite' : 'text-menta/80'}`}>
                      R$ {brl(p.priceMonth)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lado do que está incluído */}
          <div className="p-7 md:p-10 bg-branco flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-medio mb-5">Tudo incluído em qualquer plano</p>
            <ul className="flex flex-col gap-3.5 flex-1">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-[#4A3122]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-menta text-floresta">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={waLink(plan.label)}
              className="btn-cta mt-8 inline-flex items-center justify-center gap-2 rounded-xl font-semibold"
              style={{ minHeight: 54, color: '#F0F7EC', fontSize: 15 }}
            >
              Quero o plano {plan.label}
              <ArrowRight size={18} className="btn-arrow" strokeWidth={2.4} />
            </a>
            <p className="mt-3 text-center text-xs text-claro-br">
              {whatsappAtivo
                ? 'Você fala com a gente no WhatsApp antes de pagar qualquer coisa.'
                : 'Pré-lançamento: entre na lista e avisamos quando abrir as vagas. Nada é cobrado agora.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
