'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'
import { type MenuItem } from '@/lib/data'

interface CircularCarouselProps {
  items: MenuItem[]
  onActiveChange?: (index: number) => void
}

export default function CircularCarousel({ items, onActiveChange }: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = items.length
  const radius = 300
  const anglePerItem = 360 / total

  const rotation = useMotionValue(0)
  const isDragging = useRef(false)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((index: number) => {
    const target = -index * anglePerItem
    animate(rotation, target, {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 1,
    })
    setActiveIndex(index)
    onActiveChange?.(index)
  }, [anglePerItem, rotation, onActiveChange])

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % total
    goTo(next)
  }, [activeIndex, total, goTo])

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + total) % total
    goTo(prev)
  }, [activeIndex, total, goTo])

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current) goNext()
    }, 3500)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [goNext])

  const pauseAutoPlay = () => { isDragging.current = true; if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  const resumeAutoPlay = () => { isDragging.current = false }

  const dragStartX = useRef(0)
  const dragStartRotation = useRef(0)

  const handleDragStart = (clientX: number) => {
    pauseAutoPlay()
    dragStartX.current = clientX
    dragStartRotation.current = rotation.get()
  }

  const handleDragMove = (clientX: number) => {
    const diff = clientX - dragStartX.current
    const sensitivity = 0.3
    rotation.set(dragStartRotation.current + diff * sensitivity)
  }

  const handleDragEnd = (clientX: number) => {
    const diff = clientX - dragStartX.current
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext(); else goPrev()
    } else {
      goTo(activeIndex)
    }
    setTimeout(resumeAutoPlay, 2000)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Carousel */}
      <div
        className="relative w-full h-[360px] sm:h-[400px] md:h-[420px] flex items-center justify-center overflow-hidden select-none"
        ref={containerRef}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX) }}
        onMouseMove={(e) => { if (isDragging.current) handleDragMove(e.clientX) }}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={() => { if (isDragging.current) handleDragEnd(dragStartX.current) }}
      >
        <motion.div
          className="relative w-0 h-0"
          style={{ rotateZ: rotation }}
        >
          {items.map((item, index) => {
            const angle = index * anglePerItem
            return (
              <CarouselCard
                key={`${item.name}-${index}`}
                item={item}
                angle={angle}
                radius={radius}
                rotation={rotation}
                isActive={index === activeIndex}
                onTap={() => goTo(index)}
              />
            )
          })}
        </motion.div>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-warm-white/30 hover:text-warm-white hover:bg-white/[0.08] transition-all duration-300 z-20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-warm-white/30 hover:text-warm-white hover:bg-white/[0.08] transition-all duration-300 z-20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-luxury-red'
                  : 'w-1.5 bg-warm-white/15 hover:bg-warm-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active Item Counter */}
      <div className="mt-1 mb-4 text-[10px] tracking-[0.3em] uppercase text-warm-white/25 font-[family-name:var(--font-body)]">
        {activeIndex + 1} / {total}
      </div>
    </div>
  )
}

function CarouselCard({
  item,
  angle,
  radius,
  rotation,
  isActive,
  onTap,
}: {
  item: MenuItem
  angle: number
  radius: number
  rotation: MotionValue<number>
  isActive: boolean
  onTap: () => void
}) {
  const cardRotation = useTransform(rotation, (v) => -v)
  const combinedRotation = useTransform(cardRotation, (cr) => cr + angle)

  const scale = useTransform(combinedRotation, (r) => {
    const normalized = ((r % 360) + 360) % 360
    const distFromFront = Math.min(normalized, 360 - normalized)
    const t = 1 - distFromFront / 180
    return 0.55 + 0.45 * Math.max(0, t)
  })

  const opacity = useTransform(combinedRotation, (r) => {
    const normalized = ((r % 360) + 360) % 360
    const distFromFront = Math.min(normalized, 360 - normalized)
    const t = 1 - distFromFront / 180
    return 0.15 + 0.85 * Math.max(0, t)
  })

  const zIndex = useTransform(combinedRotation, (r) => {
    const normalized = ((r % 360) + 360) % 360
    const distFromFront = Math.min(normalized, 360 - normalized)
    return Math.round(100 - distFromFront)
  })

  const borderColor = useTransform(combinedRotation, (r) => {
    const normalized = ((r % 360) + 360) % 360
    const distFromFront = Math.min(normalized, 360 - normalized)
    if (distFromFront < 5) return 'rgba(196, 30, 58, 0.4)'
    return 'rgba(255, 255, 255, 0.08)'
  })

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        rotateY: combinedRotation,
        translateX: useTransform(combinedRotation, (r) => {
          const rad = (r * Math.PI) / 180
          return Math.sin(rad) * radius
        }),
        translateZ: useTransform(combinedRotation, (r) => {
          const rad = (r * Math.PI) / 180
          return Math.cos(rad) * radius - radius
        }),
        scale,
        opacity,
        zIndex,
      }}
      onClick={onTap}
    >
      <motion.div
        className="w-[200px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[300px] md:h-[340px] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        style={{ borderColor, borderWidth: '1.5px', borderStyle: 'solid' }}
      >
        {/* Image only — no text content inside card */}
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
        {!item.image && (
          <div className="w-full h-full bg-gradient-to-br from-luxury-red/10 via-soft-amber/5 to-[#141414]" />
        )}
      </motion.div>
    </motion.div>
  )
}
