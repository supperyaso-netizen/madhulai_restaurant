'use client';

import { restaurant } from '@/lib/data';
import { InstagramIcon, FacebookIcon, YouTubeIcon, WhatsAppIcon } from '@/components/ui/SocialIcons';

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Our Story', id: 'story' },
  { label: 'Menu', id: 'menu' },
  { label: 'Specials', id: 'best' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'location' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-deep-black border-t border-white/[0.05] safe-bottom">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <img
              src="/logo.png"
              alt="MADHULAI Timeless Vintage Restaurant"
              className="h-10 w-auto"
            />
          </div>
          <p className="text-warm-white/30 text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-body)]">
            Timeless Vintage Restaurant — Udumalpet
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.06] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-soft-amber/60 mb-4 font-[family-name:var(--font-body)]">
              Quick Links
            </h4>
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-warm-white/50 hover:text-soft-amber transition-colors cursor-pointer mb-2 block text-left font-[family-name:var(--font-body)]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-soft-amber/60 mb-4 font-[family-name:var(--font-body)]">
              Contact
            </h4>
            <p className="text-sm text-warm-white/50 mb-2 font-[family-name:var(--font-body)]">
              {restaurant.fullAddress}
            </p>
            <a
              href={`tel:${restaurant.phoneRaw}`}
              className="text-sm text-warm-white/50 hover:text-soft-amber transition-colors block mb-2 font-[family-name:var(--font-body)]"
            >
              {restaurant.phone}
            </a>
            <p className="text-sm text-warm-white/50 font-[family-name:var(--font-body)]">
              Open Daily: {restaurant.hours}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-soft-amber/60 mb-4 font-[family-name:var(--font-body)]">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href={restaurant.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Madhulai on Instagram"
                className="text-warm-white/40 hover:text-soft-amber transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={restaurant.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Madhulai on Facebook"
                className="text-warm-white/40 hover:text-soft-amber transition-colors"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={restaurant.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Madhulai on YouTube"
                className="text-warm-white/40 hover:text-soft-amber transition-colors"
              >
                <YouTubeIcon size={18} />
              </a>
              <a
                href={restaurant.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Madhulai on WhatsApp"
                className="text-warm-white/40 hover:text-soft-amber transition-colors"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-4">
          <p className="text-warm-white/20 text-xs font-[family-name:var(--font-body)]">
            &copy; 2026 Madhulai Timeless Vintage Restaurant. All rights reserved.
          </p>
          <p className="text-warm-white/20 text-xs font-[family-name:var(--font-body)]">
            Crafted with timeless charm in Udumalpet
          </p>
        </div>
      </div>
    </footer>
  );
}
