'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Camera,
  Mic,
  Barcode,
  Tag,
  Calculator,
  Bell,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

const cards = [
  { Icon: BookOpen,       title: 'Eu conheço sua dieta inteira',  desc: 'O plano que eu monto fica comigo no WhatsApp — não esqueço nenhum detalhe do que combinamos.' },
  { Icon: Camera,         title: 'Você manda foto do prato',      desc: 'Identifico o que você comeu e calculo os macros pra você não precisar contar nada na mão.' },
  { Icon: Mic,            title: 'Ou só me manda um áudio',       desc: 'Fala o que comeu, eu entendo e registro. Bom pros dias em que digitar dá preguiça.' },
  { Icon: Barcode,        title: 'Mercado? Manda o código',       desc: 'Foto do código de barras e eu te respondo na hora se aquilo encaixa na sua dieta.' },
  { Icon: Tag,            title: 'Rótulo nutricional também',     desc: 'Foto da tabela e os dados entram no seu histórico — sem você digitar nada.' },
  { Icon: Calculator,     title: 'Calorias, macros e água',       desc: 'Tudo somado durante o dia, sem você precisar abrir planilha nem app de contagem.' },
  { Icon: Bell,           title: 'Lembro você de comer',          desc: 'Mando alerta nos seus horários — todo dia, inclusive sábado e domingo.' },
  { Icon: ArrowLeftRight, title: 'Substituições que eu aprovo',   desc: 'Acabou um alimento? Eu te indico outro equivalente — sempre dentro do que combinamos.' },
  { Icon: TrendingUp,     title: 'Resumo da semana no domingo',   desc: 'Te mando um relatório de como foi a semana, sem você pedir. A gente ajusta o plano a partir dele.' },
  { Icon: ShieldCheck,    title: 'Aviso quando vai vencer',       desc: 'Antes do seu acompanhamento expirar, eu te aviso e a gente combina como seguir.' },
]

export default function WhatItDoes() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">O que eu acompanho</p>
          <h2 className="hd-2 mb-8 md:mb-10 text-balance">
            Tudo isso entre nós dois, pelo WhatsApp
          </h2>
          <p className="lead max-w-lg mx-auto text-pretty">
            Não é um app que te entrega uma planilha. Sou eu acompanhando, todo dia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
          {cards.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glow-card bg-branco rounded-2xl p-5 flex flex-col gap-3 border border-menta"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(200,230,192,0.95), rgba(125,184,90,0.30))',
                }}
              >
                <Icon size={19} style={{ color: '#2D5016' }} strokeWidth={2.2} />
              </div>
              <h3 className="text-floresta font-semibold text-sm leading-snug">{title}</h3>
              <p className="text-claro-br text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
