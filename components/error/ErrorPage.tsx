'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { errorConfigs, type ErrorConfig } from './ErrorConfig'
import ErrorBackground from './ErrorBackground'
import ErrorVisual from './ErrorVisual'
import ErrorActions from './ErrorActions'

interface ErrorPageProps {
  code: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
}

export default function ErrorPage({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
}: ErrorPageProps) {
  const config: ErrorConfig = errorConfigs[code] || errorConfigs.generic

  const resolvedTitle = title || config.title
  const resolvedDescription = description || config.description
  const resolvedPrimary = primaryAction || config.primaryAction
  const resolvedSecondary = secondaryAction || config.secondaryAction

  return (
    <div className="relative min-h-screen bg-deep-black flex flex-col items-center justify-center overflow-hidden">
      <ErrorBackground accentColor={config.accentColor} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Error visual — large code + icon */}
        <ErrorVisual
          code={config.code}
          icon={config.icon}
          accentColor={config.accentColor}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 mb-8"
        >
          <Link href="/" className="inline-block" aria-label="Go to homepage">
            <img
              src="/logo.png"
              alt="MADHULAI"
              className="h-10 w-auto opacity-60 hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold text-warm-white mb-4 leading-tight"
        >
          {resolvedTitle}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-warm-white/40 text-sm md:text-base leading-relaxed mb-10 max-w-md font-[family-name:var(--font-body)]"
        >
          {resolvedDescription}
        </motion.p>

        {/* Actions */}
        <ErrorActions
          primaryAction={resolvedPrimary}
          secondaryAction={resolvedSecondary}
        />
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />
    </div>
  )
}
