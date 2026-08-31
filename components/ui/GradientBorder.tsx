'use client'

import React from 'react'

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export default function GradientBorder({
  children,
  className = '',
  gradient = 'from-soft-amber/20 via-luxury-red/10 to-premium-gold/15'
}: GradientBorderProps) {
  return (
    <div className={`relative rounded-2xl p-[1px] bg-gradient-to-br ${gradient} ${className}`}>
      <div className="rounded-2xl bg-graphite/50 backdrop-blur-xl p-6">
        {children}
      </div>
    </div>
  )
}
