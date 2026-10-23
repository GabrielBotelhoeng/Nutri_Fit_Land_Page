'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Camera, Check, Droplet, Leaf, Mic, RotateCcw, ScanBarcode } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Demo interativa do NutriChat dentro de um celular em HTML.
   O visitante dispara as mensagens (foto / áudio / código) e cada
   refeição registrada alimenta o dashboard das abas Hoje e Semana.
   Sem interação, um autoplay percorre o roteiro em loop — e para
   de vez no primeiro toque, pra não brigar com quem está usando.
   ───────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const META_KCAL = 1900
const META = { p: 110, c: 220, g: 60 }
const COPOS = 8

type Kind = 'foto' | 'audio' | 'codigo'
type Tab = 'conversa' | 'hoje' | 'semana'

type Meal = { kind: Kind; nome: string; hora: string; kcal: number; p: number; c: number; g: number }
type Msg =
  | { id: number; from: 'bot'; text: string; meal?: Meal; hora: string }
  | { id: number; from: 'user'; kind: Kind; text?: string; hora: string }

const EXCHANGES: Record<Kind, { pergunta?: string; resposta: string; meal: Meal }> = {
  foto: {
    resposta: 'Ovos mexidos, pão integral e café com leite. Anotado no seu café da manhã ✅',
    meal: { kind: 'foto', nome: 'Café da manhã', hora: '08:12', kcal: 320, p: 18, c: 28, g: 12 },
  },
  audio: {
    resposta: 'Entendi: arroz, feijão, frango grelhado e salada. Almoço registrado ✅',
    meal: { kind: 'audio', nome: 'Almoço', hora: '12:34', kcal: 610, p: 42, c: 64, g: 16 },
  },
  codigo: {
    pergunta: 'Posso comer essa barrinha?',
    resposta: 'Cabe no seu plano: melhor no lanche da tarde, junto com uma fruta 👍',
    meal: { kind: 'codigo', nome: 'Lanche', hora: '16:05', kcal: 140, p: 9, c: 15, g: 5 },
  },
}

const ACTIONS: { kind: Kind; label: string; Icon: typeof Camera }[] = [
  { kind: 'foto', label: 'Foto', Icon: Camera },
  { kind: 'audio', label: 'Áudio', Icon: Mic },
  { kind: 'codigo', label: 'Código', Icon: ScanBarcode },
]

const SEMANA = [
  { dia: 'Seg', kcal: 1820 },
  { dia: 'Ter', kcal: 1960 },
  { dia: 'Qua', kcal: 1710 },
  { dia: 'Qui', kcal: 1880 },
  { dia: 'Sex', kcal: 2050 },
  { dia: 'Sáb', kcal: 1640 },
]

const GREETING: Msg = {
  id: 0,
  from: 'bot',
  hora: '08:00',
  text: 'Bom dia! ☀️ Me conta o que você comeu: foto do prato, áudio ou código de barras.',
}

const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/* ─────────────── peças visuais das mensagens ─────────────── */

function PlatePhoto() {
  return (
    <Image
      src="/img/cafe.webp"
      alt="Foto do café da manhã: ovos mexidos, pão integral e café com leite"
      width={160}
      height={160}
      className="mb-1.5 aspect-square w-[150px] rounded-lg object-cover"
    />
  )
}

function AudioBubble() {
  const bars = [5, 9, 14, 7, 12, 16, 10, 6, 13, 8, 15, 9, 5, 11, 7]
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D5016] text-[9px] text-white">▶</span>
      <div className="flex h-4 items-center gap-[2px]">
        {bars.map((h, i) => (
          <span key={i} className="w-[2px] rounded-full bg-[#2D5016]/60" style={{ height: h }} />
        ))}
      </div>
      <span className="text-[10px] text-[#5b6b53]">0:08</span>
    </div>
  )
}

function BarcodePhoto() {
  return (
    <div className="mb-1.5 flex h-[46px] items-center justify-center rounded-lg bg-white px-3">
      <div
        className="h-[30px] w-full"
        style={{
          background:
            'repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px,#111 8px 11px,transparent 11px 12px)',
        }}
      />
    </div>
  )
}

function MacroChips({ meal }: { meal: Meal }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      <span className="rounded-full bg-[#2D5016] px-1.5 py-[1px] text-[9.5px] font-semibold text-white">
        +{meal.kcal} kcal
      </span>
      {(
        [
          ['P', meal.p],
          ['C', meal.c],
          ['G', meal.g],
        ] as const
      ).map(([k, v]) => (
        <span key={k} className="rounded-full bg-[#EAF4E3] px-1.5 py-[1px] text-[9.5px] font-semibold text-[#2D5016]">
          {k} {v}g
        </span>
      ))}
    </div>
  )
}

/* ─────────────── abas ─────────────── */

function ChatView({
  msgs,
  typing,
  used,
  busy,
  onAction,
  onReset,
}: {
  msgs: Msg[]
  typing: boolean
  used: Kind[]
  busy: boolean
  onAction: (k: Kind) => void
  onReset: () => void
}) {
  const scroller = useRef<HTMLDivElement>(null)

  // Rola só o container interno — scrollIntoView arrastaria a página junto.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs.length, typing])

  const allUsed = used.length === ACTIONS.length

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scroller}
        className="phone-scroll flex flex-1 flex-col gap-1.5 overflow-y-auto px-2.5 pb-2 pt-3"
      >
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ transformOrigin: m.from === 'user' ? 'bottom right' : 'bottom left' }}
            >
              <div
                className={`max-w-[84%] px-2.5 py-1.5 text-[11.5px] leading-[1.38] text-[#1b2416] shadow-[0_1px_1px_rgba(0,0,0,.08)] ${
                  m.from === 'user'
                    ? 'rounded-[12px_3px_12px_12px] bg-[#D9F5C5]'
                    : 'rounded-[3px_12px_12px_12px] bg-white'
                }`}
              >
                {m.from === 'user' && m.kind === 'foto' && <PlatePhoto />}
                {m.from === 'user' && m.kind === 'codigo' && <BarcodePhoto />}
                {m.from === 'user' && m.kind === 'audio' && <AudioBubble />}
                {m.text && <span>{m.text}</span>}
                {m.from === 'bot' && m.meal && <MacroChips meal={m.meal} />}
                <div className="mt-0.5 text-right text-[8.5px] text-[#66705f]">
                  {m.hora}
                  {m.from === 'user' && <span className="ml-0.5 text-[#34B7F1]">✓✓</span>}
                </div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex"
            >
              <div className="flex gap-1 rounded-[3px_12px_12px_12px] bg-white px-3 py-2.5 shadow-[0_1px_1px_rgba(0,0,0,.08)]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#66705f]" style={{ animationDelay: `${i * 0.16}s` }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Barra de ações — é aqui que o visitante "conversa" */}
      <div className="flex items-center gap-1.5 border-t border-black/5 bg-[#f6f3ee] px-2 py-2">
        {allUsed ? (
          <button
            type="button"
            onClick={onReset}
            disabled={busy}
            className="phone-chip flex-1 justify-center"
          >
            <RotateCcw size={12} strokeWidth={2.4} /> Recomeçar o dia
          </button>
        ) : (
          ACTIONS.map(({ kind, label, Icon }) => {
            const done = used.includes(kind)
            return (
              <button
                key={kind}
                type="button"
                onClick={() => onAction(kind)}
                disabled={done || busy}
                aria-label={`Enviar ${label.toLowerCase()} no chat`}
                className={`phone-chip flex-1 justify-center ${done ? 'is-done' : ''}`}
              >
                {done ? <Check size={12} strokeWidth={2.6} /> : <Icon size={12} strokeWidth={2.4} />}
                {label}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

function Ring({ value, max }: { value: number; max: number }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const pct = Math.min(1, value / max)
  return (
    <div className="relative mx-auto h-[118px] w-[118px]">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#E4EEDC" strokeWidth="9" />
        <motion.circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={false}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 1, ease: EASE }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7DB85A" />
            <stop offset="100%" stopColor="#2D5016" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[22px] font-bold leading-none text-[#2D5016]"
        >
          {fmt(value)}
        </motion.span>
        <span className="mt-1 text-[9px] text-[#66543f]">de {fmt(max)} kcal</span>
      </div>
    </div>
  )
}

function TodayView({
  meals,
  water,
  onWater,
}: {
  meals: Meal[]
  water: number
  onWater: (n: number) => void
}) {
  const tot = meals.reduce(
    (a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.p, c: a.c + m.c, g: a.g + m.g }),
    { kcal: 0, p: 0, c: 0, g: 0 },
  )
  const macros = [
    { k: 'Proteína', v: tot.p, max: META.p, color: '#2D5016' },
    { k: 'Carbo', v: tot.c, max: META.c, color: '#7DB85A' },
    { k: 'Gordura', v: tot.g, max: META.g, color: '#C08A5B' },
  ]

  return (
    <div className="phone-scroll h-full overflow-y-auto px-3 pb-3 pt-3">
      <div className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(45,80,22,.08)]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#4A7C2F]">Hoje</span>
          <span className="text-[9.5px] text-[#66543f]">
            faltam {fmt(Math.max(0, META_KCAL - tot.kcal))} kcal
          </span>
        </div>
        <Ring value={tot.kcal} max={META_KCAL} />
        <div className="mt-2.5 flex flex-col gap-1.5">
          {macros.map((m) => (
            <div key={m.k}>
              <div className="mb-0.5 flex justify-between text-[9.5px]">
                <span className="font-semibold text-[#3b3026]">{m.k}</span>
                <span className="text-[#66543f]">
                  {m.v}/{m.max} g
                </span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-full bg-[#EEF3EA]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                  initial={false}
                  animate={{ width: `${Math.min(100, (m.v / m.max) * 100)}%` }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Água — cada copo é clicável */}
      <div className="mt-2.5 rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(45,80,22,.08)]">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10.5px] font-semibold text-[#3b3026]">
            <Droplet size={11} className="text-[#3A9AD9]" fill="#3A9AD9" /> Água
          </span>
          <span className="text-[9.5px] text-[#66543f]">
            {(water * 0.25).toFixed(2).replace('.', ',')} L de 2 L
          </span>
        </div>
        <div className="flex justify-between">
          {Array.from({ length: COPOS }).map((_, i) => {
            const cheio = i < water
            return (
              <motion.button
                key={i}
                type="button"
                whileTap={{ scale: 0.82 }}
                onClick={() => onWater(cheio && i === water - 1 ? i : i + 1)}
                aria-label={`Marcar ${i + 1} copo${i ? 's' : ''} de água`}
                className="relative h-[24px] w-[17px] overflow-hidden rounded-b-[5px] rounded-t-[2px] border-[1.5px] border-[#9cc9ea]"
              >
                <motion.span
                  className="absolute inset-x-0 bottom-0 bg-[#5DB2EA]"
                  initial={false}
                  animate={{ height: cheio ? '100%' : '0%' }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Refeições registradas */}
      <div className="mt-2.5 flex flex-col gap-1.5">
        {meals.length === 0 && (
          <p className="rounded-xl border border-dashed border-[#c9dcbd] px-3 py-2.5 text-center text-[10px] text-[#66543f]">
            Nenhuma refeição ainda. Volte na Conversa e mande uma foto 📷
          </p>
        )}
        {meals.map((m) => (
          <motion.div
            key={m.nome}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(45,80,22,.06)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EAF4E3] text-[#2D5016]">
              {m.kind === 'foto' ? <Camera size={12} /> : m.kind === 'audio' ? <Mic size={12} /> : <ScanBarcode size={12} />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10.5px] font-semibold text-[#2b2219]">{m.nome}</div>
              <div className="text-[9px] text-[#6b5b49]">{m.hora}</div>
            </div>
            <span className="text-[10.5px] font-bold text-[#2D5016]">{m.kcal} kcal</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function WeekView({ hoje }: { hoje: number }) {
  const dias = [...SEMANA, { dia: 'Dom', kcal: hoje }]
  const [sel, setSel] = useState(dias.length - 1)
  const max = 2300
  const d = dias[sel]
  const naMeta = dias.slice(0, 6).filter((x) => Math.abs(x.kcal - META_KCAL) <= 160).length

  return (
    <div className="phone-scroll h-full overflow-y-auto px-3 pb-3 pt-3">
      <div className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(45,80,22,.08)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#4A7C2F]">Semana</span>
          <span className="text-[9.5px] text-[#66543f]">toque num dia</span>
        </div>
        <div className="relative flex h-[118px] items-end justify-between gap-1.5">
          {/* linha da meta */}
          <div
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-[#7DB85A]"
            style={{ bottom: `${(META_KCAL / max) * 100}%` }}
          />
          {dias.map((x, i) => {
            const ativo = i === sel
            return (
              <button
                key={x.dia}
                type="button"
                onClick={() => setSel(i)}
                aria-label={`${x.dia}: ${x.kcal} kcal`}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
              >
                <motion.span
                  className="w-full rounded-[5px]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(Math.max(x.kcal, 40) / max) * 100}%` }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                  style={{
                    background: ativo
                      ? 'linear-gradient(180deg,#7DB85A,#2D5016)'
                      : i === dias.length - 1
                        ? '#cfe5c2'
                        : '#E2ECDA',
                  }}
                />
              </button>
            )
          })}
        </div>
        <div className="mt-1.5 flex justify-between">
          {dias.map((x, i) => (
            <span
              key={x.dia}
              className={`flex-1 text-center text-[9px] ${i === sel ? 'font-bold text-[#2D5016]' : 'text-[#6b5b49]'}`}
            >
              {i === dias.length - 1 ? 'Hoje' : x.dia}
            </span>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={sel + '-' + d.kcal}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 flex items-baseline justify-between rounded-xl bg-[#F3F8EF] px-2.5 py-2"
          >
            <span className="text-[10.5px] font-semibold text-[#2b2219]">
              {sel === dias.length - 1 ? 'Hoje' : d.dia}
            </span>
            <span className="text-[13px] font-bold text-[#2D5016]">{fmt(d.kcal)} kcal</span>
            <span className="text-[9.5px] text-[#66543f]">{Math.round((d.kcal / META_KCAL) * 100)}% da meta</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2.5 rounded-2xl p-3 text-white" style={{ background: 'linear-gradient(135deg,#2D5016,#4A7C2F)' }}>
        <div className="mb-1 text-[9.5px] font-semibold uppercase tracking-wider text-[#C8E6C0]">Resumo de domingo</div>
        <p className="text-[11px] leading-snug">
          Você ficou perto da meta em <b>{naMeta} de 6 dias</b>. Sexta passou um pouco; vale caprichar no jantar leve.
        </p>
      </div>
    </div>
  )
}

/* ─────────────── componente principal ─────────────── */

export default function PhoneDemo() {
  const reduced = useReducedMotion()
  const [tab, setTab] = useState<Tab>('conversa')
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [typing, setTyping] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])
  const [water, setWater] = useState(3)
  const [autoplay, setAutoplay] = useState(true)
  const [visible, setVisible] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const nextId = useRef(1)

  const used = meals.map((m) => m.kind)
  const busy = typing

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const play = useCallback(
    (kind: Kind) => {
      const ex = EXCHANGES[kind]
      setTab('conversa')
      setMsgs((m) => [...m, { id: nextId.current++, from: 'user', kind, text: ex.pergunta, hora: ex.meal.hora }])
      later(() => setTyping(true), 450)
      later(() => {
        setTyping(false)
        setMsgs((m) => [...m, { id: nextId.current++, from: 'bot', text: ex.resposta, meal: ex.meal, hora: ex.meal.hora }])
        setMeals((ms) => (ms.some((x) => x.kind === kind) ? ms : [...ms, ex.meal]))
      }, 1650)
    },
    [later],
  )

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setTyping(false)
    setMsgs([GREETING])
    setMeals([])
    setWater(3)
    setTab('conversa')
  }, [])

  // Pausa o roteiro automático quando o celular sai da tela.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Roteiro automático: foto → áudio → código → Hoje → Semana → recomeça.
  useEffect(() => {
    if (!autoplay || !visible || reduced) return
    const script: [number, () => void][] = [
      [1200, () => play('foto')],
      [3600, () => play('audio')],
      [3600, () => play('codigo')],
      [3400, () => setTab('hoje')],
      [4800, () => setTab('semana')],
      [4800, reset],
    ]
    const ids: ReturnType<typeof setTimeout>[] = []
    let acc = 0
    const run = () => {
      acc = 0
      script.forEach(([wait, fn], i) => {
        acc += wait
        ids.push(setTimeout(() => (i === script.length - 1 ? (fn(), run()) : fn()), acc))
      })
    }
    // Recomeça limpo sempre que o roteiro (re)entra na tela.
    ids.push(setTimeout(reset, 0))
    run()
    return () => ids.forEach(clearTimeout)
  }, [autoplay, visible, reduced, play, reset])

  const stopAutoplay = () => {
    if (autoplay) setAutoplay(false)
  }

  /* Tilt 3D seguindo o ponteiro (só mouse; em touch o celular fica parado) */
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 140, damping: 18 })
  const sry = useSpring(ry, { stiffness: 140, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'conversa', label: 'Conversa' },
    { id: 'hoje', label: 'Hoje' },
    { id: 'semana', label: 'Semana' },
  ]
  const kcalHoje = meals.reduce((a, m) => a + m.kcal, 0)

  return (
    <div
      ref={rootRef}
      className="phone-stage"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={stopAutoplay}
      onKeyDown={stopAutoplay}
    >
      <motion.div className="phone-frame" style={{ rotateX: srx, rotateY: sry }}>
        <span aria-hidden className="phone-btn phone-btn--power" />
        <span aria-hidden className="phone-btn phone-btn--vol1" />
        <span aria-hidden className="phone-btn phone-btn--vol2" />

        <div className="phone-screen">
          {/* status bar + dynamic island */}
          <div className="relative flex h-[30px] items-center justify-between px-5 text-[10.5px] font-semibold text-[#1b2416]">
            <span>9:41</span>
            <span aria-hidden className="absolute left-1/2 top-[7px] h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1" aria-hidden>
              <span className="tracking-[-1px]">▮▮▮</span>
              <span className="inline-block h-[9px] w-[18px] rounded-[3px] border border-[#1b2416] p-[1px]">
                <span className="block h-full w-[70%] rounded-[1px] bg-[#1b2416]" />
              </span>
            </span>
          </div>

          {/* cabeçalho do chat */}
          <div className="flex items-center gap-2 px-3 pb-2 pt-1">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg,#2D5016,#4A7C2F)' }}>
              <Leaf size={15} className="text-[#C8E6C0]" strokeWidth={2.4} />
              <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full border-2 border-[#f6f3ee] bg-[#25D366]" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[12.5px] font-bold text-[#1b2416]">NutriChat</div>
              <div className="truncate text-[9.5px] text-[#4A7C2F]">
                {typing ? 'digitando…' : 'assistente do seu nutricionista'}
              </div>
            </div>
          </div>

          {/* segmented control */}
          <div className="mx-3 mb-1 flex rounded-full bg-[#ebe6dd] p-[3px]" role="tablist" aria-label="Telas do app">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className="relative flex-1 rounded-full py-[5px] text-[10.5px] font-semibold"
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="phone-tab-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.12)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative ${tab === t.id ? 'text-[#2D5016]' : 'text-[#66543f]'}`}>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="relative min-h-0 flex-1 bg-[#EFE9E0]" style={{ backgroundImage: 'radial-gradient(rgba(45,80,22,.05) 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                {tab === 'conversa' && (
                  <ChatView msgs={msgs} typing={typing} used={used} busy={busy} onAction={play} onReset={reset} />
                )}
                {tab === 'hoje' && <TodayView meals={meals} water={water} onWater={setWater} />}
                {tab === 'semana' && <WeekView hoje={kcalHoje} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div aria-hidden className="flex h-[18px] items-center justify-center bg-[#f6f3ee]">
            <span className="h-[4px] w-[96px] rounded-full bg-black/80" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {autoplay && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="phone-hint"
          >
            <span className="phone-hint-dot" /> Toque no celular pra testar
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
