'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, X } from 'lucide-react'
import { LISTA_ESPERA_HREF, whatsappAtivo } from '@/lib/whatsapp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const PLANOS = ['Mensal', 'Trimestral', 'Semestral', 'Anual'] as const

type Estado = { tipo: 'idle' } | { tipo: 'enviando' } | { tipo: 'ok'; nome: string } | { tipo: 'erro'; mensagem: string }

/* Modal da lista de espera. Enquanto não há WhatsApp configurado, waLink()
   devolve "#lista-espera[:Plano]" e este componente intercepta esses cliques
   (delegação no document), então nenhum CTA precisou ser reescrito. */
export default function ListaEspera() {
  const [aberto, setAberto] = useState(false)
  const [plano, setPlano] = useState('')
  const [estado, setEstado] = useState<Estado>({ tipo: 'idle' })
  const primeiroCampo = useRef<HTMLInputElement>(null)
  const voltarFoco = useRef<HTMLElement | null>(null)

  const abrir = useCallback((planoInicial: string, origem: HTMLElement | null) => {
    voltarFoco.current = origem
    setPlano(PLANOS.includes(planoInicial as (typeof PLANOS)[number]) ? planoInicial : '')
    setEstado({ tipo: 'idle' })
    setAberto(true)
  }, [])

  const fechar = useCallback(() => {
    setAberto(false)
    voltarFoco.current?.focus()
    if (window.location.hash.startsWith(LISTA_ESPERA_HREF)) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  // Intercepta todo link "#lista-espera…" da página.
  useEffect(() => {
    if (whatsappAtivo) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(`a[href^="${LISTA_ESPERA_HREF}"]`)
      if (!a) return
      e.preventDefault()
      const [, planoDoLink = ''] = decodeURIComponent(a.getAttribute('href') ?? '').split(':')
      abrir(planoDoLink, a)
    }
    document.addEventListener('click', onClick)
    // Quem chega por um link compartilhado com #lista-espera já vê o formulário.
    let id: number | undefined
    if (window.location.hash.startsWith(LISTA_ESPERA_HREF)) {
      id = window.setTimeout(() => abrir(decodeURIComponent(window.location.hash).split(':')[1] ?? '', null), 0)
    }
    return () => {
      document.removeEventListener('click', onClick)
      window.clearTimeout(id)
    }
  }, [abrir])

  // Aberto: trava o scroll, foca o primeiro campo e fecha no Esc.
  useEffect(() => {
    if (!aberto) return
    document.body.classList.add('menu-open')
    const id = window.setTimeout(() => primeiroCampo.current?.focus(), 60)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && fechar()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKey)
    }
  }, [aberto, fechar])

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const nome = String(form.get('nome') ?? '')
    setEstado({ tipo: 'enviando' })
    try {
      const res = await fetch('/api/lista-espera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          contato: form.get('contato'),
          plano: form.get('plano') || null,
          consentimento: form.get('consentimento') === 'on',
          site: form.get('site'),
        }),
      })
      const data = (await res.json()) as { ok: boolean; mensagem?: string }
      if (!res.ok || !data.ok) throw new Error(data.mensagem ?? 'Não conseguimos salvar agora.')
      setEstado({ tipo: 'ok', nome: nome.trim().split(' ')[0] })
    } catch (error) {
      setEstado({ tipo: 'erro', mensagem: error instanceof Error ? error.message : 'Erro inesperado.' })
    }
  }

  if (whatsappAtivo) return null

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="le-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && fechar()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="le-titulo"
            className="le-dialog"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button type="button" onClick={fechar} className="le-fechar" aria-label="Fechar">
              <X size={20} />
            </button>

            {estado.tipo === 'ok' ? (
              <div className="py-6 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-floresta text-offwhite"
                >
                  <Check size={30} strokeWidth={3} />
                </motion.span>
                <h2 id="le-titulo" className="hd-3 mb-2">
                  Pronto{estado.nome ? `, ${estado.nome}` : ''}!
                </h2>
                <p className="text-[15px] leading-relaxed text-[#6B5340]">
                  Você está na lista. Assim que as vagas abrirem, a gente te avisa pelo contato que você deixou.
                </p>
                <button type="button" onClick={fechar} className="btn-cta mt-6 rounded-xl px-6 text-sm font-semibold text-offwhite" style={{ minHeight: 48 }}>
                  Voltar pra página
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate={false}>
                <p className="eyebrow mb-3">Pré-lançamento</p>
                <h2 id="le-titulo" className="hd-3 mb-2 text-balance">
                  Entre na lista de espera
                </h2>
                <p className="mb-6 text-[15px] leading-relaxed text-[#6B5340]">
                  O NutriChat está abrindo as primeiras vagas. Deixe seu contato e a gente avisa quando for a sua vez.
                </p>

                <label className="le-label" htmlFor="le-nome">Seu nome</label>
                <input
                  ref={primeiroCampo}
                  id="le-nome"
                  name="nome"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="given-name"
                  className="le-input"
                  placeholder="Como podemos te chamar?"
                />

                <label className="le-label" htmlFor="le-contato">WhatsApp ou e-mail</label>
                <input
                  id="le-contato"
                  name="contato"
                  required
                  maxLength={120}
                  autoComplete="email"
                  inputMode="email"
                  className="le-input"
                  placeholder="(11) 91234-5678 ou voce@email.com"
                />

                <label className="le-label" htmlFor="le-plano">
                  Plano de interesse <span className="font-normal text-claro-br">(opcional)</span>
                </label>
                <select id="le-plano" name="plano" value={plano} onChange={(e) => setPlano(e.target.value)} className="le-input">
                  <option value="">Ainda não sei</option>
                  {PLANOS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                {/* Armadilha pra bots: fora da tela e fora da ordem de tabulação */}
                <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="le-trap" />

                <label className="mt-4 flex items-start gap-3 text-[13px] leading-snug text-[#4A3122]">
                  <input type="checkbox" name="consentimento" required className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#2D5016]" />
                  Autorizo o NutriChat a guardar meu nome e contato só pra me avisar sobre o lançamento. Posso pedir pra sair da lista quando quiser.
                </label>

                <AnimatePresence>
                  {estado.tipo === 'erro' && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-lg bg-[#FDF0EE] px-3 py-2 text-sm font-medium text-[#9B2020]"
                    >
                      {estado.mensagem}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={estado.tipo === 'enviando'}
                  className="btn-cta mt-6 flex w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-offwhite disabled:opacity-70"
                  style={{ minHeight: 54 }}
                >
                  {estado.tipo === 'enviando' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Enviando…
                    </>
                  ) : (
                    'Quero entrar na lista'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
