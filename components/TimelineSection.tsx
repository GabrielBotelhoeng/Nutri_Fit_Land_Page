'use client'

import { motion } from 'framer-motion'

const events = [
  {
    time: '08:00',
    type: 'bot',
    text: '☀️ Bom dia! Hora do café da manhã. Lembra de registrar o que você comer!',
  },
  {
    time: '08:15',
    type: 'user',
    text: '📸 [Foto do prato]',
    isPhoto: true,
  },
  {
    time: '08:15',
    type: 'bot',
    text: 'Identifiquei: ovos mexidos, pão integral e café. Confirma?',
  },
  {
    time: '08:16',
    type: 'user',
    text: 'Isso mesmo! ✅',
  },
  {
    time: '08:16',
    type: 'bot',
    text: '✅ Registrado! +320kcal · Prot: 18g · Carb: 28g · Gord: 12g\nVocê consumiu 320 de 2.400kcal hoje.',
  },
  {
    time: '12:00',
    type: 'bot',
    text: '🍽️ Hora do almoço! Lembre-se de registrar sua refeição.',
  },
  {
    time: '12:32',
    type: 'user',
    text: '🎤 [Áudio de 8 segundos]',
    isAudio: true,
  },
  {
    time: '12:32',
    type: 'bot',
    text: '🎤 Entendi: arroz, feijão, frango grelhado e salada. Registrado!\n+640kcal · Você já consumiu 960 de 2.400kcal.',
  },
  {
    time: '19:00',
    type: 'bot',
    text: '🌙 Hora do jantar! E não esqueça da sua creatina hoje 💊',
  },
]

export default function TimelineSection() {
  return (
    <section className="py-20 bg-creme">
      <div className="max-w-[680px] mx-auto px-4 md:px-6">
        <div className="text-center mb-20 md:mb-28">
          <p className="eyebrow mb-7">Um dia comigo</p>
          <h2 className="h-2 mb-8 md:mb-10 text-balance">
            É essa a nossa conversa, todo dia
          </h2>
          <p className="lead text-pretty">
            Não tem formulário, não tem app. Tem eu, você e o WhatsApp.
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical alinhada ao dot (56px hora + gap-4 + metade do dot) */}
          <div
            className="absolute top-2 bottom-2 w-px pointer-events-none"
            style={{ background: '#C8E6C0', left: 'calc(56px + 1rem + 7px)' }}
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.38, delay: i * 0.07 }}
                className="flex gap-4 items-start"
              >
                {/* Hora */}
                <div className="w-14 flex-shrink-0 text-right">
                  <span className="text-xs font-semibold text-claro-br">{ev.time}</span>
                </div>

                {/* Dot */}
                <div className="flex-shrink-0 mt-1.5 z-10">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 border-branco"
                    style={{ background: ev.type === 'bot' ? '#2D5016' : '#7DB85A' }}
                  />
                </div>

                {/* Bolha */}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-[260px] sm:max-w-[340px] whitespace-pre-line leading-relaxed ${
                    ev.type === 'user'
                      ? 'ml-auto rounded-tr-none'
                      : 'rounded-tl-none'
                  }`}
                  style={
                    ev.type === 'user'
                      ? { background: '#25D366', color: '#fff' }
                      : { background: '#fff', color: '#6B3D1E', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                  }
                >
                  {ev.isPhoto && (
                    <span className="block text-2xl mb-1">🖼️</span>
                  )}
                  {ev.isAudio && (
                    <span className="block text-2xl mb-1">🎙️</span>
                  )}
                  {ev.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
