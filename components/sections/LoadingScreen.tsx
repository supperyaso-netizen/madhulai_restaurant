'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  visible: boolean
  onFrozen?: () => void
}

export default function LoadingScreen({ visible, onFrozen }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [frozen, setFrozen] = useState(false)
  const [showBar, setShowBar] = useState(true)

  // Progress counter — reaches 100% in ~1.2s
  useEffect(() => {
    if (frozen) return
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        return p + 2.2
      })
    }, 25)
    return () => clearInterval(timer)
  }, [frozen])

  // At 100%: freeze and notify parent to start logo flight
  useEffect(() => {
    if (progress < 100) return

    const freeze = async () => {
      await new Promise((r) => setTimeout(r, 100))
      setFrozen(true)
      setShowBar(false)
      onFrozen?.()
    }

    freeze()
  }, [progress, onFrozen])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#000000' }}
        >
          {/* Ambient glow — subtle luxury-red */}
          {!frozen && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[350px] h-[350px] bg-luxury-red/[0.06] rounded-full blur-[100px]"
            />
          )}

          {/* Center content area — logo sits above this via LogoTransition */}
          <div className="absolute inset-0 flex items-center justify-center" />

          {/* Progress bar — bottom of screen */}
          <AnimatePresence>
            {showBar && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 sm:pb-10"
              >
                {/* Percentage */}
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-warm-white/20 text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-body)]">
                    Loading
                  </span>
                  <span className="text-warm-white/30 text-[11px] tracking-[0.15em] font-[family-name:var(--font-body)] tabular-nums">
                    {Math.round(progress)}%
                  </span>
                </div>

                {/* Bar track */}
                <div className="relative w-full h-[2px] rounded-full bg-warm-white/[0.06] overflow-hidden">
                  {/* Bar fill — luxury-red with glow */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: 'linear-gradient(90deg, #c41e3a, #e8384f)',
                      boxShadow: '0 0 12px rgba(196, 30, 58, 0.4), 0 0 4px rgba(196, 30, 58, 0.6)',
                      transition: 'width 0.08s linear',
                    }}
                  />
                  {/* Bright tip at the leading edge */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-warm-white/50"
                    style={{
                      left: `${Math.min(progress, 100)}%`,
                      boxShadow: '0 0 6px rgba(245, 240, 232, 0.3)',
                      transition: 'left 0.08s linear',
                      opacity: progress > 2 ? 1 : 0,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
