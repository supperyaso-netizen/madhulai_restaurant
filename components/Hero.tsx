'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import GlowLayer from './GlowLayer'

const IS_MOBILE = typeof window !== 'undefined'
  ? window.innerWidth < 768 || 'ontouchstart' in window
  : false

function HeroStatic() {
  const [textVisible, setTextVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setTextVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '500px' }}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/pc.png"
          alt="Madhulai Timeless Vintage Restaurant — vintage stone entrance"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
          fetchPriority="high"
        />
        <img
          src="/mobile.png"
          alt="Madhulai Timeless Vintage Restaurant — vintage stone entrance"
          className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Ambient light overlay — above image, below text */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div
          className="absolute w-[260px] h-[260px] rounded-full"
          style={{
            top: '-8%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(196,30,58,0.09) 0%, rgba(196,30,58,0.03) 50%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'drift-up 16s ease-in-out infinite, breathe-slow 10s ease-in-out infinite',
            willChange: 'transform, opacity',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            bottom: '-12%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(212,165,116,0.08) 0%, rgba(212,165,116,0.02) 50%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'drift-down 20s ease-in-out infinite 3s, breathe-medium 12s ease-in-out infinite',
            willChange: 'transform, opacity',
          }}
        />
        <div
          className="absolute w-[180px] h-[180px] rounded-full"
          style={{
            top: '42%',
            left: '50%',
            marginLeft: '-90px',
            background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 60%)',
            filter: 'blur(40px)',
            animation: 'pulse-glow 9s ease-in-out infinite',
            willChange: 'transform, opacity',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden" style={{ opacity: 0.7 }}>
          <div
            className="absolute inset-y-0 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.15), transparent)',
              animation: 'hairline-shimmer 7s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10 pointer-events-none transition-opacity duration-700"
        style={{ opacity: textVisible ? 1 : 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-soft-amber/80 text-[11px] sm:text-xs tracking-[0.5em] uppercase font-[family-name:var(--font-body)]">
              Madhulai
            </span>
            <span className="w-8 h-px bg-soft-amber/30 mt-4" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-bold leading-[0.95] tracking-[-0.03em] text-warm-white">
            Timeless
            <br />
            <span className="text-soft-amber">Vintage</span>
            <span className="text-warm-white/70"> Dining</span>
          </h1>
          <p className="mt-6 sm:mt-7 text-warm-white/60 text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase font-[family-name:var(--font-body)]">
            Where timeless charm meets memorable flavours
          </p>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none safe-bottom transition-opacity duration-700"
        style={{ opacity: textVisible ? 1 : 0 }}
      >
        <span className="text-warm-white/25 text-[9px] tracking-[0.5em] uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <div
          className="w-px h-10 bg-gradient-to-b from-soft-amber/40 to-transparent"
          style={{ animation: 'breathe-slow 2.5s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}

function HeroAnimated() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.9])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  useEffect(() => {
    let ready = false
    const timer = setTimeout(() => { ready = true }, 800)
    const handleScroll = () => {
      if (ready && window.scrollY > 20) {
        setTextVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const moveX = (e.clientX - centerX) * 0.04
    const moveY = (e.clientY - centerY) * 0.03
    textRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '500px' }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, scale, opacity: overlayOpacity }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full origin-top"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={entered ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
          transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src="/pc.png"
            alt="Madhulai Timeless Vintage Restaurant — vintage stone entrance"
            className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
            fetchPriority="high"
          />
          <img
            src="/mobile.png"
            alt="Madhulai Timeless Vintage Restaurant — vintage stone entrance"
            className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
            fetchPriority="high"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      <GlowLayer />
      <ParticleCanvas />

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10 pointer-events-none"
        style={{ opacity: textVisible ? 1 : 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex flex-col items-center"
          >
            <span className="text-soft-amber/80 text-[11px] sm:text-xs tracking-[0.5em] uppercase font-[family-name:var(--font-body)]">
              Madhulai
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={entered ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-8 h-px bg-soft-amber/30 mt-4"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={entered ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-bold leading-[0.95] tracking-[-0.03em] text-warm-white"
          >
            Timeless
            <br />
            <span className="text-soft-amber">Vintage</span>
            <span className="text-warm-white/70"> Dining</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 text-warm-white/60 text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase font-[family-name:var(--font-body)]"
          >
            Where timeless charm meets memorable flavours
          </motion.p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 safe-bottom"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <span className="text-warm-white/25 text-[9px] tracking-[0.5em] uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-soft-amber/40 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

export default function Hero() {
  return IS_MOBILE ? <HeroStatic /> : <HeroAnimated />
}
