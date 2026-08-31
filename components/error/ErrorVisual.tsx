'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface ErrorVisualProps {
  code: string
  icon: LucideIcon
  accentColor: string
}

export default function ErrorVisual({ code, icon: Icon, accentColor }: ErrorVisualProps) {
  const iconColor =
    accentColor === 'soft-amber' ? 'text-soft-amber' : 'text-luxury-red'

  const glowColor =
    accentColor === 'soft-amber'
      ? 'rgba(212,165,116,0.12)'
      : 'rgba(196,30,58,0.12)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center"
    >
      {/* Large error code — outlined text */}
      <div className="relative select-none">
        <span
          className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none font-[family-name:var(--font-display)] text-transparent"
          style={{
            WebkitTextStroke: '1px rgba(245,240,232,0.08)',
          }}
        >
          {code}
        </span>

        {/* Icon overlaid at center of the code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
            style={{
              background: glowColor,
              boxShadow: `0 0 40px ${glowColor}`,
            }}
          >
            <Icon
              size={28}
              className={`${iconColor} sm:w-8 sm:h-8`}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
