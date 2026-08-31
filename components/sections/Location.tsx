'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { restaurant } from '@/lib/data';
import BrandButton from '@/components/ui/BrandButton';
import { InstagramIcon, FacebookIcon, YouTubeIcon, WhatsAppIcon } from '@/components/ui/SocialIcons';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Location() {
  const isMobile = useIsMobile();

  return (
    <section id="location" className="w-full py-12 sm:py-16 md:py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: isMobile ? 0.4 : 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-soft-amber/60 font-[family-name:var(--font-body)]">
                Find Us
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white mb-8">
              Visit Madhulai
            </h2>

            <div className="flex items-start gap-3 mb-5">
              <MapPin size={18} className="text-soft-amber/60 mt-0.5 shrink-0" />
              <p className="text-warm-white/50 text-sm leading-relaxed font-[family-name:var(--font-body)]">
                {restaurant.fullAddress}
              </p>
            </div>

            <div className="flex items-start gap-3 mb-5">
              <Phone size={18} className="text-soft-amber/60 mt-0.5 shrink-0" />
              <a
                href={`tel:${restaurant.phoneRaw}`}
                className="text-warm-white/50 text-sm hover:text-soft-amber transition-colors font-[family-name:var(--font-body)]"
              >
                {restaurant.phone}
              </a>
            </div>

            <div className="flex items-start gap-3 mb-5">
              <Clock size={18} className="text-soft-amber/60 mt-0.5 shrink-0" />
              <div>
                <p className="text-warm-white/50 text-sm font-[family-name:var(--font-body)]">
                  {restaurant.hours}
                </p>
                <p className="text-warm-white/30 text-xs font-[family-name:var(--font-body)]">
                  {restaurant.hoursDetail}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href={restaurant.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-amber/20 p-3 hover:bg-soft-amber/10 transition-all"
              >
                <InstagramIcon size={18} className="text-soft-amber/60" />
              </a>
              <a
                href={restaurant.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-amber/20 p-3 hover:bg-soft-amber/10 transition-all"
              >
                <FacebookIcon size={18} className="text-soft-amber/60" />
              </a>
              <a
                href={restaurant.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-amber/20 p-3 hover:bg-soft-amber/10 transition-all"
              >
                <YouTubeIcon size={18} className="text-soft-amber/60" />
              </a>
              <a
                href={restaurant.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-amber/20 p-3 hover:bg-soft-amber/10 transition-all"
              >
                <WhatsAppIcon size={18} className="text-soft-amber/60" />
              </a>
            </div>

            <div className="mt-8">
              <BrandButton
                href={restaurant.mapsUrl}
                variant="primary"
                icon={<ArrowRight size={14} />}
              >
                Get Directions
              </BrandButton>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: isMobile ? 0.4 : 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-2xl aspect-[16/10] sm:aspect-video bg-graphite border border-white/[0.05] overflow-hidden relative"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0123456789!2d${restaurant.coordinates.lng}!3d${restaurant.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIxJzM5LjMiTiA3N8KwNTknMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1) brightness(0.8) saturate(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Madhulai Timeless Vintage Restaurant Location"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/[0.05] rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
