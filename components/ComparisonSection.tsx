'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const withoutItems = [
  'Você esquece dos horários das refeições',
  'Não sabe quanto comeu nem se atingiu o macro',
  'Fica perdido no mercado entre o que pode e o que não pode',
  'Perde o fio da dieta entre uma consulta e outra',
  'Desiste porque ninguém vê de perto o que você está fazendo',
]

const withItems = [
  'Eu te lembro dos horários, todo dia',
  'A gente acompanha os macros do seu dia em tempo real',
  'Mandou o código de barras, eu respondo na hora',
  'Falo com você pelo WhatsApp, todo dia, inclusive fim de semana',
  'Tem alguém ao seu lado pra você não soltar a mão',
]

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">Antes e depois</p>
          <h2 className="hd-2 mb-8 md:mb-10 text-balance">
            O que muda quando você não está mais sozinho
          </h2>
          <p className="lead text-pretty">
            Não é mágica. É ter alguém olhando junto, todo dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
          {/* SEM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="p-6 md:p-8 flex flex-col gap-4"
            style={{ background: '#FDF0EE' }}
          >
            <p className="font-bold text-lg mb-2" style={{ color: '#9B2020' }}>
              Antes de me acompanhar
            </p>
            <ul className="flex flex-col gap-3">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#6B3D1E' }}>
                  <X size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#C0392B' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="p-6 md:p-8 flex flex-col gap-4"
            style={{ background: '#C8E6C0' }}
          >
            <p className="font-bold text-lg mb-2 text-floresta">
              Depois de me acompanhar
            </p>
            <ul className="flex flex-col gap-3">
              {withItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-floresta">
                  <Check size={16} className="flex-shrink-0 mt-0.5 text-medio" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
