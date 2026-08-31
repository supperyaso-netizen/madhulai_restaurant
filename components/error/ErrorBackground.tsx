'use client'

import { motion } from 'framer-motion'

interface ErrorBackgroundProps {
  accentColor: string
}

export default function ErrorBackground({ accentColor }: ErrorBackgroundProps) {
  const color =
    accentColor === 'soft-amber'
      ? 'rgba(212,165,116,0.04)'
      : 'rgba(196,30,58,0.04)'

  const glowColor =
    accentColor === 'soft-amber'
      ? 'rgba(212,165,116,0.06)'
      : 'rgba(196,30,58,0.06)'

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          top: '20%',
          left: '30%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          bottom: '10%',
          right: '20%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}
