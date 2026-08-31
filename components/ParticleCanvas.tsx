'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  maxOpacity: number
  life: number
  maxLife: number
  wobbleAmp: number
  wobbleSpeed: number
  wobbleOffset: number
}

interface Insect {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
  angle: number
  angleSpeed: number
  wingPhase: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let W = 0
    let H = 0
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    const PARTICLE_COUNT = 60
    const INSECT_COUNT = 4
    const particles: Particle[] = []
    const insects: Insect[] = []

    const createParticle = (reset = false): Particle => {
      const maxLife = 400 + Math.random() * 600
      return {
        x: Math.random() * W,
        y: reset ? H + 10 + Math.random() * 50 : Math.random() * H,
        size: 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(0.08 + Math.random() * 0.25),
        opacity: 0,
        maxOpacity: 0.15 + Math.random() * 0.35,
        life: 0,
        maxLife,
        wobbleAmp: 10 + Math.random() * 25,
        wobbleSpeed: 0.005 + Math.random() * 0.01,
        wobbleOffset: Math.random() * Math.PI * 2,
      }
    }

    const createInsect = (reset = false): Insect => {
      const maxLife = 500 + Math.random() * 800
      return {
        x: Math.random() * W,
        y: reset ? H + 20 + Math.random() * 100 : H * 0.3 + Math.random() * H * 0.5,
        size: 1 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -(0.15 + Math.random() * 0.3),
        opacity: 0,
        life: 0,
        maxLife,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.02 + Math.random() * 0.04,
        wingPhase: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle()
      p.life = Math.random() * p.maxLife
      particles.push(p)
    }

    for (let i = 0; i < INSECT_COUNT; i++) {
      const ins = createInsect()
      ins.life = Math.random() * ins.maxLife
      insects.push(ins)
    }

    const drawParticle = (p: Particle) => {
      const fadeIn = Math.min(p.life / 60, 1)
      const fadeOut = Math.min((p.maxLife - p.life) / 80, 1)
      p.opacity = p.maxOpacity * fadeIn * fadeOut

      const mx = mouseRef.current.x * 8
      const my = mouseRef.current.y * 5

      const wobbleX = Math.sin(p.life * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp
      const drawX = p.x + wobbleX + mx
      const drawY = p.y + my

      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212, 195, 168, ${p.opacity})`
      ctx.fill()

      if (p.size > 1) {
        ctx.beginPath()
        ctx.arc(drawX, drawY, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 165, 116, ${p.opacity * 0.15})`
        ctx.fill()
      }
    }

    const drawInsect = (ins: Insect) => {
      const fadeIn = Math.min(ins.life / 40, 1)
      const fadeOut = Math.min((ins.maxLife - ins.life) / 60, 1)
      ins.opacity = 0.3 * fadeIn * fadeOut

      const mx = mouseRef.current.x * 3
      const my = mouseRef.current.y * 2

      ins.angle += ins.angleSpeed
      const wanderX = Math.sin(ins.angle) * 0.5
      const wanderY = Math.cos(ins.angle * 0.7) * 0.3

      const drawX = ins.x + mx
      const drawY = ins.y + my

      const wingFlap = Math.sin(ins.life * 0.15 + ins.wingPhase) * 0.3

      ctx.save()
      ctx.translate(drawX, drawY)
      ctx.rotate(Math.atan2(ins.speedY + wanderY, ins.speedX + wanderX))

      ctx.beginPath()
      ctx.ellipse(-2, wingFlap * 3, 3, 1.5, wingFlap, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 180, 150, ${ins.opacity * 0.5})`
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(2, -wingFlap * 3, 3, 1.5, -wingFlap, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(0, 0, ins.size * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180, 160, 130, ${ins.opacity})`
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++
        p.x += p.speedX
        p.y += p.speedY

        if (p.life >= p.maxLife || p.y < -20) {
          particles[i] = createParticle(true)
        }

        drawParticle(p)
      }

      for (let i = 0; i < insects.length; i++) {
        const ins = insects[i]
        ins.life++
        ins.x += ins.speedX + Math.sin(ins.angle) * 0.3
        ins.y += ins.speedY + Math.cos(ins.angle * 0.7) * 0.2

        if (ins.life >= ins.maxLife || ins.y < -30) {
          insects[i] = createInsect(true)
        }

        drawInsect(ins)
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}
