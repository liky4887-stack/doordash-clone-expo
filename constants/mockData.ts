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

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  badge?: string;
  image?: string;
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

export const products: Product[] = [
  { id: 'pr1', title: 'Margherita Pizza', price: 14.99, originalPrice: 22.99, rating: 4.5, badge: 'Sale', image: '🍕', emoji: '🍕' },
  { id: 'pr2', title: 'Vegan Buddha Bowl', price: 12.49, rating: 5, badge: 'New', image: '🥗', emoji: '🥗' },
  { id: 'pr3', title: 'Chocolate Lava Cake', price: 7.99, originalPrice: 11.99, rating: 4.5, badge: 'Sale', image: '🍫', emoji: '🍫' },
  { id: 'pr4', title: 'Strawberry Smoothie', price: 6.49, rating: 5, badge: 'New', image: '🥤', emoji: '🥤' },
  { id: 'pr5', title: 'Pepperoni Pizza', price: 16.99, originalPrice: 24.99, rating: 4.5, badge: 'Sale', image: '🍕', emoji: '🍕' },
  { id: 'pr6', title: 'Chicken Burrito', price: 10.99, rating: 4, badge: 'New', image: '🌯', emoji: '🌯' },
  { id: 'pr7', title: 'Avocado Toast', price: 8.49, originalPrice: 12.99, rating: 4.5, badge: 'Sale', image: '🥑', emoji: '🥑' },
  { id: 'pr8', title: 'Fresh Lemonade', price: 4.99, rating: 4, image: '🍋', emoji: '🍋' },
  // extra products per requirement (>=6 items, already have 8)
  { id: 'pr9', title: 'Gourmet Burger', price: 13.99, originalPrice: 19.99, rating: 4, badge: 'Sale', image: '🍔', emoji: '🍔' },
  { id: 'pr10', title: 'Pasta Alfredo', price: 11.99, rating: 4, badge: 'New', image: '🍝', emoji: '🍝' },
];
;

export const dashpassProducts: Product[] = [
  { id: 'dp1', title: 'Premium Pizza Combo', price: 18.99, originalPrice: 28.99, rating: 5, badge: 'DashPass', emoji: '🍕' },
  { id: 'dp2', title: 'Healthy Bowl Duo', price: 15.99, originalPrice: 24.99, rating: 4.5, badge: 'DashPass', emoji: '🥗' },
  { id: 'dp3', title: 'Smoothie Pack x3', price: 12.99, originalPrice: 19.99, rating: 4.5, badge: 'DashPass', emoji: '🥤' },
  { id: 'dp4', title: 'Dessert Sampler', price: 9.99, originalPrice: 16.99, rating: 5, badge: 'DashPass', emoji: '🍫' },
];

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  orderDate: string;
  status: 'Delivered' | 'In Transit' | 'Preparing';
  storeName: string;
}

export const recentOrders: OrderItem[] = [
  { id: 'o1', product: products[0], quantity: 2, orderDate: 'Sep 8', status: 'Delivered', storeName: 'Tony Pizza Napoletana' },
  { id: 'o2', product: products[3], quantity: 1, orderDate: 'Sep 7', status: 'Delivered', storeName: 'Smoothie Station' },
  { id: 'o3', product: products[2], quantity: 3, orderDate: 'Sep 5', status: 'Delivered', storeName: 'Choco Lovers' },
  { id: 'o4', product: products[1], quantity: 1, orderDate: 'Sep 3', status: 'Delivered', storeName: 'Green Bowl Co.' },
];

export const activeOrder: {
  storeName: string;
  arrivalTime: string;
  status: 'Preparing';
  items: { product: Product; quantity: number }[];
} = {
  storeName: 'Tony Pizza Napoletana',
  arrivalTime: '9:45 PM',
  status: 'Preparing',
  items: [
    { product: products[0], quantity: 1 },
    { product: products[4], quantity: 1 },
  ],
};
