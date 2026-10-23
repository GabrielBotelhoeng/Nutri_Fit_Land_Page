'use client'

// Registro único dos plugins do GSAP. Importe `gsap`/`ScrollTrigger` daqui,
// nunca direto do pacote, pra garantir que o registro aconteceu.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
