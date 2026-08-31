'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false })
const NoiseOverlay = dynamic(() => import('@/components/ui/NoiseOverlay'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/sections/LoadingScreen'), { ssr: false })
const LogoTransition = dynamic(() => import('@/components/LogoTransition'), { ssr: false })
const BackgroundAnimation = dynamic(() => import('@/components/BackgroundAnimation'), { ssr: false })
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const BrandStory = dynamic(() => import('@/components/sections/BrandStory'), { ssr: false })
const SignatureMenu = dynamic(() => import('@/components/sections/SignatureMenu'), { ssr: false })
const BestSellers = dynamic(() => import('@/components/sections/BestSellers'), { ssr: false })
const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs'), { ssr: false })
const CustomerExperience = dynamic(() => import('@/components/sections/CustomerExperience'), { ssr: false })
const Gallery = dynamic(() => import('@/components/sections/Gallery'), { ssr: false })
const Reservation = dynamic(() => import('@/components/sections/Reservation'), { ssr: false })
const Location = dynamic(() => import('@/components/sections/Location'), { ssr: false })
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false })

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false)
  const [logoPhase, setLogoPhase] = useState<'center' | 'flying' | 'nav'>('center')

  const handleFrozen = useCallback(() => {
    // Loading frozen at 100% — start logo flight
    setLogoPhase('flying')
  }, [])

  const handleLogoLanded = useCallback(() => {
    // Logo reached nav position — hide logo, show nav, remove loading
    setTimeout(() => {
      setLogoPhase('nav')
      setLoadingDone(true)
    }, 200)
  }, [])

  return (
    <main className="relative min-h-screen bg-deep-black">
      <SmoothScroll />
      <BackgroundAnimation />
      {!loadingDone && <NoiseOverlay />}
      {!loadingDone && <CustomCursor />}

      <Navigation loadingDone={loadingDone} />
      <Hero />
      <BrandStory />
      <SignatureMenu />
      <BestSellers />
      <WhyChooseUs />
      <CustomerExperience />
      <Gallery />
      <Reservation />
      <Location />
      <Footer />

      {/* Single persistent logo — always visible during transition */}
      <LogoTransition phase={logoPhase} onComplete={handleLogoLanded} />

      {/* Loading overlay — black bg + progress only, no logo */}
      <LoadingScreen visible={!loadingDone} onFrozen={handleFrozen} />
    </main>
  )
}
