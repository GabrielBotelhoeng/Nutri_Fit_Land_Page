'use client'

import { motion } from 'framer-motion'
import { ClipboardList, MessageCircle, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Você marca uma avaliação comigo',
    desc: 'A gente conversa sobre seu corpo, sua rotina e o que você já tentou. Eu monto um plano pensando em você — não copio nada de ninguém.',
  },
  {
    icon: MessageCircle,
    title: 'A gente fala todo dia pelo WhatsApp',
    desc: 'Você manda foto do prato, áudio, ou só me conta como foi. Eu respondo, ajusto, e te lembro das coisas — sem precisar baixar nenhum app.',
  },
  {
    icon: TrendingUp,
    title: 'Eu acompanho sua evolução semana a semana',
    desc: 'Todo domingo eu te mando um resumo da semana e a gente afina o plano. É consultório, só que no celular.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-24 relative overflow-hidden">
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
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">Como eu trabalho</p>
          <h2 className="hd-2 mb-8 md:mb-10 text-balance">
            Três passos pra você sair do achismo
          </h2>
          <p className="lead max-w-lg mx-auto text-pretty">
            Sem mistério. Você marca, a gente conversa, eu te acompanho.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Linha conectora desktop */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(125,184,90,0.55), transparent)',
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glow-card bg-branco rounded-2xl p-7 flex flex-col gap-4 border border-menta text-center"
              >
                <div
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center z-10 relative"
                  style={{
                    background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
                    color: '#F0F7EC',
                    boxShadow:
                      '0 8px 22px rgba(45,80,22,0.28), 0 0 0 6px rgba(255,255,255,0.95)',
                  }}
                >
                  <Icon size={24} strokeWidth={2.2} />
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #C8E6C0, #7DB85A)',
                      color: '#2D5016',
                      boxShadow: '0 2px 8px rgba(45,80,22,0.20)',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-floresta font-semibold text-lg mb-2 text-balance">
                    {step.title}
                  </h3>
                  <p className="text-claro-br text-sm leading-relaxed text-pretty">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
