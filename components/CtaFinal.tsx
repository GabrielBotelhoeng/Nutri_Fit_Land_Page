'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export default function CtaFinal() {
  return (
    <section
      className="section-dark-pattern relative overflow-hidden py-24 md:py-36"
      style={{ background: '#1F3A0F' }}
    >
      {/* Foto gerada no Higgsfield: mãos fotografando o prato. A parede verde
          à esquerda vira o fundo do texto; o degradê garante contraste no mobile. */}
      <Image
        src="/img/maos-celular.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_center] -z-[2]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(20,38,10,0.94) 0%, rgba(20,38,10,0.82) 45%, rgba(20,38,10,0.25) 80%, rgba(20,38,10,0.1) 100%)',
        }}
      />

      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8"><div className="max-w-[560px] text-center md:text-left">
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
          className="text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 text-pretty leading-relaxed"
          style={{ color: 'rgba(200,230,192,0.92)' }}
        >
          Quase todo mundo que chega aqui já tentou sozinho antes. Desta vez, você não precisa estar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
        >
          <a
            href={waLink()}
            className="btn-cta inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base"
            style={{ minHeight: '56px', color: '#F0F7EC' }}
          >
            Começar pelo WhatsApp
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
      </div>
    </section>
  )
}
