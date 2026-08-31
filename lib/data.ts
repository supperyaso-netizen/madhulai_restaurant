export const restaurant = {
  name: 'MADHULAI',
  fullName: 'Madhulai Timeless Vintage Restaurant',
  tagline: 'Timeless Vintage Restaurant',
  location: 'Udumalpet',
  fullAddress: '3, Pollachi Main Rd, near Pranav\'s Ortho Care, Udumalaipettai, Tamil Nadu 642126',
  phone: '+91 80722 21814',
  phoneRaw: '+918072221814',
  whatsapp: 'https://wa.me/918072221814',
  instagram: 'https://instagram.com/madhulai_restaurant',
  facebook: 'https://facebook.com/profile.php?id=100094543598149',
  zomato: 'https://zomato.com/udumalaipettai/madhulai-timeless-vintage-restaurant-udumalaipettai-locality',
  youtube: 'https://youtube.com/@madhulairestaurant',
  hours: '7:30 AM - 10:30 PM',
  hoursDetail: 'Open All Days',
  rating: 4.0,
  totalReviews: 160,
  priceRange: '₹200 - ₹400',
  coordinates: { lat: 10.588698, lng: 77.242359 },
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.588698,77.242359',
} as const

export const stats = [
  { label: 'Rating', value: 4.0, suffix: '/5', icon: 'Star' },
  { label: 'Dishes', value: 120, suffix: '+', icon: 'UtensilsCrossed' },
  { label: 'Vintage Years', value: 2025, suffix: '', icon: 'History' },
  { label: 'Open Hours', value: 15, suffix: 'hrs', icon: 'Clock' },
] as const

export type MenuCategory = 'starters' | 'mains' | 'biryani' | 'chicken' | 'chat' | 'desserts' | 'drinks'

export interface MenuItem {
  name: string
  description: string
  price: number
  category: MenuCategory
  tag?: 'Signature' | 'Best Seller' | 'Popular' | 'New'
  image?: string
  rating?: number
  reviews?: number
  tags?: string[]
  available?: boolean
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: 'starters', label: 'Breakfast & Starters' },
  { id: 'mains', label: 'Mains & Meals' },
  { id: 'biryani', label: 'Biriyani' },
  { id: 'chicken', label: 'Chicken Specials' },
  { id: 'chat', label: 'Chat & Snacks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Beverages' },
]

export const menuItems: MenuItem[] = [
  { name: 'Dosa Varieties', description: 'Crispy, golden dosas crafted with care — the beloved soul of a South Indian morning.', price: 80, category: 'starters', tag: 'Best Seller', image: '/dishes/dosa.jpg', rating: 4.8, reviews: 312, tags: ['Crispy', 'Golden', 'South Indian'], available: true },
  { name: 'Nattu Mattu Ghee Roast', description: 'Rich, aromatic ghee roast made with traditional farmhouse ghee for an authentic taste.', price: 120, category: 'starters', tag: 'Signature', image: '/dishes/ghee-roast.jpg', rating: 4.7, reviews: 245, tags: ['Ghee', 'Aromatic', 'Traditional'], available: true },
  { name: 'Idly', description: 'Soft, fluffy, steaming idlis — a comforting classic served fresh every morning.', price: 60, category: 'starters', image: '/images/idli.jpg', rating: 4.6, reviews: 287, tags: ['Soft', 'Steamed', 'Classic'], available: true },
  { name: 'Poori Bhaji', description: 'Fluffy pooris with a spiced potato bhaji — a hearty, timeless breakfast favourite.', price: 90, category: 'starters', image: '/images/poori.jpg', rating: 4.5, reviews: 198, tags: ['Fluffy', 'Spiced', 'Hearty'], available: true },

  { name: 'Veg Meals', description: 'A wholesome platter of fresh vegetables, aromatic spices and traditional South Indian flavours.', price: 160, category: 'mains', tag: 'Popular', image: '/dishes/dosa.jpg', rating: 4.6, reviews: 234, tags: ['Wholesome', 'Vegetarian', 'Fresh'], available: true },
  { name: 'Fish Meals', description: 'Flavourful fish cooked to perfection with authentic coastal spices.', price: 220, category: 'mains', image: '/dishes/ghee-roast.jpg', rating: 4.7, reviews: 187, tags: ['Coastal', 'Fresh', 'Authentic'], available: true },
  { name: 'Chicken Meals', description: 'Tender, juicy chicken enriched with rich spices that delight every palate.', price: 190, category: 'mains', tag: 'Popular', image: '/dishes/chicken-65.jpg', rating: 4.6, reviews: 276, tags: ['Tender', 'Juicy', 'Rich'], available: true },
  { name: 'Porotta', description: 'Soft, flaky layered porottas served hot to complement any curry or side dish.', price: 40, category: 'mains', image: '/dishes/dosa.jpg', rating: 4.5, reviews: 198, tags: ['Flaky', 'Soft', 'Layered'], available: true },
  { name: 'Curd Rice', description: 'Cool, comforting curd rice — creamy yogurt with rice tempered in subtle spices.', price: 100, category: 'mains', image: '/dishes/dosa.jpg', rating: 4.4, reviews: 156, tags: ['Cool', 'Comforting', 'Creamy'], available: true },

  { name: 'Chicken Biriyani', description: 'Fragrant long-grain rice with tender chicken and aromatic biriyani spices.', price: 220, category: 'biryani', tag: 'Signature', image: '/dishes/biriyani.jpg', rating: 4.8, reviews: 312, tags: ['Fragrant', 'Aromatic', 'Signature'], available: true },
  { name: 'Nattu Koli Biriyani', description: 'Authentic country-chicken biriyani cooked with traditional spices for a hearty meal.', price: 280, category: 'biryani', tag: 'Best Seller', image: '/dishes/biriyani.jpg', rating: 4.7, reviews: 245, tags: ['Country', 'Traditional', 'Hearty'], available: true },
  { name: 'Quail Biriyani', description: 'Spicy, rich quail biriyani with a special blend of masalas, served hot.', price: 260, category: 'biryani', image: '/dishes/biriyani.jpg', rating: 4.6, reviews: 178, tags: ['Spicy', 'Rich', 'Special'], available: true },

  { name: 'Chicken 65', description: 'The classic spicy appetizer — crispy on the outside, tender inside.', price: 180, category: 'chicken', tag: 'Popular', image: '/dishes/chicken-65.jpg', rating: 4.7, reviews: 298, tags: ['Spicy', 'Crispy', 'Classic'], available: true },
  { name: 'Afghani Chicken', description: 'Rich, creamy Afghani chicken marinated with aromatic spices and grilled to perfection.', price: 240, category: 'chicken', image: '/dishes/chicken-65.jpg', rating: 4.6, reviews: 189, tags: ['Creamy', 'Aromatic', 'Grilled'], available: true },
  { name: 'Chicken Momo', description: 'Soft, juicy steamed or fried momos served with a spicy, tangy dipping sauce.', price: 150, category: 'chicken', image: '/dishes/chinese.jpg', rating: 4.5, reviews: 176, tags: ['Juicy', 'Steamed', 'Tangy'], available: true },
  { name: 'Baked Chicken Finger', description: 'Crispy, perfectly seasoned baked chicken fingers with a golden crunch.', price: 200, category: 'chicken', image: '/dishes/chicken-65.jpg', rating: 4.4, reviews: 143, tags: ['Crispy', 'Golden', 'Baked'], available: true },

  { name: 'Pani Puri', description: 'Crispy hollow puris bursting with spicy tangy water and chutneys — pure joy.', price: 60, category: 'chat', tag: 'Popular', image: '/dishes/pani-puri.jpg', rating: 4.6, reviews: 234, tags: ['Tangy', 'Crispy', 'Fresh'], available: true },
  { name: 'Pav Bhaji', description: 'Rich buttery mashed vegetables with soft, toasted pav.', price: 110, category: 'chat', image: '/dishes/pani-puri.jpg', rating: 4.5, reviews: 187, tags: ['Buttery', 'Rich', 'Comfort'], available: true },
  { name: 'Bhel Puri', description: 'Crunchy, tangy mix of puffed rice, chutneys and fresh vegetables.', price: 70, category: 'chat', image: '/dishes/pani-puri.jpg', rating: 4.4, reviews: 156, tags: ['Crunchy', 'Tangy', 'Fresh'], available: true },
  { name: 'Sev Puri', description: 'Crisp puris topped with tangy chutneys, vegetables and crunchy sev.', price: 70, category: 'chat', image: '/dishes/pani-puri.jpg', rating: 4.5, reviews: 178, tags: ['Crispy', 'Tangy', 'Crunchy'], available: true },

  { name: 'Ice Cream Sundae', description: 'Creamy, indulgent ice cream in classic vanilla, strawberry and chocolate.', price: 80, category: 'desserts', tag: 'Popular', image: '/dishes/ice-cream.jpg', rating: 4.6, reviews: 234, tags: ['Creamy', 'Cold', 'Sweet'], available: true },
  { name: 'Butterscotch Ice Cream', description: 'Creamy butterscotch with caramelized notes — a sweet, buttery delight.', price: 90, category: 'desserts', image: '/dishes/ice-cream.jpg', rating: 4.5, reviews: 198, tags: ['Caramel', 'Buttery', 'Sweet'], available: true },

  { name: 'Fresh Fruit Juices', description: 'Fresh carrot, mint and lemon juices — naturally sweet, refreshing and packed with goodness.', price: 70, category: 'drinks', image: '/dishes/juice.jpg', rating: 4.6, reviews: 276, tags: ['Fresh', 'Healthy', 'Refreshing'], available: true },
  { name: 'Filter Coffee & Tea', description: 'The classic warmth and aroma of perfectly brewed South Indian coffee and tea.', price: 50, category: 'drinks', tag: 'Signature', image: '/dishes/juice.jpg', rating: 4.8, reviews: 312, tags: ['Aromatic', 'Classic', 'Brewed'], available: true },
  { name: 'Wholesome Soups', description: 'Comforting soups made with fresh ingredients — perfect for warming the senses.', price: 100, category: 'drinks', image: '/dishes/juice.jpg', rating: 4.4, reviews: 165, tags: ['Warm', 'Wholesome', 'Fresh'], available: true },
]

export interface BestSellerItem {
  name: string
  description: string
  price: number
  tag: string
  gradient: string
  image: string
}

const _bestSellersImages = new Set<string>()

function _validateBestSellers(items: BestSellerItem[]): BestSellerItem[] {
  const seen = new Set<string>()
  return items.filter(item => {
    if (seen.has(item.image)) {
      console.warn(`[BestSellers] Duplicate image detected: ${item.image} (${item.name}) — skipped.`)
      return false
    }
    seen.add(item.image)
    return true
  })
}

export const bestSellers: BestSellerItem[] = _validateBestSellers([
  {
    name: 'Chicken Biriyani',
    description: 'Fragrant, aromatic and deeply satisfying — our signature biriyani crafted with long-grain rice and traditional spices.',
    price: 220,
    tag: 'Signature Dish',
    gradient: 'from-premium-gold/20 via-soft-amber/10 to-transparent',
    image: '/dishes/biriyani.jpg',
  },
  {
    name: 'Nattu Koli Biriyani',
    description: 'Authentic country-chicken biriyani, slow-cooked with heritage spices for a rustic, hearty feast.',
    price: 280,
    tag: 'Most Loved',
    gradient: 'from-soft-amber/20 via-luxury-red/10 to-transparent',
    image: '/dishes/biriyani.jpg',
  },
  {
    name: 'Nattu Mattu Ghee Roast',
    description: 'The classic ghee roast, rich with farmhouse ghee and timeless South Indian flavour.',
    price: 120,
    tag: 'Best Seller',
    gradient: 'from-luxury-red/15 via-premium-gold/10 to-transparent',
    image: '/dishes/ghee-roast.jpg',
  },
  {
    name: 'Chicken 65',
    description: 'Spicy, crispy and unforgettable — the iconic South Indian appetizer that never disappoints.',
    price: 180,
    tag: 'Fan Favorite',
    gradient: 'from-luxury-red/20 via-soft-amber/10 to-transparent',
    image: '/dishes/chicken-65.jpg',
  },
])

export const chefPicks = [
  {
    name: 'Chicken Biriyani',
    note: 'Our signature. Fragrant rice, tender chicken and the soul of tradition in every bite.',
    price: 220,
    image: '/dishes/biriyani.jpg',
  },
  {
    name: 'Nattu Mattu Ghee Roast',
    note: 'Ghee speaks louder than words. Rich, aromatic and deeply comforting.',
    price: 120,
    image: '/dishes/ghee-roast.jpg',
  },
  {
    name: 'Chicken 65',
    note: 'Crispy, spicy, and full of character — a classic done right.',
    price: 180,
    image: '/dishes/chicken-65.jpg',
  },
]

export const features = [
  {
    icon: 'Flame',
    title: 'Timeless Recipes',
    description: 'Every dish is crafted with a touch of tradition, celebrating flavours that carry the essence of heritage.',
  },
  {
    icon: 'Award',
    title: 'Organic Ingredients',
    description: 'We serve dishes crafted from organic, natural ingredients — ensuring rich taste and uncompromising quality.',
  },
  {
    icon: 'ChefHat',
    title: 'Authentic Multi-Cuisine',
    description: 'From South Indian classics to North Indian and Chinese, every recipe is prepared with passion and authenticity.',
  },
  {
    icon: 'Landmark',
    title: 'Vintage Ambience',
    description: 'Dine in a rustic yet modern European stone-inspired setting — perfect for family, friends and romantic dinners.',
  },
]

export const reviews = [
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
]

export const galleryPlaceholders = [
  { label: 'Signature Biriyani', icon: 'UtensilsCrossed', gradient: 'from-premium-gold/30 to-soft-amber/10' },
  { label: 'Vintage Dining', icon: 'Landmark', gradient: 'from-soft-amber/30 to-deep-black/50' },
  { label: 'Our Kitchen', icon: 'ChefHat', gradient: 'from-luxury-red/20 to-premium-gold/15' },
  { label: 'Evening Ambience', icon: 'Sun', gradient: 'from-soft-amber/20 to-graphite/50' },
  { label: 'Fresh Platters', icon: 'Salad', gradient: 'from-premium-gold/20 to-soft-amber/10' },
  { label: 'The Experience', icon: 'Wine', gradient: 'from-luxury-red/20 to-soft-amber/10' },
]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Contact' },
] as const
