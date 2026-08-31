'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, MessageCircle } from 'lucide-react';
import { restaurant } from '@/lib/data';
import BrandButton from '@/components/ui/BrandButton';

export default function Reservation() {
  const phoneDigits = restaurant.phone.split('');

  return (
    <section id="contact" className="w-full py-24 md:py-32 bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.05),transparent_70%)]" />

      <motion.div
        className="max-w-3xl mx-auto px-6 text-center relative z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Glow pulse ring behind CTA */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: [0.8, 1.05, 1], opacity: [0, 0.3, 0.15] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(196,30,58,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-soft-amber/50 inline-block" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-soft-amber/70 font-[family-name:var(--font-body)]">
            Reservation
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-4">
          Reserve Your Table
        </h2>

        <p className="text-warm-white/40 text-sm md:text-base mb-8 font-[family-name:var(--font-body)]">
          Call us or visit directly — we&apos;re always ready to serve you
        </p>

        {/* Phone number — typing/counting animation */}
        <div className="mb-8">
          <p className="text-xs text-warm-white/30 tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-body)]">
            Call Us
          </p>
          <a
            href={`tel:${restaurant.phoneRaw}`}
            className="flex items-center justify-center flex-wrap gap-1 sm:gap-3 text-2xl sm:text-3xl md:text-5xl font-bold text-warm-white font-[family-name:var(--font-display)] tracking-tight hover:text-soft-amber transition-colors"
          >
            <Phone size={18} className="text-soft-amber" />
            {phoneDigits.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.6 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            ))}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <BrandButton
            href={`tel:${restaurant.phoneRaw}`}
            variant="primary"
          >
            Call Now
          </BrandButton>
          <BrandButton
            href={restaurant.whatsapp}
            variant="secondary"
            icon={<MessageCircle size={16} />}
          >
            WhatsApp
          </BrandButton>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Clock size={16} className="text-soft-amber/40" />
          <span className="text-warm-white/30 text-sm font-[family-name:var(--font-body)]">
            Open Daily: {restaurant.hours}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
