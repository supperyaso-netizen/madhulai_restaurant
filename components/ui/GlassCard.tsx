'use client'

import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        hover
          ? 'hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(212,165,116,0.06)] hover:translate-y-[-2px]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
