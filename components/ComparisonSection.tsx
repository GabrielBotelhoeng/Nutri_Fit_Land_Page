'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Cada linha é o mesmo momento do dia, visto sem e com acompanhamento.
const rows = [
  { sem: 'Você esquece dos horários das refeições', com: 'Lembrete nos horários certos, todo dia' },
  { sem: 'Não sabe quanto comeu nem se bateu o macro', com: 'Os macros do dia somados em tempo real' },
  { sem: 'Fica perdido no mercado entre o que pode e o que não pode', com: 'Mandou o código de barras, a resposta vem na hora' },
  { sem: 'Perde o fio da dieta entre uma consulta e outra', com: 'Acompanhamento no WhatsApp, inclusive no fim de semana' },
  { sem: 'Desiste porque ninguém vê de perto o que você está fazendo', com: 'Resumo semanal pra ajustar o plano com seu nutricionista' },
]

export default function ComparisonSection() {
  const [com, setCom] = useState(false)
  const [tocou, setTocou] = useState(false)
  const card = useRef<HTMLDivElement>(null)
  const visivel = useInView(card, { amount: 0.5, once: true })

  // Na primeira vez que o card aparece, mostra o "sem" e vira sozinho pro "com".
  useEffect(() => {
    if (!visivel || tocou) return
    const id = setTimeout(() => setCom(true), 1600)
    return () => clearTimeout(id)
  }, [visivel, tocou])

  const escolher = (v: boolean) => {
    setTocou(true)
    setCom(v)
  }

  return (
    <section className="py-20 md:py-24 bg-offwhite">
      <div className="max-w-[880px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="eyebrow mb-7">Antes e depois</p>
          <h2 className="hd-2 mb-6 text-balance">O que muda quando você não está mais sozinho</h2>
          <p className="lead text-pretty">Não é mágica. É ter acompanhamento todo dia.</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="compare-switch" role="radiogroup" aria-label="Comparar">
            {[
              { v: false, label: 'Sem acompanhamento' },
              { v: true, label: 'Com o NutriChat' },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={com === o.v}
                onClick={() => escolher(o.v)}
                className="plan-switch-btn"
              >
                {com === o.v && (
                  <motion.span
                    layoutId="compare-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: o.v ? '#2D5016' : '#9B2020' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative ${com === o.v ? 'text-white' : 'text-floresta'}`}>{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          ref={card}
          className="overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(45,80,22,0.14)]"
          animate={{ backgroundColor: com ? '#E4F2DC' : '#FDF0EE' }}
          transition={{ duration: 0.5 }}
        >
          <ul className="divide-y divide-black/5">
            {rows.map((r, i) => (
              <li key={r.sem} className="relative flex min-h-[68px] items-center gap-4 px-5 py-4 md:px-8">
                <span className="relative h-8 w-8 flex-shrink-0">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={com ? 'c' : 's'}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0, transition: { delay: i * 0.07, type: 'spring', stiffness: 500, damping: 26 } }}
                      exit={{ scale: 0, rotate: 90, transition: { duration: 0.15 } }}
                      className="absolute inset-0 flex items-center justify-center rounded-full"
                      style={{ background: com ? '#2D5016' : '#C0392B', color: '#fff' }}
                    >
                      {com ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="relative flex-1 overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={com ? 'c' : 's'}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: i * 0.07, duration: 0.35, ease: EASE } }}
                      exit={{ y: '-100%', opacity: 0, transition: { duration: 0.18 } }}
                      className="block text-[15px] md:text-base font-medium"
                      style={{ color: com ? '#2D5016' : '#6B3D1E' }}
                    >
                      {com ? r.com : r.sem}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
