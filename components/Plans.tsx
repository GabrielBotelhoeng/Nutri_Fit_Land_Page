'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

const plans = [
  {
    label: 'Mensal',
    sublabel: 'Pra começar',
    priceMonth: 330,
    billed: null,
    period: '1 mês',
    desc: 'Pra quem quer me conhecer antes de fechar um acompanhamento mais longo.',
    savings: null,
    highlight: false,
    badge: null,
  },
  {
    label: 'Trimestral',
    sublabel: 'O que eu recomendo',
    priceMonth: 222,
    billed: 666,
    period: '3 meses',
    desc: 'Três meses é o tempo mínimo que eu peço pra a gente ver mudança real no corpo e na rotina.',
    savings: '33% mais em conta',
    highlight: true,
    badge: 'Plano que recomendo',
  },
  {
    label: 'Semestral',
    sublabel: 'Pra ir mais fundo',
    priceMonth: 130,
    billed: 780,
    period: '6 meses',
    desc: 'Seis meses é onde a maioria das minhas pacientes chega na meta — sem voltar atrás.',
    savings: '61% mais em conta',
    highlight: false,
    badge: null,
  },
  {
    label: 'Anual',
    sublabel: 'Pra mudar o estilo de vida',
    priceMonth: 89.9,
    billed: 1078.8,
    period: '12 meses',
    desc: 'Pra quem não quer só perder uns quilos — quer mudar a relação com a comida.',
    savings: '73% mais em conta — melhor custo-benefício',
    highlight: false,
    badge: null,
  },
]

const included = [
  'Atendimento comigo pelo WhatsApp, todo dia',
  'Plano alimentar personalizado em PDF',
  'Registro por foto, áudio, texto e código de barras',
  'Lembretes nos horários das suas refeições',
  'Resumo semanal todo domingo',
  'Substituições aprovadas por mim',
]

export default function Plans() {
  return (
    <section id="planos" className="py-20 md:py-24 relative overflow-hidden">
      <div
        aria-hidden
        className="aurora-blob aurora-b"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(125,184,90,0.20), rgba(125,184,90,0))',
          top: '-12%',
          right: '-8%',
          opacity: 0.6,
        }}
      />
      <div className="relative z-[2] max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">Investimento</p>
          <h2 className="h-2 mb-8 md:mb-10 text-balance">
            Quanto mais tempo a gente caminha junto, mais barato fica
          </h2>
          <p className="lead max-w-xl mx-auto text-pretty">
            Todo plano tem o acompanhamento inteiro. A diferença é só por quanto tempo.
          </p>
        </div>

        {/* Grid 4 colunas, items-stretch para altura igual */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl p-6 flex flex-col relative ${
                plan.highlight
                  ? 'border-conic plan-popular md:scale-[1.04]'
                  : 'glow-card border border-menta bg-branco'
              }`}
              style={
                plan.highlight
                  ? {
                      background:
                        'linear-gradient(160deg, #2D5016 0%, #1F3A0F 100%)',
                    }
                  : undefined
              }
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{ background: '#7DB85A', color: '#2D5016' }}
                >
                  {plan.badge}
                </span>
              )}

              {/* Cabeçalho */}
              <div className="mb-5">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: plan.highlight ? '#C8E6C0' : '#7DB85A' }}
                >
                  {plan.label}
                </p>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: plan.highlight ? '#F0F7EC' : '#2D5016' }}
                >
                  {plan.sublabel}
                </p>

                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="font-bold text-3xl"
                    style={{ color: plan.highlight ? '#F0F7EC' : '#2D5016' }}
                  >
                    R$ {plan.priceMonth.toFixed(2).replace('.', ',')}
                  </span>
                  <span
                    className="text-xs mb-1.5"
                    style={{ color: plan.highlight ? '#C8E6C0' : '#A0694A' }}
                  >
                    /mês
                  </span>
                </div>

                <p
                  className="text-xs"
                  style={{ color: plan.highlight ? '#C8E6C0' : '#A0694A' }}
                >
                  {plan.desc}
                </p>

                {plan.savings && (
                  <p
                    className="text-xs font-semibold mt-2 px-2 py-0.5 rounded-full inline-block"
                    style={{
                      background: plan.highlight ? '#7DB85A' : '#C8E6C0',
                      color: '#2D5016',
                    }}
                  >
                    {plan.savings}
                  </p>
                )}
              </div>

              {/* Funcionalidades — flex-1 para equalizar altura */}
              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {included.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check
                      size={13}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: plan.highlight ? '#C8E6C0' : '#4A7C2F' }}
                    />
                    <span style={{ color: plan.highlight ? '#F0F7EC' : '#6B3D1E' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA fixado no fundo */}
              <a
                href={waLink(plan.label)}
                className="btn-primary block text-center py-3 rounded-xl font-semibold text-sm"
                aria-label={`Falar comigo sobre o plano ${plan.label}`}
                style={
                  plan.highlight
                    ? {
                        background: '#C8E6C0',
                        color: '#2D5016',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    : {
                        background: '#2D5016',
                        color: '#F0F7EC',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                }
              >
                Falar comigo sobre o {plan.label}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-claro-br text-sm mt-8">
          Tem dúvida?{' '}
          <a
            href={waLink()}
            className="text-floresta underline hover:text-medio transition-colors"
          >
            Me chama no WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}
