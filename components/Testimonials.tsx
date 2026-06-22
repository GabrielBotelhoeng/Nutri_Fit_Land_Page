'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ana Paula M.',
    role: 'Paciente há 3 meses',
    text: 'Nas primeiras duas semanas já tinha perdido 3kg — e sem passar fome. Antes eu saía da consulta animada e na semana já tinha perdido o fio. Com a Camila acompanhando todo dia, isso não acontece mais.',
  },
  {
    name: 'Carlos Eduardo S.',
    role: 'Paciente há 2 meses',
    text: 'Achei que ia ser mais um app pra eu abandonar. Mas é a Camila no meu WhatsApp. Mando foto do prato, ela responde. Ela sabe o que eu comi antes mesmo de a gente conversar de novo.',
  },
  {
    name: 'Mariana Souza',
    role: 'Paciente há 5 meses',
    text: 'O que me marcou foi o resumo de domingo. A gente vê a semana inteira, onde eu escorreguei e quanto eu evolui. Eu finalmente entendo a minha alimentação — não só sigo uma lista.',
  },
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-a"
        style={{
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(125,184,90,0.22), rgba(125,184,90,0))',
          top: '-10%',
          right: '-8%',
          opacity: 0.7,
        }}
      />
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">Pacientes</p>
          <h2 className="h-2 mb-8 md:mb-10 text-balance">
            Pacientes minhas, palavras delas
          </h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Quem parou de tentar sozinho e topou ter alguém acompanhando todo dia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card"
            >
              <div className="flex gap-1 relative z-[1]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="text-claro fill-claro" />
                ))}
              </div>
              <p className="text-terra text-sm leading-relaxed flex-1 relative z-[1]">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-menta/60">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
                    color: '#F0F7EC',
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-floresta font-semibold text-sm leading-tight">
                    {t.name}
                  </p>
                  <p className="text-claro-br text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
