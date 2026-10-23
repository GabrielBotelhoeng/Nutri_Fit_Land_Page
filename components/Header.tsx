'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Leaf, Menu, X } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'
import { marca, nutri } from '@/lib/nutricionista'

const navLinks = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#situacoes', label: 'Pra quem é' },
  { href: '#funcionalidades', label: 'Recursos' },
  { href: '#planos', label: 'Planos' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// true só no client — o portal do drawer depende de `document`.
const noop = () => () => {}
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false)

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/* Qual seção está no meio da tela — pra destacar o link correspondente. */
function useActiveSection() {
  const [ativo, setAtivo] = useState<string | null>(null)
  useEffect(() => {
    const els = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = `#${e.target.id}`
          if (e.isIntersecting) setAtivo(id)
          // Saiu do meio da tela e era o ativo: nenhuma seção do menu está em foco.
          else setAtivo((atual) => (atual === id ? null : atual))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ativo
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isClient = useIsClient()
  const ativo = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Menu aberto: trava o scroll da página e fecha no Esc. */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  return (
    <header
      className="sticky top-0 z-50 transition-[box-shadow,border-color] duration-300"
      style={{
        background: 'rgba(240,247,236,0.88)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        borderBottom: scrolled ? '1px solid #C8E6C0' : '1px solid transparent',
        boxShadow: scrolled ? '0 6px 24px rgba(45,80,22,0.08)' : 'none',
      }}
    >
      <div className="max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo — marca NutriChat (ou o nutri real, se configurado) */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span
            className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full text-offwhite"
            style={{
              background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 18,
            }}
          >
            {nutri ? nutri.iniciais : <Leaf size={18} strokeWidth={2.4} />}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] tracking-[-0.01em] text-floresta">
              {nutri ? nutri.nomeCompleto : marca}
            </span>
            <span className="mt-0.5 text-[11px] tracking-[0.04em] text-[#6B5340]">
              {nutri ? `${nutri.especialidade} · ${nutri.crn}` : 'Nutrição no WhatsApp'}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${ativo === link.href ? 'is-active' : ''}`}
              aria-current={ativo === link.href ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink()}
            className="btn-wa-glow flex min-h-[44px] items-center gap-2 rounded-lg bg-floresta px-5 text-sm font-semibold text-offwhite no-underline"
          >
            <WhatsAppIcon />
            Começar agora
          </a>
        </nav>

        {/* Hamburger mobile */}
        <button
          type="button"
          className="md:hidden -mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-floresta"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'x' : 'm'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Drawer mobile — em portal no <body>: sticky + backdrop-filter do header
          criam um containing block que cortaria o position:fixed. */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="menu-mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto px-6 pb-8 pt-6"
                // position/zIndex inline: a regra global `body > * { position: relative }`
                // venceria as classes utilitárias, já que o portal é filho direto do <body>.
                style={{
                  position: 'fixed',
                  zIndex: 60,
                  background: 'linear-gradient(180deg, #F0F7EC 0%, #E4F0DC 100%)',
                }}
              >
                <nav className="flex flex-col" aria-label="Menu">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: EASE }}
                      className="drawer-row"
                    >
                      <span className="text-xs font-semibold tabular-nums text-medio">0{i + 1}</span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowRight size={18} className="text-claro" />
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35, ease: EASE }}
                  className="mt-auto pt-8"
                >
                  <p className="mb-3 text-sm text-[#6B5340]">
                    Sem app pra baixar. Você começa direto no WhatsApp.
                  </p>
                  <a
                    href={waLink()}
                    className="btn-cta flex min-h-[56px] items-center justify-center gap-2 rounded-xl text-base font-semibold text-offwhite no-underline"
                  >
                    <WhatsAppIcon />
                    Começar agora
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  )
}
