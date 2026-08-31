'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ArrowLeft, Home, RefreshCw } from 'lucide-react'

interface ErrorActionsProps {
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
}

export default function ErrorActions({ primaryAction, secondaryAction }: ErrorActionsProps) {
  const router = useRouter()

  const handleAction = useCallback(
    (href: string) => {
      if (href === 'back') {
        router.back()
      } else if (href === 'retry') {
        window.location.reload()
      } else if (href === 'clear') {
        window.location.href = '/'
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const getIcon = (href: string) => {
    if (href === 'back') return ArrowLeft
    if (href === 'retry') return RefreshCw
    return Home
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
    >
      {primaryAction && (
        <button
          onClick={() => handleAction(primaryAction.href)}
          className="group relative px-8 py-3 bg-luxury-red text-warm-white text-[11px] tracking-[0.1em] uppercase rounded-full font-[family-name:var(--font-body)] font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(196,30,58,0.35)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
        >
          <span className="relative z-10 flex items-center gap-2">
            {(() => {
              const Icon = getIcon(primaryAction.href)
              return <Icon size={14} strokeWidth={2} />
            })()}
            {primaryAction.label}
          </span>
        </button>
      )}

      {secondaryAction && (
        <button
          onClick={() => handleAction(secondaryAction.href)}
          className="group px-8 py-3 bg-transparent text-warm-white/50 text-[11px] tracking-[0.1em] uppercase rounded-full font-[family-name:var(--font-body)] font-medium border border-white/[0.08] transition-all duration-300 hover:text-warm-white/70 hover:border-white/[0.15] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
        >
          <span className="flex items-center gap-2">
            {(() => {
              const Icon = getIcon(secondaryAction.href)
              return <Icon size={14} strokeWidth={2} />
            })()}
            {secondaryAction.label}
          </span>
        </button>
      )}
    </motion.div>
  )
}
