'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LogoTransitionProps {
  phase: 'center' | 'flying' | 'nav'
  onComplete?: () => void
}

export default function LogoTransition({ phase, onComplete }: LogoTransitionProps) {
  const logoRef = useRef<HTMLImageElement>(null)
  const [navPos, setNavPos] = useState<{
    x: number
    y: number
    scaleX: number
    scaleY: number
  } | null>(null)
  const [measured, setMeasured] = useState(false)

  // Measure both logos when phase changes to 'flying'
  useEffect(() => {
    if (phase === 'flying' && !measured) {
      const timer = setTimeout(() => {
        const loadingLogo = logoRef.current
        const navLogo = document.querySelector('nav img[alt="MADHULAI"]') as HTMLImageElement

        if (loadingLogo && navLogo) {
          const loadingRect = loadingLogo.getBoundingClientRect()
          const navRect = navLogo.getBoundingClientRect()
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2

          // Target: nav logo center position relative to viewport center
          const targetX = navRect.left + navRect.width / 2 - centerX
          const targetY = navRect.top + navRect.height / 2 - centerY

          // Precise scale: match both width AND height
          const scaleX = navRect.width / loadingRect.width
          const scaleY = navRect.height / loadingRect.height

          setNavPos({ x: targetX, y: targetY, scaleX, scaleY })
          setMeasured(true)
        }
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [phase, measured])

  // Reset when going back to center
  useEffect(() => {
    if (phase === 'center') {
      setMeasured(false)
      setNavPos(null)
    }
  }, [phase])

  const showLogo = phase !== 'nav'

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.img
          ref={logoRef}
          src="/logo.png"
          alt="MADHULAI"
          className="fixed z-[200] pointer-events-none h-36 sm:h-44 md:h-52 w-auto"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ x: '-50%', y: '-50%', scaleX: 1, scaleY: 1, opacity: 1 }}
          animate={
            phase === 'flying' && navPos
              ? {
                  x: `calc(-50% + ${navPos.x}px)`,
                  y: `calc(-50% + ${navPos.y}px)`,
                  scaleX: navPos.scaleX,
                  scaleY: navPos.scaleY,
                }
              : { x: '-50%', y: '-50%', scaleX: 1, scaleY: 1 }
          }
          exit={{ opacity: 0 }}
          transition={{
            x: { duration: 1.0, ease: [0.32, 0.72, 0.2, 1] },
            y: { duration: 1.0, ease: [0.32, 0.72, 0.2, 1] },
            scaleX: { duration: 1.0, ease: [0.32, 0.72, 0.2, 1] },
            scaleY: { duration: 1.0, ease: [0.32, 0.72, 0.2, 1] },
            opacity: { duration: 0.15 },
          }}
          onAnimationComplete={() => {
            if (phase === 'flying' && navPos) {
              onComplete?.()
            }
          }}
        />
      )}
    </AnimatePresence>
  )
}
