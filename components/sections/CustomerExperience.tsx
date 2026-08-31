'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const reviews = [
  {
    text: 'A dream come true place to have food. Food also tastes like home food. Breakfast was excellent.',
    name: 'Ravi',
    rating: 5,
    source: 'Google',
  },
  {
    text: 'Beautiful vintage ambience — photogenic, unique and nostalgic. The ghee roast and filter coffee are a must try.',
    name: 'Priya',
    rating: 5,
    source: 'Google',
  },
  {
    text: 'Wonderful atmosphere and friendly staff. The chicken chettinad curry was delicious, with authentic taste.',
    name: 'Karthik',
    rating: 4,
    source: 'Google',
  },
];

export default function CustomerExperience() {
  const isMobile = useIsMobile();

  return (
    <section id="reviews" className="w-full py-12 sm:py-16 md:py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Rating section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: isMobile ? 0.4 : 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-warm-white/40 font-[family-name:var(--font-body)]">
              Experience
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-4">
            What People Say
          </h2>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-warm-white font-[family-name:var(--font-display)]">
              4.0
            </span>
            <span className="text-warm-white/20 text-xl font-light font-[family-name:var(--font-body)]">/5</span>
          </div>

          {/* Stars — all appear at once on mobile */}
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, rotate: -30 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: isMobile ? 0 : 0.6 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Star size={20} className="text-premium-gold" fill="currentColor" />
              </motion.div>
            ))}
            <span className="text-warm-white/40 text-sm font-[family-name:var(--font-body)]">
              4.0 out of 5
            </span>
          </div>

          <p className="text-warm-white/30 text-sm mb-10 font-[family-name:var(--font-body)]">
            160+ Happy Guests
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: isMobile ? 0.3 : 0.6,
                delay: isMobile ? index * 0.05 : 0.2 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-premium-gold" fill="currentColor" />
                ))}
              </div>

              <p className="text-warm-white/60 text-base leading-relaxed mb-6 font-[family-name:var(--font-body)]">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-red/30 to-soft-amber/20 flex items-center justify-center">
                  <span className="text-warm-white/60 text-sm font-bold font-[family-name:var(--font-body)]">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-warm-white text-sm font-medium font-[family-name:var(--font-body)]">
                    {review.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-soft-amber/10 text-soft-amber/60 w-fit font-[family-name:var(--font-body)]">
                    {review.source}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
