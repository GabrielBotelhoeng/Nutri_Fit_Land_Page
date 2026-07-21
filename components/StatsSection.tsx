'use client'

import { motion } from 'framer-motion'
import { MessageCircle, CalendarDays, Stethoscope, HeartHandshake } from 'lucide-react'
import { nutri } from '@/lib/nutricionista'

const stats = [
  {
    value: 'WhatsApp',
    label: 'é onde eu te respondo — sem app pra baixar, sem login',
    Icon: MessageCircle,
  },
  {
    value: 'Todo dia',
    label: 'estou por aqui — inclusive fim de semana',
    Icon: CalendarDays,
  },
  {
    value: nutri.crnSigla,
    label: `${nutri.especialidadeInline} ${nutri.registrado}, atendimento humano`,
    Icon: Stethoscope,
  },
  {
    value: 'Só você',
    label: 'plano pensado pro seu corpo, sua rotina, seu objetivo',
    Icon: HeartHandshake,
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-offwhite relative">
      <div className="max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => {
            const Icon = s.Icon
            return (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="stat-card"
              >
                <div
                  className="mx-auto mb-3 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(200,230,192,0.6), rgba(125,184,90,0.18))',
                    color: '#2D5016',
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <p
                  className="font-display mb-2"
                  style={{
                    fontSize: 'clamp(22px, 2.6vw, 34px)',
                    lineHeight: 1.1,
                    color: '#2D5016',
                    letterSpacing: '-0.012em',
                  }}
                >
                  {s.value}
                </p>
                <p className="text-claro-br text-xs md:text-sm leading-snug">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
