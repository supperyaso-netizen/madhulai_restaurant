'use client'

import { motion } from 'framer-motion'

const dishes = [
  {
    name: 'Chicken Biriyani',
    note: 'Our signature. Fragrant rice, tender chicken and the soul of tradition in every bite.',
    price: 220,
    initial: 'B',
    image: '/dishes/biriyani.jpg',
  },
  {
    name: 'Nattu Mattu Ghee Roast',
    note: 'Ghee speaks louder than words. Rich, aromatic and deeply comforting.',
    price: 120,
    initial: 'G',
    image: '/dishes/ghee-roast.jpg',
  },
  {
    name: 'Chicken 65',
    note: 'Crispy, spicy and full of character — a classic done right.',
    price: 180,
    initial: 'C',
    image: '/dishes/chicken-65.jpg',
  },
]

export default function ChefRecommendation() {
  return (
    <section id="chef" className="relative w-full py-12 sm:py-16 md:py-24 bg-deep-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Label — clip-path circle reveal */}
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            whileInView={{ clipPath: 'circle(100% at 50% 50%)' }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-soft-amber/20 rounded-full text-soft-amber/70 text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-body)]">
              <span className="w-1.5 h-1.5 rounded-full bg-soft-amber/50" />
              Chef&apos;s Pick
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-warm-white leading-tight mb-4"
          >
            Every dish is a conversation between heritage and flavour
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm text-warm-white/40 mb-10 font-[family-name:var(--font-body)]"
          >
            Our chef&apos;s personally curated recommendations
          </motion.p>

          {/* Cards — rotate in with stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ rotate: -3, scale: 0.9, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex flex-col items-center text-center group"
              >
                {dish.image && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent" />
                  </div>
                )}

                {!dish.image && (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mt-8 mb-6"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(196,30,58,0.3), rgba(212,165,116,0.2))',
                    }}
                  >
                    <span className="text-xl font-bold text-warm-white/60 font-[family-name:var(--font-display)]">
                      {dish.initial}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col items-center">
                  <h3 className="text-xl font-bold text-warm-white mb-3 font-[family-name:var(--font-display)]">
                    {dish.name}
                  </h3>

                  <p className="text-sm text-warm-white/45 leading-relaxed mb-4 font-[family-name:var(--font-body)]">
                    {dish.note}
                  </p>

                  <span className="text-lg font-bold text-soft-amber font-[family-name:var(--font-body)]">
                    ₹{dish.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
