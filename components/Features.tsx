'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  BarChart2,
  Bell,
  BookOpen,
  Calculator,
  Camera,
  Mic,
  ScanBarcode,
  ShieldCheck,
  Shuffle,
  Tag,
} from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const STEP_MS = 5200

type Bubble = { from: 'bot' | 'user'; text: string }

const features: {
  Icon: typeof Camera
  title: string
  desc: string
  chat: Bubble[]
}[] = [
  {
    Icon: Camera,
    title: 'Foto do prato vira registro',
    desc: 'O NutriChat identifica o que você comeu, calcula os macros e guarda o registro. Sem planilha, sem app novo.',
    chat: [
      { from: 'user', text: '📷 [foto do almoço]' },
      { from: 'bot', text: 'Arroz, feijão, frango e salada. +610 kcal · P 42 g · C 64 g · G 16 g ✅' },
    ],
  },
  {
    Icon: Mic,
    title: 'Prefere falar? Manda áudio',
    desc: 'Um áudio de 10 segundos basta: ele transcreve, interpreta e registra pra você.',
    chat: [
      { from: 'user', text: '🎤 “Comi um pão de queijo e um café pingado”' },
      { from: 'bot', text: 'Anotado: 1 pão de queijo médio + café com leite. +190 kcal ✅' },
    ],
  },
  {
    Icon: ScanBarcode,
    title: 'Mercado sem dúvida',
    desc: 'Foto do código de barras e você sabe na hora se aquilo cabe no seu plano, antes de ir pro carrinho.',
    chat: [
      { from: 'user', text: '🏷️ [código de barras] Posso levar?' },
      { from: 'bot', text: 'Esse granola tem 22 g de açúcar por porção. A versão sem açúcar da mesma marca encaixa melhor 👍' },
    ],
  },
  {
    Icon: Bell,
    title: 'Lembrete na hora certa',
    desc: 'Alerta nos horários das suas refeições, todo dia, inclusive sábado e domingo.',
    chat: [
      { from: 'bot', text: '🔔 16:00: hora do lanche! Hoje no plano: iogurte natural + 1 fruta.' },
      { from: 'user', text: 'Valeu, ia esquecer 😅' },
    ],
  },
  {
    Icon: BarChart2,
    title: 'Resumo semanal no domingo',
    desc: 'O que foi bem, o que dá pra ajustar e o quanto você está perto da meta. Sem você precisar pedir.',
    chat: [
      { from: 'bot', text: '📊 Sua semana: 19 de 21 refeições registradas. Proteína na meta em 5 dias.' },
      { from: 'bot', text: 'Sexta passou um pouco. Bora caprichar no jantar leve essa semana?' },
    ],
  },
  {
    Icon: Shuffle,
    title: 'Substituição já aprovada',
    desc: 'Acabou um alimento ou está fora de casa? Ele indica um equivalente, sempre dentro do plano.',
    chat: [
      { from: 'user', text: 'Acabou a batata-doce, troco pelo quê?' },
      { from: 'bot', text: 'Pode usar 4 colheres de arroz ou 1 mandioca média. Os dois estão no seu plano ✅' },
    ],
  },
]

const extras = [
  { Icon: Tag, label: 'Foto do rótulo nutricional' },
  { Icon: Calculator, label: 'Calorias, macros e água somados' },
  { Icon: BookOpen, label: 'Conhece sua dieta inteira' },
  { Icon: ShieldCheck, label: 'Aviso antes do plano vencer' },
]

export default function Features() {
  const [ativo, setAtivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const visivel = useInView(root, { amount: 0.3 })
  const rodando = visivel && !pausado && !reduced

  // Avança sozinho enquanto a seção está na tela e ninguém escolheu um item.
  useEffect(() => {
    if (!rodando) return
    const id = setTimeout(() => setAtivo((i) => (i + 1) % features.length), STEP_MS)
    return () => clearTimeout(id)
  }, [ativo, rodando])

  const f = features[ativo]

  return (
    <section ref={root} id="funcionalidades" className="py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 460,
          height: 460,
          background: 'radial-gradient(circle, rgba(200,230,192,0.45), rgba(200,230,192,0))',
          bottom: '-15%',
          left: '-10%',
          opacity: 0.7,
        }}
      />
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="eyebrow mb-7">Recursos</p>
          <h2 className="hd-2 mb-6 text-balance">O que faltava pra você não largar a dieta de novo</h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Tudo numa conversa de WhatsApp. Toque num recurso pra ver como ele aparece no seu dia.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12 items-center">
          {/* Lista */}
          <div className="flex flex-col gap-2" role="tablist" aria-label="Recursos do NutriChat">
            {features.map((item, i) => {
              const sel = i === ativo
              const Icon = item.Icon
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  onClick={() => {
                    setAtivo(i)
                    setPausado(true)
                  }}
                  className={`feature-tab ${sel ? 'is-active' : ''}`}
                >
                  <span className="feature-tab-icon">
                    <Icon size={19} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block font-semibold text-[15px] text-floresta">{item.title}</span>
                    <AnimatePresence initial={false}>
                      {sel && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-1 text-sm leading-relaxed text-claro-br">{item.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  {sel && (
                    <span aria-hidden className="feature-tab-progress">
                      <span
                        key={`${ativo}-${rodando}`}
                        className={rodando ? 'is-running' : ''}
                        style={{ animationDuration: `${STEP_MS}ms` }}
                      />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Demo */}
          <div className="feature-demo">
            <div className="flex items-center gap-2.5 border-b border-black/5 bg-white/70 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-floresta to-medio text-menta">
                <f.Icon size={17} strokeWidth={2.4} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#1b2416]">NutriChat</p>
                <p className="text-xs text-medio">{f.title}</p>
              </div>
            </div>
            <div className="flex min-h-[260px] flex-col justify-end gap-2.5 p-4 md:p-5">
              <AnimatePresence mode="wait">
                <motion.div key={ativo} className="flex flex-col gap-2.5" exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}>
                  {f.chat.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.45, duration: 0.32, ease: EASE }}
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug text-[#1b2416] shadow-[0_1px_2px_rgba(0,0,0,.08)] ${
                        b.from === 'user' ? 'self-end rounded-tr-sm bg-[#D9F5C5]' : 'self-start rounded-tl-sm bg-white'
                      }`}
                    >
                      {b.text}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Recursos menores */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          <span className="self-center text-sm font-semibold text-claro-br mr-1">E mais:</span>
          {extras.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-menta bg-branco px-4 py-2 text-sm text-floresta">
              <Icon size={15} strokeWidth={2.2} className="text-medio" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
