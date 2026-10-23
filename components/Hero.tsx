'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'
import { nutri } from '@/lib/nutricionista'
import PhoneDemo from './PhoneDemo'

const easeOut = [0.22, 1, 0.36, 1] as const

const floatContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.6 } },
}
const floatItem = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
}

function FloatingNotification() {
  return (
    <motion.div
      variants={floatItem}
      whileHover={{ rotate: 1.5, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="hero-float-card hero-float-card--right-top"
      style={{
        animation: 'hero-float 3.4s ease-in-out infinite',
        animationDelay: '1s',
        maxWidth: 230,
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 32, height: 32, borderRadius: '50%', background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="17" height="17">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#25D366', fontWeight: 700, marginBottom: 3 }}>
          NutriChat • agora
        </div>
        <div style={{ fontSize: 13, color: '#2D5016', lineHeight: 1.4, fontWeight: 500 }}>
          🔔 Hora do almoço, registra aí?
        </div>
      </div>
    </motion.div>
  )
}

function Assinatura() {
  if (nutri) {
    return (
      <div className="flex items-center gap-3 mt-8">
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
            color: '#F0F7EC',
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 22,
            boxShadow: '0 4px 14px rgba(45,80,22,0.28)',
          }}
        >
          {nutri.iniciais}
        </div>
        <div className="text-left">
          <p className="font-display m-0 text-[17px] leading-tight text-floresta">{nutri.nomeCompleto}</p>
          <p className="m-0 mt-0.5 text-[13px] text-[#6B5340]">
            {nutri.especialidade} · {nutri.crn}
          </p>
        </div>
      </div>
    )
  }
  return (
    <ul className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 p-0 list-none">
      {['Sem app pra baixar', 'Sem login', 'Plano feito por nutricionista'].map((t) => (
        <li key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A3122]">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-menta text-floresta">
            <Check size={11} strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="hero-section relative overflow-hidden py-12 md:py-20">
      <div
        aria-hidden
        className="aurora-blob aurora-a"
        style={{
          width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(125,184,90,0.55), rgba(125,184,90,0))',
          top: '-10%', right: '-8%', opacity: 0.7,
        }}
      />
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(200,230,192,0.7), rgba(200,230,192,0))',
          bottom: '-8%', left: '-6%', opacity: 0.65,
        }}
      />

      <div className="hero-grid relative z-[2] max-w-[1152px] mx-auto w-full px-5 md:px-6 lg:px-8">
        {/* Coluna texto */}
        {/* Entrada em CSS puro (classes hero-rise): roda antes da hidratação e o
            título/parágrafo nunca começam invisíveis — senão o LCP espera o JS. */}
        <div className="min-w-0 text-center md:text-left">
          <p className="hero-rise eyebrow mb-6 md:mb-7">
            Acompanhamento nutricional no WhatsApp
          </p>

          <h1 className="hero-rise hero-rise--solid hd-display mb-7 md:mb-8 text-balance" style={{ animationDelay: '60ms' }}>
            Sua dieta vira rotina quando alguém anda junto.
          </h1>

          <p
            className="hero-rise hero-rise--solid lead mb-9 text-pretty mx-auto md:mx-0"
            style={{ maxWidth: 480, animationDelay: '120ms' }}
          >
            O NutriChat segue o plano do seu nutricionista com você, todo dia, no
            WhatsApp. Você manda a foto do prato e ele registra, soma os macros e
            lembra da próxima refeição. Sem app, sem login, sem planilha.
          </p>

          <div
            className="hero-rise flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            style={{ animationDelay: '200ms' }}
          >
            <a
              href={waLink()}
              className="btn-cta rounded-xl font-semibold text-center"
              style={{
                minHeight: 54,
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                color: '#F0F7EC',
                fontSize: 15,
              }}
            >
              Começar pelo WhatsApp
              <ArrowRight size={18} className="btn-arrow" strokeWidth={2.4} />
            </a>
            <a
              href="#como-funciona"
              className="rounded-xl font-medium text-center transition-all"
              style={{
                minHeight: 54,
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2D5016',
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(45,80,22,0.18)',
                fontSize: 15,
              }}
            >
              Ver como funciona
            </a>
          </div>

          <div className="hero-rise flex justify-center md:justify-start" style={{ animationDelay: '280ms' }}>
            <Assinatura />
          </div>
        </div>

        {/* Coluna 3D */}
        <motion.div
          className="mt-4 md:mt-0"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={floatContainer}
        >
          <div className="hero-canvas-col">
            <div aria-hidden className="hero-spotlight" />
            <PhoneDemo />
            <FloatingNotification />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
