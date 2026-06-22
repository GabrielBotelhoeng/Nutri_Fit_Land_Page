'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export default function ImpactSection() {
  return (
    <section
      className="section-dark-pattern relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(135deg, #1F3A0F 0%, #2D5016 60%, #1F3A0F 100%)' }}
    >
      {/* Aurora interna */}
      <div
        aria-hidden
        className="aurora-blob aurora-a"
        style={{
          width: 480,
          height: 480,
          background:
            'radial-gradient(circle, rgba(125,184,90,0.45), rgba(125,184,90,0))',
          top: '-15%',
          right: '-10%',
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 380,
          height: 380,
          background:
            'radial-gradient(circle, rgba(200,230,192,0.30), rgba(200,230,192,0))',
          bottom: '-12%',
          left: '-8%',
          opacity: 0.5,
        }}
      />

      <div className="relative z-[2] max-w-[900px] mx-auto px-4 md:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: '#7DB85A' }}
        >
          Meu método
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display text-balance leading-[1.05] mb-6 tracking-tight"
          style={{
            color: '#F0F7EC',
            fontSize: 'var(--fs-h1)',
            fontWeight: 400,
          }}
        >
          Você já teve a dieta certa. O que faltou foi alguém andar junto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-pretty leading-relaxed"
          style={{ color: 'rgba(200,230,192,0.92)' }}
        >
          Sem app pra baixar. Sem login. Só você, eu e o WhatsApp que você já usa todo dia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={waLink()}
            className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm"
            style={{ minHeight: '52px', color: '#F0F7EC' }}
          >
            Quero conhecer o método
            <ArrowRight size={18} className="btn-arrow" strokeWidth={2.4} />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              minHeight: '52px',
              background: 'rgba(255,255,255,0.06)',
              color: '#C8E6C0',
              border: '1px solid rgba(200,230,192,0.30)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            Ver como funciona
          </a>
        </motion.div>
      </div>
    </section>
  )
}
