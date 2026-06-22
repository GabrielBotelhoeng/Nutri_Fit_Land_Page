'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

const navLinks = [
  { href: '#como-funciona', label: 'Como eu trabalho' },
  { href: '#funcionalidades', label: 'O acompanhamento' },
  { href: '#depoimentos', label: 'Pacientes' },
  { href: '#planos', label: 'Investimento' },
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        background: 'rgba(240,247,236,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #C8E6C0' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo — assinatura da nutricionista */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2D5016, #4A7C2F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#F0F7EC',
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 18, fontWeight: 400,
            flexShrink: 0,
          }}>
            C
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 19, color: '#2D5016', letterSpacing: '-0.01em',
            }}>
              Camila Rocha
            </span>
            <span style={{ fontSize: 11, color: '#6B5340', marginTop: 2, letterSpacing: '0.04em' }}>
              Nutricionista · CRN-3 12.345
            </span>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink()}
            className="btn-wa-glow bg-floresta text-offwhite rounded-lg font-semibold"
            style={{
              minHeight: '44px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            <WhatsAppIcon />
            Falar comigo
          </a>
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 text-floresta"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 bg-offwhite z-40 flex flex-col gap-6 p-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-terra text-lg hover:text-floresta transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink()}
              className="bg-floresta text-offwhite rounded-lg font-semibold text-center"
              style={{
                minHeight: '44px',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              <WhatsAppIcon />
              Falar comigo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
