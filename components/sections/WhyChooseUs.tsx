'use client';

import { motion } from 'framer-motion';
import { Flame, Award, ChefHat, Landmark } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const features = [
  {
    icon: Flame,
    title: 'Timeless Recipes',
    desc: 'Every dish is crafted with a touch of tradition, celebrating flavours that carry the essence of heritage.',
  },
  {
    icon: Award,
    title: 'Organic Ingredients',
    desc: 'We serve dishes crafted from organic, natural ingredients — ensuring rich taste and uncompromising quality.',
  },
  {
    icon: ChefHat,
    title: 'Authentic Multi-Cuisine',
    desc: 'From South Indian classics to North Indian and Chinese, every recipe is prepared with passion and authenticity.',
  },
  {
    icon: Landmark,
    title: 'Vintage Ambience',
    desc: 'Dine in a rustic yet modern European stone-inspired setting — perfect for family, friends and romantic dinners.',
  },
];

export default function WhyChooseUs() {
  const isMobile = useIsMobile();

  return (
    <section id="why" className="w-full py-12 sm:py-16 md:py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-warm-white/40 font-[family-name:var(--font-body)]">
            Why Us
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-4">
          The Madhulai Difference
        </h2>

        <p className="text-warm-white/40 text-sm md:text-base mb-10 max-w-xl font-[family-name:var(--font-body)]">
          What makes us Udumalpet&apos;s preferred destination for timeless dining
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.7, rotate: -2, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: isMobile ? 0.3 : 0.6,
                  delay: isMobile ? index * 0.05 : index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8 hover:border-white/[0.1] hover:translate-y-[-2px] transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-luxury-red/10 flex items-center justify-center mb-5">
                  <Icon className="text-luxury-red" size={24} />
                </div>
                <h3 className="text-lg font-bold text-warm-white mb-3 font-[family-name:var(--font-display)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-warm-white/40 leading-relaxed font-[family-name:var(--font-body)]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
