'use client'

import { useState, useEffect } from 'react'

export default function BackgroundAnimation() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
  }, [])

  if (isMobile) {
    // Mobile ambient light lives inside Hero (above its image) —
    // all other sections are opaque, so a fixed layer here would be invisible.
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.04) 0%, rgba(196,30,58,0.01) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'breathe-slow 20s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          bottom: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.03) 0%, rgba(212,165,116,0.01) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'breathe-slow 25s ease-in-out infinite 5s',
        }}
      />

      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 60%)',
          filter: 'blur(50px)',
          animation: 'pulse-glow 8s ease-in-out infinite',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}
