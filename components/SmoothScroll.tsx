'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    if (isMobile) return

    let lenis: any = null
    let rafId: number = 0

    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
        })

        const raf = (time: number) => {
          lenis!.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch (e) {
        console.warn('Lenis not available:', e)
      }
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
