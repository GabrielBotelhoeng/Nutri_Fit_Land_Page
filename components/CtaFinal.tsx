'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export default function CtaFinal() {
  return (
    <section
      className="section-dark-pattern relative overflow-hidden py-24 md:py-28"
      style={{ background: 'linear-gradient(135deg, #1F3A0F 0%, #2D5016 50%, #1F3A0F 100%)' }}
    >
      {/* Aurora interna */}
      <div
        aria-hidden
        className="aurora-blob aurora-a"
        style={{
          width: 560,
          height: 560,
          background:
            'radial-gradient(circle, rgba(125,184,90,0.45), rgba(125,184,90,0))',
          top: '-20%',
          left: '-10%',
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 420,
          height: 420,
          background:
            'radial-gradient(circle, rgba(200,230,192,0.30), rgba(200,230,192,0))',
          bottom: '-15%',
          right: '-8%',
          opacity: 0.5,
        }}
      />

      <div className="relative z-[2] max-w-[820px] mx-auto px-4 md:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display text-balance leading-[1.05] mb-5 tracking-tight"
          style={{
            color: '#F0F7EC',
            fontSize: 'var(--fs-h1)',
            fontWeight: 400,
          }}
        >
          A dieta que você vai seguir até o fim começa quando alguém anda junto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-lg md:text-xl mb-10 max-w-lg mx-auto text-pretty leading-relaxed"
          style={{ color: 'rgba(200,230,192,0.92)' }}
        >
          Toda paciente que chega aqui já tentou sozinha antes. Da próxima vez você não precisa estar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={waLink()}
            className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base"
            style={{ minHeight: '56px', color: '#F0F7EC' }}
          >
            Quero começar com você
            <ArrowRight size={20} className="btn-arrow" strokeWidth={2.4} />
          </a>
          <a
            href="#planos"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-base transition-all"
            style={{
              minHeight: '56px',
              background: 'rgba(255,255,255,0.06)',
              color: '#C8E6C0',
              border: '1px solid rgba(200,230,192,0.30)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            Ver planos
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-sm mt-6"
          style={{ color: 'rgba(200,230,192,0.55)' }}
        >
          Sem fidelidade nos primeiros 30 dias. Você sai quando quiser.
        </motion.p>
      </div>
    </section>
  )
}
