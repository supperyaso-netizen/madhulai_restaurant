'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, menuCategories, type MenuCategory, type MenuItem } from '@/lib/data';
import CircularGallery from './CircularGallery';
import { Flame, Star, ChevronsRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const categoryLabels: Record<string, string> = {
  starters: 'Breakfast & Starters',
  mains: 'Mains & Meals',
  biryani: 'Biriyani',
  chicken: 'Chicken Specials',
  chat: 'Chat & Snacks',
  desserts: 'Desserts',
  drinks: 'Beverages',
};

function DishInfoPanel({ item }: { item: MenuItem }) {
  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-full md:max-w-2xl mx-auto"
    >
      <div className="relative rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#111111] border border-white/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-soft-amber/25 to-transparent" />

        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-warm-white/50 font-[family-name:var(--font-body)]">
              {categoryLabels[item.category] || item.category}
            </span>
            {item.tag && (
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-luxury-red/15 border border-luxury-red/25 text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-luxury-red font-medium font-[family-name:var(--font-body)]">
                {item.tag}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-warm-white mb-3 leading-[1.1]">
            {item.name}
          </h3>

          <p className="text-warm-white/40 text-xs sm:text-sm md:text-base leading-relaxed mb-4 font-[family-name:var(--font-body)] max-w-lg">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.05] text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-warm-white/40 font-[family-name:var(--font-body)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 sm:pt-5 border-t border-white/[0.04]">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-soft-amber font-[family-name:var(--font-display)]">
              ₹{item.price}
            </span>
            <span className="text-[9px] sm:text-[10px] text-warm-white/20 tracking-[0.15em] uppercase ml-2 font-[family-name:var(--font-body)]">
              per plate
            </span>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-soft-amber/15 to-transparent" />
      </div>
    </motion.div>
  )
}

export default function SignatureMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('starters');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hintEntered, setHintEntered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const firstActiveRef = useRef(false);

  useEffect(() => {
    // Fade the hint in shortly after mount (kept until dismissed by swipe)
    const timer = setTimeout(() => setHintEntered(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() =>
    menuItems.filter((item) => item.category === activeCategory && item.image),
    [activeCategory]
  );

  const galleryItems = useMemo(() =>
    filteredItems.map((item) => ({ image: item.image! })),
    [filteredItems]
  );

  const activeItem = filteredItems[activeIndex] || filteredItems[0]

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index)
    // Ignore the gallery's mount-time callback (fires at index 0 immediately);
    // only hide the hint on a real swipe/drag interaction.
    if (!firstActiveRef.current) {
      firstActiveRef.current = true
      return
    }
    setShowSwipeHint(false)
  }, [])

  const handleCategoryChange = useCallback((cat: MenuCategory) => {
    setActiveCategory(cat)
    setActiveIndex(0)
  }, [])

  return (
    <section id="menu" className="w-full py-10 sm:py-14 md:py-20 lg:py-24 bg-deep-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: isMobile ? 0.4 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-soft-amber/60 font-[family-name:var(--font-body)]">
                The Menu
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-4">
              Crafted with Tradition
            </h2>
            <p className="text-warm-white/40 text-sm mb-8 font-[family-name:var(--font-body)]">
              Every dish tells a story of heritage, flavour, and warmth
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-deep-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-deep-black to-transparent z-10 pointer-events-none" />
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide pl-3 md:pl-6">
            {menuCategories.map((cat, i) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: isMobile ? 0.25 : 0.5, delay: isMobile ? 0 : i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="relative px-6 py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap font-[family-name:var(--font-body)] transition-colors duration-300"
                >
                  {isActive && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-luxury-red rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-warm-white font-medium' : 'text-warm-white/40 hover:text-warm-white/60'}`}>
                    {cat.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* OGL Circular Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]"
          >
            <CircularGallery
              key={activeCategory}
              items={galleryItems}
              bend={3}
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.05}
              onActiveChange={handleActiveChange}
            />

            {/* Swipe hint — plain CSS div, guaranteed above the WebGL canvas */}
            <div
              className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: showSwipeHint && hintEntered ? 1 : 0,
                zIndex: 9999,
              }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/[0.1]">
                <span
                  className="w-3.5 flex items-center justify-center"
                  style={{ animation: 'nudge-x 1.5s ease-in-out infinite' }}
                >
                  <ChevronsRight size={14} className="text-soft-amber/80" />
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-warm-white/70 font-[family-name:var(--font-body)] whitespace-nowrap">
                  {isMobile ? 'Swipe to explore menu' : 'Drag to explore menu'}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Active Dish Information Panel */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {activeItem && (
              <DishInfoPanel key={`${activeCategory}-${activeItem.name}`} item={activeItem} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
