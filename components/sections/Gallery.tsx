'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

const galleryItems = [
  {
    image: '/images/interior-1.jpg',
    label: 'Vintage Dining Room',
    height: 'h-80',
  },
  {
    image: '/images/interior-2.jpg',
    label: 'Stone-Style Interior',
    height: 'h-64',
  },
  {
    image: '/dishes/biriyani.jpg',
    label: 'Signature Biriyani',
    height: 'h-56',
  },
  {
    image: '/images/ambience.jpg',
    label: 'Evening Ambience',
    height: 'h-72',
  },
  {
    image: '/dishes/dosa.jpg',
    label: 'Dosa Varieties',
    height: 'h-52',
  },
  {
    image: '/images/interior-3.jpg',
    label: 'Our Setting',
    height: 'h-80',
  },
  {
    image: '/dishes/ghee-roast.jpg',
    label: 'Ghee Roast',
    height: 'h-60',
  },
  {
    image: '/images/dining.jpg',
    label: 'Dining Experience',
    height: 'h-64',
  },
  {
    image: '/images/events.jpg',
    label: 'Events & Catering',
    height: 'h-56',
  },
];

const delays = [0.0, 0.2, 0.05, 0.3, 0.1, 0.25, 0.15, 0.35, 0.2];

export default function Gallery() {
  const isMobile = useIsMobile();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="w-full py-12 sm:py-16 md:py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-soft-amber/60 font-[family-name:var(--font-body)]">
            Gallery
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-4">
          Moments at Madhulai
        </h2>
        <p className="text-warm-white/40 text-sm md:text-base max-w-xl mb-10 font-[family-name:var(--font-body)]">
          A visual story of our vintage ambience, heritage interiors and timeless flavours.
        </p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: isMobile ? 0.25 : 0.6,
                delay: isMobile ? index * 0.03 : delays[index],
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => setLightbox(index)}
              className={`break-inside-avoid mb-4 rounded-2xl overflow-hidden relative group cursor-pointer ${item.height}`}
            >
              <img
                src={item.image}
                alt={`${item.label} — Madhulai Timeless Vintage Restaurant`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <span className="text-warm-white/80 text-xs tracking-widest uppercase font-[family-name:var(--font-body)]">
                  {item.label}
                </span>
                <span className="w-8 h-px bg-soft-amber/60 hidden sm:block" />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={galleryItems[lightbox].image}
            alt={`${galleryItems[lightbox].label} — Madhulai Timeless Vintage Restaurant`}
            className="max-w-4xl max-h-full w-auto h-auto object-contain rounded-xl"
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-warm-white"
            aria-label="Close gallery"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </section>
  );
}
