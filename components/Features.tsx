'use client'

import { motion } from 'framer-motion'
import { Camera, Mic, Bell, BarChart2, ScanBarcode, Shuffle } from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Registra a refeição em segundos',
    desc: 'Foto do prato, áudio ou texto — eu identifico o que você comeu, calculo os macros e guardo o registro. Sem planilha, sem app novo.',
  },
  {
    icon: Mic,
    title: 'Prefere falar? Manda áudio',
    desc: 'Sem tempo de digitar? Manda áudio de 10 segundos e eu cuido do resto — transcrevo, interpreto e registro pra você.',
  },
  {
    icon: Bell,
    title: 'Lembretes pra você não soltar',
    desc: 'Alerto nos horários das suas refeições. Você não esquece, não pula etapa, e a dieta vira parte do dia.',
  },
  {
    icon: BarChart2,
    title: 'Resumo semanal todo domingo',
    desc: 'Te mando um relatório do que foi bem, do que dá pra ajustar e do quanto você está perto da meta. Sem você precisar pedir.',
  },
  {
    icon: ScanBarcode,
    title: 'Mercado sem dúvida',
    desc: 'Foto do código de barras e eu te respondo na hora se aquilo cabe ou não no seu plano — antes do carrinho.',
  },
  {
    icon: Shuffle,
    title: 'Substituição já aprovada',
    desc: 'Acabou um alimento ou está fora de casa? Te indico um equivalente — sempre dentro do que combinamos no plano.',
  },
]

export default function Features() {
  return (
    <section id="funcionalidades" className="py-20 md:py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 460,
          height: 460,
          background: 'radial-gradient(circle, rgba(200,230,192,0.45), rgba(200,230,192,0))',
          bottom: '-15%',
          left: '-10%',
          opacity: 0.7,
        }}
      />
      <div className="relative z-[2] max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">O acompanhamento</p>
          <h2 className="h-2 mb-8 md:mb-10 text-balance">
            O que faltava pra você não largar a dieta de novo
          </h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Eu na sua rotina, todo dia — só o WhatsApp que você já abre.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glow-card bg-branco border border-menta rounded-2xl p-6 flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-floresta flex-shrink-0 mt-0.5"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(200,230,192,0.95), rgba(125,184,90,0.30))',
                  }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-floresta font-semibold mb-1.5 text-sm leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-claro-br text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
