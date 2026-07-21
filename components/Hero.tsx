'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'
import { nutri } from '@/lib/nutricionista'

const PhoneCanvas = dynamic(() => import('./PhoneCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background:
          'linear-gradient(135deg, rgba(200,230,192,0.5), rgba(125,184,90,0.18))',
      }}
    />
  ),
})

const easeOut = [0.22, 1, 0.36, 1] as const

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}
const floatContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.6 } },
}
const floatItem = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
}

function FloatingMacroCard() {
  return (
    <motion.div
      variants={floatItem}
      whileHover={{ rotate: -2, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="hero-float-card hero-float-card--left-mid"
      style={{
        animation: 'hero-float 3s ease-in-out infinite',
        animationDelay: '0s',
        minWidth: 158,
      }}
    >
      <div
        style={{
          width: 36, height: 36, borderRadius: 10, background: '#F0F7EC',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}
      >
        🥩
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#A0694A', fontWeight: 600 }}>Proteína</div>
        <div style={{ fontSize: 15, color: '#2D5016', fontWeight: 700 }}>48g ✓</div>
      </div>
    </motion.div>
  )
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
          {nutri.primeiroNome} • agora
        </div>
        <div style={{ fontSize: 13, color: '#2D5016', lineHeight: 1.4, fontWeight: 500 }}>
          🔔 Hora do almoço, registra aí?
        </div>
      </div>
    </motion.div>
  )
}

function FloatingProgress() {
  return (
    <motion.div
      variants={floatItem}
      whileHover={{ rotate: -1.5, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="hero-float-card hero-float-card--right-bot"
      style={{
        animation: 'hero-float 3.2s ease-in-out infinite',
        animationDelay: '0.5s',
        minWidth: 178,
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 0,
      }}
    >
      <div style={{ fontSize: 12, color: '#A0694A', fontWeight: 600, marginBottom: 7 }}>
        Meta de hoje
      </div>
      <div
        style={{
          height: 7, background: '#F0F7EC', borderRadius: 999,
          overflow: 'hidden', marginBottom: 6,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '68%' }}
          transition={{ duration: 1.4, delay: 1.2, ease: easeOut }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4A7C2F, #7DB85A)',
            borderRadius: 999,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: '#2D5016', fontWeight: 700 }}>68%</div>
        <div style={{ fontSize: 11, color: '#A0694A', fontWeight: 500 }}>1.632 / 2.400 kcal</div>
      </div>
    </motion.div>
  )
}

function NutricionistaAssinatura() {
  return (
    <motion.div variants={heroItem} className="flex items-center gap-3 mt-8">
      <div
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
          color: '#F0F7EC',
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 22, fontWeight: 400,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(45,80,22,0.28)',
          flexShrink: 0,
        }}
      >
        {nutri.iniciais}
      </div>
      <div>
        <p style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 17, color: '#2D5016', margin: 0, lineHeight: 1.2,
        }}>
          {nutri.nomeCompleto}
        </p>
        <p style={{
          fontSize: 13, color: '#6B5340', margin: 0, marginTop: 2,
        }}>
          {nutri.especialidade} · {nutri.crn}
        </p>
      </div>
    </motion.div>
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
        <motion.div
          className="min-w-0 order-2 md:order-1 text-center md:text-left"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={heroContainer}
        >
          <motion.p variants={heroItem} className="eyebrow mb-6 md:mb-7">
            Acompanhamento nutricional · 1:1
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="hd-display mb-7 md:mb-8 text-balance"
          >
            Sua dieta vira rotina quando alguém anda junto.
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="lead mb-9 text-pretty mx-auto md:mx-0"
            style={{ maxWidth: 480 }}
          >
            Sou {nutri.artigo} {nutri.primeiroNome}, {nutri.especialidadeInline}. Acompanho cada paciente pelo WhatsApp todos
            os dias — sem app pra baixar, sem login, sem planilha. Você manda foto
            do prato, eu vejo. Você esquece de comer, eu lembro.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
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
              Agendar minha avaliação
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
              Como eu trabalho
            </a>
          </motion.div>

          <div className="flex justify-center md:justify-start">
            <NutricionistaAssinatura />
          </div>
        </motion.div>

        {/* Coluna 3D */}
        <motion.div
          className="order-1 md:order-2"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={floatContainer}
        >
          <div className="hero-canvas-col">
            <div aria-hidden className="hero-spotlight" />
            <div className="hero-canvas-stage">
              <PhoneCanvas />
            </div>
            <FloatingMacroCard />
            <FloatingNotification />
            <FloatingProgress />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
