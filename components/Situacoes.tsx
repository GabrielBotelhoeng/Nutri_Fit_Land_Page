'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BellRing, Camera, ScanBarcode, Utensils } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const SITUACOES = [
  {
    id: 'larga',
    Icon: BellRing,
    titulo: 'Começo bem na segunda e largo na quarta',
    dor: 'A motivação dura três dias. Depois a rotina engole a dieta e ninguém percebe.',
    ajuda: 'Lembrete no horário de cada refeição e um resumo no domingo. Quando você some, o NutriChat chama.',
    chat: [
      { from: 'bot', text: 'Oi! Não vi seu almoço hoje. Correria? Me manda uma foto rapidinho 📷' },
      { from: 'user', text: 'Esqueci total, vou mandar agora' },
    ],
  },
  {
    id: 'anotar',
    Icon: Camera,
    titulo: 'Esqueço de anotar o que comi',
    dor: 'Planilha e app de contar caloria cansam. No terceiro dia, você para de preencher.',
    ajuda: 'Você só manda a foto do prato ou um áudio de 10 segundos. O registro e a soma dos macros são automáticos.',
    chat: [
      { from: 'user', text: '🎤 Comi arroz, feijão, frango e salada' },
      { from: 'bot', text: 'Anotado ✅ +610 kcal. Faltam 970 kcal pra sua meta de hoje.' },
    ],
  },
  {
    id: 'mercado',
    Icon: ScanBarcode,
    titulo: 'No mercado eu travo',
    dor: 'Rótulo confuso, mil versões "fit" do mesmo produto e nenhuma certeza.',
    ajuda: 'Manda a foto do código de barras e recebe na hora se aquilo cabe no seu plano.',
    chat: [
      { from: 'user', text: 'Posso levar esse iogurte?' },
      { from: 'bot', text: 'Esse tem 18 g de açúcar. O natural da prateleira de baixo encaixa melhor 👍' },
    ],
  },
  {
    id: 'fora',
    Icon: Utensils,
    titulo: 'Não sei o que comer fora de casa',
    dor: 'Restaurante, viagem, festa: o plano some e vira tudo ou nada.',
    ajuda: 'Substituições que o seu nutricionista já aprovou, sugeridas na hora em que você precisa.',
    chat: [
      { from: 'user', text: 'Tô num rodízio, e agora?' },
      { from: 'bot', text: 'Vai de salada, grelhados e uma porção de arroz. Deixa a sobremesa pro fim de semana 😉' },
    ],
  },
] as const

export default function Situacoes() {
  const [ativo, setAtivo] = useState(0)
  const s = SITUACOES[ativo]

  return (
    <section id="situacoes" className="py-20 md:py-28 relative overflow-hidden">
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="eyebrow mb-7">Pra quem é</p>
          <h2 className="hd-2 mb-6 text-balance">Qual dessas situações é a sua?</h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Toque na que mais parece com você e veja o que muda no seu dia.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 items-stretch">
          {/* Lista de situações */}
          <div className="flex flex-col gap-3" role="tablist" aria-label="Situações">
            {SITUACOES.map((item, i) => {
              const sel = i === ativo
              const Icon = item.Icon
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  onClick={() => setAtivo(i)}
                  className={`situacao-card text-left ${sel ? 'is-active' : ''}`}
                >
                  <span className="situacao-icon">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-[15px] md:text-base leading-snug text-floresta">
                      {item.titulo}
                    </span>
                    <AnimatePresence initial={false}>
                      {sel && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-1.5 text-sm text-claro-br leading-relaxed">{item.dor}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <ArrowRight
                    size={18}
                    className={`mt-1 flex-shrink-0 transition-transform duration-300 ${sel ? 'translate-x-0 text-medio' : '-translate-x-1 text-menta'}`}
                  />
                </button>
              )
            })}
          </div>

          {/* Painel de resposta */}
          <div className="situacao-painel">
            <Image
              src="/img/almoco.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,38,10,0.35) 0%, rgba(20,38,10,0.88) 62%, rgba(20,38,10,0.96) 100%)' }} />

            <div className="relative z-[1] flex h-full flex-col justify-end p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="mb-5 flex flex-col gap-2">
                    {s.chat.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.94, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.35, duration: 0.3, ease: EASE }}
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug shadow-sm ${
                          m.from === 'user'
                            ? 'self-end rounded-tr-sm bg-[#D9F5C5] text-[#1b2416]'
                            : 'self-start rounded-tl-sm bg-white text-[#1b2416]'
                        }`}
                      >
                        {m.text}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-claro mb-2">
                    Como o NutriChat ajuda
                  </p>
                  <p className="font-display text-offwhite text-2xl md:text-[28px] leading-tight text-balance">
                    {s.ajuda}
                  </p>
                </motion.div>
              </AnimatePresence>

              <a
                href={waLink()}
                className="btn-cta mt-6 inline-flex items-center justify-center gap-2 self-start rounded-xl px-6 font-semibold text-sm"
                style={{ minHeight: 48, color: '#F0F7EC' }}
              >
                Quero isso no meu WhatsApp
                <ArrowRight size={16} className="btn-arrow" strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
