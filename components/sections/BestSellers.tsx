'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { bestSellers } from '@/lib/data'
import { Flame, Award, Heart, Star } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const tagIcons = [Flame, Award, Heart, Star]

export default function BestSellers() {
  const [[current, direction], setCurrent] = useState([0, 0])
  const total = bestSellers.length
  const isMobile = useIsMobile()

  const paginate = useCallback((newDirection: number) => {
    setCurrent(([prev]) => {
      const next = (prev + newDirection + total) % total
      return [next, newDirection]
    })
  }, [total])

  const paused = useRef(false)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) paginate(1)
    }, 3500)
    return () => clearInterval(timer)
  }, [paginate])

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (offset < -threshold || velocity < -300) {
      paginate(1)
    } else if (offset > threshold || velocity > 300) {
      paginate(-1)
    }
    paused.current = false
  }, [paginate])

  const handleDragStart = useCallback(() => {
    paused.current = true
  }, [])

  const item = bestSellers[current]
  const TagIcon = tagIcons[current % tagIcons.length]

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 280 : -280,
      opacity: 0,
      scale: 0.93,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -280 : 280,
      opacity: 0,
      scale: 0.93,
    }),
  }

  return (
    <section
      id="best"
      className="relative w-full py-12 sm:py-16 md:py-24 bg-deep-black overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-red/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.4 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-soft-amber/60 text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-body)]">
              Best Sellers
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-3">
            The Guest Favourites
          </h2>
          <p className="text-warm-white/40 text-sm md:text-base max-w-md mx-auto font-[family-name:var(--font-body)]">
            Timeless dishes that have earned their place in our guests&apos; hearts
          </p>
        </motion.div>

        {/* Swipeable card */}
        <div className="relative flex justify-center select-none">
          <div className="relative w-full max-w-[360px] h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: isMobile ? 250 : 200, damping: 25 },
                  opacity: { duration: isMobile ? 0.15 : 0.25 },
                  scale: { duration: isMobile ? 0.15 : 0.25 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="absolute w-full cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className="relative rounded-3xl overflow-hidden bg-graphite border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                  {/* Image */}
                  {item.image && (
                    <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-red/10 via-transparent to-transparent" />
                    </div>
                  )}

                  {!item.image && (
                    <div className={`w-full h-[180px] md:h-[220px] bg-gradient-to-br ${item.gradient} opacity-40`} />
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <TagIcon size={12} className="text-soft-amber/60" />
                      <span className="text-[10px] tracking-[0.25em] uppercase text-soft-amber/60 font-[family-name:var(--font-body)]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-warm-white mb-3 leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-warm-white/45 text-sm leading-relaxed mb-4 font-[family-name:var(--font-body)]">
                      {item.description}
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-3xl md:text-4xl font-bold text-soft-amber font-[family-name:var(--font-display)]">
                          ₹{item.price}
                        </span>
                        <span className="text-[9px] text-warm-white/20 tracking-[0.12em] uppercase ml-1.5">
                          per plate
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-luxury-red/20 flex items-center justify-center">
                        <Flame size={16} className="text-luxury-red" />
                      </div>
                    </div>
                  </div>

                  {/* Active line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-red to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
