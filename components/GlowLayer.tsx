'use client'

import { useEffect, useRef, useState } from 'react'

export default function GlowLayer() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window
    setIsMobile(mobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          '--mx',
          `${mouseRef.current.x * 100}%`
        )
        containerRef.current.style.setProperty(
          '--my',
          `${mouseRef.current.y * 100}%`
        )
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  if (isMobile) return null

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, '--mx': '50%', '--my': '45%' } as React.CSSProperties}>
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: '10%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.08) 0%, rgba(212,165,116,0.03) 40%, transparent 70%)',
          animation: 'breathe-slow 6s ease-in-out infinite',
          filter: 'blur(40px)',
          transform: 'translate(var(--mx), var(--my)) translate(-50%, -50%)',
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: '30%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.06) 0%, rgba(196,30,58,0.02) 50%, transparent 70%)',
          animation: 'breathe-medium 8s ease-in-out infinite 1s',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute w-[300px] h-[200px] rounded-full"
        style={{
          bottom: '20%',
          left: '30%',
          background: 'radial-gradient(ellipse, rgba(212,165,116,0.1) 0%, rgba(200,120,50,0.04) 50%, transparent 70%)',
          animation: 'breathe-slow 5s ease-in-out infinite 2s',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute w-[200px] h-[300px]"
        style={{
          top: '5%',
          left: '45%',
          background: 'radial-gradient(ellipse, rgba(255,200,100,0.04) 0%, transparent 60%)',
          animation: 'breathe-medium 7s ease-in-out infinite 0.5s',
          filter: 'blur(20px)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0.8) 100%)' }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,200,120,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255,180,100,0.2) 0%, transparent 40%), radial-gradient(ellipse at 50% 60%, rgba(255,150,80,0.15) 0%, transparent 50%)',
          animation: 'pulse-glow 10s ease-in-out infinite',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, transparent 15%, transparent 85%, rgba(10,10,10,0.6) 100%)' }} />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.15), transparent)',
          animation: 'breathe-slow 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}
