'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense, useEffect, useRef, useState } from 'react'
import type { Group } from 'three'
import { nutri } from '@/lib/nutricionista'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

const MESSAGES = [
  { from: 'bot',  text: 'Bom dia! Hora do café. Manda foto do que você comeu.', time: '08:00', photo: false },
  { from: 'user', text: '',                                                      time: '08:15', photo: true  },
  { from: 'bot',  text: 'Ovos, pão integral e café. +320 kcal anotado.',         time: '08:15', photo: false },
  { from: 'user', text: 'Isso mesmo!',                                           time: '08:16', photo: false },
  { from: 'bot',  text: '320 de 2.400 kcal hoje. Tá no caminho.',                time: '08:16', photo: false },
] as const

function PhoneModel({ pointer }: { pointer: { x: number; y: number } }) {
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    const targetY = -0.14 + pointer.x * 0.18
    const targetX = 0.04 + pointer.y * 0.12
    const k = Math.min(1, delta * 4.5)
    g.rotation.y += (targetY - g.rotation.y) * k
    g.rotation.x += (targetX - g.rotation.x) * k
  })

  return (
    <group ref={ref} rotation={[0.04, -0.14, 0.01]}>
      <RoundedBox args={[1.1, 2.3, 0.18]} radius={0.18} smoothness={8}>
        <meshStandardMaterial color="#1c1c1e" roughness={0.14} metalness={0.88} />
      </RoundedBox>

      <RoundedBox args={[0.96, 2.05, 0.01]} radius={0.1} position={[0, 0, 0.097]}>
        <meshStandardMaterial color="#0d1f0d" roughness={0.04} metalness={0.05} />
      </RoundedBox>

      <mesh position={[0.06, 0.92, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.025, 0.06, 8, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.08} metalness={0.9} />
      </mesh>

      {/* Botões laterais — embutidos na borda (x = ±0.535, alinhado ao phone width 1.1) */}
      <RoundedBox args={[0.035, 0.22, 0.1]} radius={0.014} position={[0.548, 0.12, 0]}>
        <meshStandardMaterial color="#2c2c2e" roughness={0.25} metalness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.035, 0.15, 0.1]} radius={0.014} position={[-0.548, 0.36, 0]}>
        <meshStandardMaterial color="#2c2c2e" roughness={0.25} metalness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.035, 0.15, 0.1]} radius={0.014} position={[-0.548, 0.1, 0]}>
        <meshStandardMaterial color="#2c2c2e" roughness={0.25} metalness={0.7} />
      </RoundedBox>

      {/* Sombra de contato 3D — sempre embaixo do phone, acompanha tilt */}
      <mesh position={[0, -1.32, -0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.4, 0.4, 1]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function useViewport() {
  const [viewport, setViewport] = useState<{ small: boolean; reduced: boolean }>({
    small: false,
    reduced: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const small = window.matchMedia('(max-width: 768px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () =>
      setViewport({ small: small.matches, reduced: reduced.matches })

    update()
    small.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      small.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return viewport
}

export default function PhoneCanvas() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [ready, setReady] = useState(false)
  const { small, reduced } = useViewport()
  const pointer = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  /* Marca como pronto após primeiro paint — garante que o Canvas tenha dimensões reais */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  /* Loop de mensagens */
  useEffect(() => {
    let mounted = true
    const timeouts: ReturnType<typeof setTimeout>[] = []

    function run() {
      if (!mounted) return
      setVisibleCount(0)
      MESSAGES.forEach((_, i) => {
        const t = setTimeout(() => {
          if (mounted) setVisibleCount(i + 1)
        }, i * 1800 + 700)
        timeouts.push(t)
      })
      const loop = setTimeout(run, MESSAGES.length * 1800 + 2600)
      timeouts.push(loop)
    }

    run()
    return () => {
      mounted = false
      timeouts.forEach(clearTimeout)
    }
  }, [])

  /* Parallax desktop */
  useEffect(() => {
    if (small || reduced) {
      pointer.current = { x: 0, y: 0 }
      return
    }
    const el = containerRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointer.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))),
      }
    }
    const onLeave = () => {
      pointer.current = { x: 0, y: 0 }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [small, reduced])

  /* Câmera afastada o suficiente pro phone (alt 2.3) caber inteiro nos 2 breakpoints */
  const cameraZ = small ? 3.45 : 3.2

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
    >
      {ready && (
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.72} />
            <directionalLight position={[3, 6, 5]} intensity={1.5} />
            <directionalLight position={[-5, 1, -2]} intensity={0.3} />
            <pointLight position={[2, -1, 3]} intensity={0.4} color="#c8e6c0" />
            <PhoneModel pointer={pointer.current} />
          </Suspense>
        </Canvas>
      )}

      {/* Overlay HTML — alinhado à tela 3D do phone (responsivo via classe) */}
      <div className="phone-screen-overlay pointer-events-none">
        <div
          style={{
            background: '#0d1f0d',
            color: '#888',
            fontSize: '9px',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 8px',
          }}
        >
          <span>08:16</span>
          <span>●●●</span>
        </div>

        <div
          style={{
            background: '#075E54',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 9px',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#128C7E',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            N
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>
              Nutri {nutri.primeiroNome}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 8.5 }}>online agora</div>
          </div>
        </div>

        <div
          style={{
            background: '#ECE5DD',
            height: 'calc(100% - 56px)',
            padding: '8px 7px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 4,
            overflow: 'hidden',
          }}
        >
          <AnimatePresence>
            {MESSAGES.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={
                    msg.from === 'user'
                      ? {
                          background: '#DCF8C6',
                          color: '#111',
                          borderRadius: '10px 2px 10px 10px',
                          maxWidth: '88%',
                          padding: '6px 9px',
                          fontSize: 12,
                          lineHeight: 1.35,
                        }
                      : {
                          background: '#fff',
                          color: '#111',
                          borderRadius: '2px 10px 10px 10px',
                          maxWidth: '88%',
                          padding: '6px 9px',
                          fontSize: 12,
                          lineHeight: 1.35,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        }
                  }
                >
                  {msg.photo && (
                    <div
                      style={{
                        width: '100%',
                        height: 40,
                        background: '#b8d4a8',
                        borderRadius: 6,
                        marginBottom: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: '#2D5016',
                        fontWeight: 700,
                      }}
                    >
                      📷 foto do prato
                    </div>
                  )}
                  {msg.text && <span>{msg.text}</span>}
                  <div
                    style={{
                      textAlign: 'right',
                      fontSize: 9,
                      color: '#999',
                      marginTop: 3,
                    }}
                  >
                    {msg.time}
                    {msg.from === 'user' ? ' ✓✓' : ''}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
