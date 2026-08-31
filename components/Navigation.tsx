'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/lib/data'

export default function Navigation({ loadingDone }: { loadingDone: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)

      const isMobile = window.innerWidth < 768

      if (currentScrollY < 60) {
        setVisible(true)
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true)
      } else if (isMobile && currentScrollY > lastScrollY.current + 3) {
        setVisible(false)
      } else if (!isMobile && currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setVisible(false)
      }

      lastScrollY.current = currentScrollY

      const sections = navLinks.map((l) => l.id)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    lastScrollY.current = window.scrollY
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          setTimeout(() => {
            lastScrollY.current = window.scrollY
          }, 600)
        }
      }, 50)
    })
  }, [])

  // Nav always rendered, but hidden until loadingDone
  const showNav = loadingDone

  return (
    <>
      {/* ===== DESKTOP / MOBILE TOP NAV ===== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: showNav && visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5 safe-top"
      >
        <div
          className={`
            flex items-center justify-between
            transition-all duration-500 ease-out
            rounded-full
            ${scrolled
              ? 'w-full max-w-5xl px-3 py-2 md:px-4 md:py-2.5 glass-nav scrolled'
              : 'w-full max-w-7xl px-4 py-3 md:px-6 md:py-3 glass-nav'
            }
          `}
        >
          {/* Logo — shared element, visible only after loadingDone */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex-shrink-0 relative z-10"
          >
            <img
              src="/logo.png"
              alt="MADHULAI"
              className="h-8 md:h-11 w-auto"
              style={{ opacity: loadingDone ? 1 : 0 }}
            />
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <DesktopLink
                key={item.id}
                active={activeSection === item.id}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </DesktopLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden flex-shrink-0 relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-5 h-[1.5px] bg-warm-white block origin-center rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="w-3.5 h-[1.5px] bg-warm-white block rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-5 h-[1.5px] bg-warm-white block origin-center rounded-full"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* ===== MOBILE FULLSCREEN MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden mobile-glass-bg"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              onClick={() => { setMobileOpen(false); document.body.style.overflow = '' }}
              className="absolute top-5 right-5 z-[70] w-10 h-10 rounded-full glass-close-btn flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex justify-center pt-6"
            >
              <img
                src="/logo.png"
                alt="MADHULAI"
                className="h-9 w-auto"
              />
            </motion.div>

            <div className="flex flex-col items-center justify-start gap-2.5 px-8 pt-6 pb-8 overflow-y-auto h-[calc(100%-80px)]">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: 0.08 + i * 0.05,
                    type: 'spring',
                    stiffness: 200,
                    damping: 22,
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative w-full max-w-[280px] py-3.5 rounded-full text-center
                    transition-colors duration-300
                    ${activeSection === item.id ? 'glass-link-active' : 'glass-link'}
                  `}
                >
                  <span className={`
                    relative z-10 text-[15px] tracking-[0.18em] uppercase
                    font-[family-name:var(--font-display)]
                    ${activeSection === item.id ? 'text-warm-white' : 'text-warm-white/55'}
                  `}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function DesktopLink({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-full text-[11px] tracking-[0.12em] uppercase
        font-[family-name:var(--font-body)] transition-all duration-300 z-10
        ${active ? 'text-warm-white' : 'text-warm-white/40 hover:text-warm-white/70'}
      `}
    >
      {active && (
        <motion.div
          layoutId="desktop-pill"
          className="absolute inset-0 glass-pill-active rounded-full"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
