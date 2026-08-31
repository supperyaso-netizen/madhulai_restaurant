'use client'

import { useRef, useCallback } from 'react'

interface BrandButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export default function BrandButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
}: BrandButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    btnRef.current.style.setProperty('--ripple-x', `${x}px`)
    btnRef.current.style.setProperty('--ripple-y', `${y}px`)
  }, [])

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-[family-name:var(--font-display)] font-medium
    tracking-[0.08em] uppercase
    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
    overflow-hidden group
    --ripple-x: 50%
    --ripple-y: 50%
  `

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-[10px] rounded-full',
    md: 'px-7 py-3.5 text-[11px] rounded-full',
    lg: 'px-9 py-4 text-[12px] rounded-full',
  }

  const variantStyles = {
    primary: `
      bg-luxury-red text-warm-white
      hover:shadow-[0_0_40px_rgba(196,30,58,0.35)]
      hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      bg-transparent text-soft-amber
      border border-soft-amber/25
      hover:bg-soft-amber/8
      hover:border-soft-amber/45
      hover:shadow-[0_0_30px_rgba(212,165,116,0.12)]
      hover:scale-[1.02]
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-warm-white/60
      hover:text-warm-white
      hover:bg-white/[0.04]
      active:bg-white/[0.06]
    `,
  }

  const rippleStyles = `
    &::before {
      content: '';
      position: absolute;
      top: var(--ripple-y);
      left: var(--ripple-x);
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
      opacity: 0;
    }
    &:hover::before {
      width: 300px;
      height: 300px;
      opacity: 1;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
      transition: left 0.6s ease;
    }
    &:hover::after {
      left: 100%;
    }
  `

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  )

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={combinedClassName}
        onMouseMove={handleMouseMove}
        style={{ '--ripple-x': '50%', '--ripple-y': '50%' } as React.CSSProperties}
      >
        <style>{rippleStyles}</style>
        {content}
      </a>
    )
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={combinedClassName}
      onMouseMove={handleMouseMove}
      style={{ '--ripple-x': '50%', '--ripple-y': '50%' } as React.CSSProperties}
    >
      <style>{rippleStyles}</style>
      {content}
    </button>
  )
}
