'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const stats = [
  { value: '4.0', label: 'Rating' },
  { value: '120+', label: 'Dishes' },
  { value: '15', label: 'Open Hours' },
  { value: '7', label: 'Day Week' },
]

export default function BrandStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const isMobile = useIsMobile()

  const mobileClip = 'inset(0 0% 0 0%)'
  const desktopClipLeft = 'inset(0 100% 0 0)'
  const desktopClipRight = 'inset(0 0 0 100%)'

  return (
    <section id="story" className="relative w-full overflow-hidden bg-deep-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

          <div ref={ref}>
            {/* Label */}
            <motion.div
              initial={desktopClipLeft}
              animate={isInView ? mobileClip : desktopClipLeft}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-soft-amber/60 text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-body)]">
                Our Story
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={desktopClipLeft}
              animate={isInView ? mobileClip : desktopClipLeft}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white leading-tight mb-8"
            >
              Where Timeless Charm
              <br />
              Meets Memorable Flavours
            </motion.h2>

            {/* Body text */}
            <motion.p
              initial={desktopClipRight}
              animate={isInView ? mobileClip : desktopClipRight}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-warm-white/60 text-base md:text-lg leading-relaxed mb-6 font-[family-name:var(--font-body)]"
            >
              Nestled along Pollachi Main Road in Udumalpet, MADHULAI isn&apos;t just a restaurant — it&apos;s a celebration of vintage charm and heritage. Every recipe is crafted with care and a touch of tradition, celebrating flavours that carry the essence of timeless kitchens.
            </motion.p>

            {/* Second paragraph */}
            <motion.p
              initial={desktopClipRight}
              animate={isInView ? mobileClip : desktopClipRight}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-warm-white/60 text-base md:text-lg leading-relaxed mb-8 font-[family-name:var(--font-body)]"
            >
              From our fragrant Nattu Koli Biriyani to the aromatic Nattu Mattu Ghee Roast, we serve organic multi-cuisine dishes crafted from natural ingredients — each plate a story of authenticity, elegance and warmth.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-warm-white font-[family-name:var(--font-display)]">
                    {stat.value}
                  </span>
                    <span className="text-xs text-warm-white/50 tracking-[0.15em] uppercase mt-2 font-[family-name:var(--font-body)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
