'use client'

import { motion } from 'framer-motion'
import { errorConfigs } from './ErrorConfig'
import ErrorActions from './ErrorActions'

interface EmptyStateProps {
  type?: 'empty-search' | 'empty-content' | 'image-error'
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  className?: string
}

export default function EmptyState({
  type = 'empty-content',
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  const config = errorConfigs[type]

  const resolvedTitle = title || config.title
  const resolvedDescription = description || config.description
  const resolvedPrimary = primaryAction || config.primaryAction
  const resolvedSecondary = secondaryAction || config.secondaryAction

  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col items-center text-center py-16 sm:py-20 px-6 ${className}`}
    >
      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6"
      >
        <Icon size={24} className="text-warm-white/25" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold text-warm-white/80 mb-3"
      >
        {resolvedTitle}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-warm-white/35 text-sm leading-relaxed mb-8 max-w-sm font-[family-name:var(--font-body)]"
      >
        {resolvedDescription}
      </motion.p>

      {/* Actions */}
      <ErrorActions
        primaryAction={resolvedPrimary}
        secondaryAction={resolvedSecondary}
      />
    </motion.div>
  )
}
