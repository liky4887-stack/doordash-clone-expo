export interface Store {
  id: string;
  name: string;
  distance: string;
  time: string;
  feeText: string;
  rating: string;
  reviews: number;
  emoji: string;
  tag?: string;
}

export interface Deal {
  id: string;
  title: string;
  subtitle: string;
  storeName: string;
  distance: string;
  time: string;
  rating: string;
  emoji: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export interface AddOn {
  id: string;
  name: string;
  emoji: string;
  extraTime: string;
  price: string;
}

export interface HealthItem {
  id: string;
  name: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: '1', label: 'Pizza', emoji: '🍕' },
  { id: '2', label: 'Burrito', emoji: '🌯' },
  { id: '3', label: 'Bowls', emoji: '🥗' },
  { id: '4', label: 'Bakery', emoji: '🥐' },
  { id: '5', label: 'Smoothie', emoji: '🥤' },
  { id: '6', label: 'Chocolate', emoji: '🍫' },
];

export const stores: Store[] = [
  { id: 's1', name: 'Tony Pizza Napoletana', distance: '0.5 mi', time: '15-25 min', feeText: 'Free delivery', rating: '4.8', reviews: 1200, emoji: '🍕', tag: 'DashPass' },
  { id: 's2', name: 'Burrito Box', distance: '0.8 mi', time: '20-30 min', feeText: '$2.99 delivery', rating: '4.6', reviews: 850, emoji: '🌯' },
  { id: 's3', name: 'Green Bowl Co.', distance: '1.2 mi', time: '25-35 min', feeText: 'Free delivery', rating: '4.9', reviews: 2100, emoji: '🥗', tag: 'DashPass' },
  { id: 's4', name: 'Sweet Tooth Bakery', distance: '0.3 mi', time: '10-20 min', feeText: '$1.99 delivery', rating: '4.7', reviews: 640, emoji: '🥐' },
  { id: 's5', name: 'Smoothie Station', distance: '1.5 mi', time: '20-30 min', feeText: 'Free delivery', rating: '4.5', reviews: 430, emoji: '🥤', tag: 'DashPass' },
  { id: 's6', name: 'Choco Lovers', distance: '0.7 mi', time: '15-25 min', feeText: '$3.49 delivery', rating: '4.4', reviews: 320, emoji: '🍫' },
];

export const deals: Deal[] = [
  { id: 'd1', title: '20% Off Your First Order', subtitle: 'New customers only', storeName: 'Tony Pizza Napoletana', distance: '0.5 mi', time: '15-25 min', rating: '4.8', emoji: '🍕' },
  { id: 'd2', title: 'Buy 1 Get 1 Free', subtitle: 'On all smoothies', storeName: 'Smoothie Station', distance: '1.5 mi', time: '20-30 min', rating: '4.5', emoji: '🥤' },
  { id: 'd3', title: 'Free Dessert with $25+', subtitle: 'Limited time offer', storeName: 'Green Bowl Co.', distance: '1.2 mi', time: '25-35 min', rating: '4.9', emoji: '🥗' },
];

export const cartItems: Omit<CartItem, 'quantity'>[] = [
  { id: 'c1', name: 'Stanley Tumbler 40oz', price: 35.0, image: '🥤' },
  { id: 'c2', name: 'Nike Air Max Shoes', price: 129.99, image: '👟' },
  { id: 'c3', name: 'Titleist Pro V1 Golf Balls', price: 49.99, image: '⛳' },
];

export const ourPicks: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 14.99, quantity: 0, image: '🍕' },
  { id: 'p2', name: 'Vegan Buddha Bowl', price: 12.49, quantity: 0, image: '🥗' },
  { id: 'p3', name: 'Chocolate Lava Cake', price: 7.99, quantity: 0, image: '🍫' },
  { id: 'p4', name: 'Strawberry Smoothie', price: 6.49, quantity: 0, image: '🥤' },
];

export const addOns: AddOn[] = [
  { id: 'a1', name: 'Extra Avocado', emoji: '🥑', extraTime: '+8 min', price: '$2.50' },
  { id: 'a2', name: 'Garlic Bread', emoji: '🥖', extraTime: '+8 min', price: '$4.99' },
  { id: 'a3', name: 'Side of Fries', emoji: '🍟', extraTime: '+8 min', price: '$3.49' },
];

export const healthItems: HealthItem[] = [
  { id: 'h1', name: 'Vitamins', emoji: '💊' },
  { id: 'h2', name: 'Hand Sanitizer', emoji: '🧴' },
  { id: 'h3', name: 'Bandages', emoji: '🩹' },
  { id: 'h4', name: 'Thermometer', emoji: '🌡️' },
  { id: 'h5', name: 'Face Masks', emoji: '😷' },
  { id: 'h6', name: 'Cough Drops', emoji: '🍬' },
];
