'use client'

import React, { useRef, useEffect, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  decimals?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  target,
  duration = 2,
  suffix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounter(element, target, duration, decimals)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [target, duration, decimals, hasAnimated])

  function animateCounter(
    element: HTMLElement,
    target: number,
    duration: number,
    decimals: number
  ) {
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const currentValue = easedProgress * target

      element.textContent = currentValue.toFixed(decimals) + suffix

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  return (
    <span ref={ref} className="text-4xl font-bold text-warm-white">
      0{suffix}
    </span>
  )
}
