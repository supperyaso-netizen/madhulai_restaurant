import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://madhulairestaurant.com'),
  title: 'MADHULAI | Timeless Vintage Restaurant - Udumalpet',
  description: 'MADHULAI Timeless Vintage Restaurant brings classic European charm with a modern touch. Multi-cuisine dishes crafted from organic ingredients in the heart of Udumalpet. Home of authentic South Indian classics, biriyani and vintage dining.',
  keywords: ['madhulai', 'timeless vintage restaurant', 'udumalpet', 'restaurant udumalpet', 'south indian', 'biriyani', 'ghee roast', 'multi cuisine', 'organic dishes', 'vintage dining'],
  openGraph: {
    title: 'MADHULAI | Timeless Vintage Restaurant - Udumalpet',
    description: 'A celebration of flavour and freshness. Timeless vintage dining with organic multi-cuisine dishes in the heart of Udumalpet.',
    type: 'website',
    locale: 'en_IN',
    images: ['/pc.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MADHULAI | Timeless Vintage Restaurant',
    description: 'Timeless vintage dining with authentic organic multi-cuisine dishes in Udumalpet.',
    images: ['/pc.png'],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/pc.png" media="(min-width: 768px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/mobile.png" media="(max-width: 767px)" fetchPriority="high" />
      </head>
      <body className="bg-deep-black text-warm-white antialiased">
        <Script id="prevent-zoom" strategy="beforeInteractive">{`
          (function() {
            document.addEventListener('touchstart', function(e) {
              if (e.touches.length > 1) {
                e.preventDefault();
              }
            }, { passive: false });
          })();
        `}</Script>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Madhulai Timeless Vintage Restaurant',
              image: '/shop.jpg',
              url: 'https://madhulairestaurant.com',
              telephone: '+918072221814',
              priceRange: '₹200 - ₹400',
              servesCuisine: ['South Indian', 'North Indian', 'Chinese', 'Multi-Cuisine'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '3, Pollachi Main Rd, near Pranav\'s Ortho Care',
                addressLocality: 'Udumalaipettai',
                addressRegion: 'Tamil Nadu',
                postalCode: '642126',
                addressCountry: 'IN',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                  'Friday', 'Saturday', 'Sunday',
                ],
                opens: '07:30',
                closes: '22:30',
              },
              sameAs: [
                'https://instagram.com/madhulai_restaurant',
                'https://youtube.com/@madhulairestaurant',
                'https://facebook.com/profile.php?id=100094543598149',
              ],
              acceptsReservations: 'True',
              hasMenu: 'https://madhulairestaurant.com',
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
