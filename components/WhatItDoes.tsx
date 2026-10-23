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
  { Icon: BookOpen,       title: 'Conhece sua dieta inteira',     desc: 'O plano do seu nutricionista fica no WhatsApp. Nenhum detalhe do que foi combinado se perde.' },
  { Icon: Camera,         title: 'Você manda foto do prato',      desc: 'O NutriChat identifica o que você comeu e calcula os macros. Você não conta nada na mão.' },
  { Icon: Mic,            title: 'Ou só manda um áudio',          desc: 'Fala o que comeu e ele entende e registra. Bom pros dias em que digitar dá preguiça.' },
  { Icon: Barcode,        title: 'Mercado? Manda o código',       desc: 'Foto do código de barras e a resposta vem na hora: aquilo encaixa ou não na sua dieta.' },
  { Icon: Tag,            title: 'Rótulo nutricional também',     desc: 'Foto da tabela e os dados entram no seu histórico — sem você digitar nada.' },
  { Icon: Calculator,     title: 'Calorias, macros e água',       desc: 'Tudo somado durante o dia, sem você precisar abrir planilha nem app de contagem.' },
  { Icon: Bell,           title: 'Lembra você de comer',          desc: 'Alerta nos seus horários, todo dia, inclusive sábado e domingo.' },
  { Icon: ArrowLeftRight, title: 'Substituições aprovadas',       desc: 'Acabou um alimento? Ele indica um equivalente, sempre dentro do que o seu nutricionista aprovou.' },
  { Icon: TrendingUp,     title: 'Resumo da semana no domingo',   desc: 'Um relatório de como foi a semana chega sem você pedir. O ajuste do plano parte dele.' },
  { Icon: ShieldCheck,    title: 'Aviso quando vai vencer',       desc: 'Antes do seu acompanhamento expirar, você recebe um aviso pra decidir como seguir.' },
]

export default function WhatItDoes() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">O que ele faz</p>
          <h2 className="hd-2 mb-8 md:mb-10 text-balance">
            Tudo isso numa conversa de WhatsApp
          </h2>
          <p className="lead max-w-lg mx-auto text-pretty">
            Não é um app que te entrega uma planilha. É acompanhamento de verdade, todo dia.
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
