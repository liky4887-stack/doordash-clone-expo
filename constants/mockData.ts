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

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  badge?: string;
  emoji: string;
  categoryId: string;
  description?: string;
}

export const categories: Category[] = [
  { id: 'hot', label: 'Hot Drinks', emoji: '☕' },
  { id: 'cold', label: 'Cold Drinks', emoji: '🧊' },
  { id: 'mojito', label: 'Mojito', emoji: '🍹' },
  { id: 'smoothie', label: 'Smoothie', emoji: '🥤' },
  { id: 'sweets', label: 'Sweets', emoji: '🍰' },
];

export const products: Product[] = [
  // Hot Drinks
  { id: 'h1', title: 'Espresso', price: 2.50, rating: 5, badge: 'Popular', emoji: '☕', categoryId: 'hot', description: 'Rich single-origin shot' },
  { id: 'h2', title: 'Cappuccino', price: 3.75, rating: 5, emoji: '☕', categoryId: 'hot', description: 'Espresso with steamed milk foam' },
  { id: 'h3', title: 'Caffè Latte', price: 4.25, rating: 4.5, emoji: '☕', categoryId: 'hot', description: 'Smooth espresso with silky milk' },
  { id: 'h4', title: 'Flat White', price: 4.00, rating: 5, badge: 'New', emoji: '☕', categoryId: 'hot', description: 'Double ristretto with microfoam' },
  { id: 'h5', title: 'Turkish Coffee', price: 3.50, rating: 4.5, emoji: '☕', categoryId: 'hot', description: 'Traditional finely ground brew' },
  { id: 'h6', title: 'Hot Chocolate', price: 3.95, rating: 4.5, emoji: '🍫', categoryId: 'hot', description: 'Belgian chocolate with whipped cream' },
  { id: 'h7', title: 'Matcha Latte', price: 4.50, rating: 5, badge: 'New', emoji: '🍵', categoryId: 'hot', description: 'Ceremonial grade matcha with milk' },
  { id: 'h8', title: 'Chai Latte', price: 4.25, rating: 4.5, emoji: '🫖', categoryId: 'hot', description: 'Spiced black tea with steamed milk' },

  // Cold Drinks
  { id: 'c1', title: 'Iced Americano', price: 3.25, rating: 4.5, emoji: '🧊', categoryId: 'cold', description: 'Chilled espresso over ice' },
  { id: 'c2', title: 'Iced Latte', price: 4.50, rating: 5, badge: 'Popular', emoji: '🧊', categoryId: 'cold', description: 'Espresso with cold milk and ice' },
  { id: 'c3', title: 'Cold Brew', price: 4.75, rating: 5, badge: 'Popular', emoji: '🧊', categoryId: 'cold', description: '18-hour steeped smooth brew' },
  { id: 'c4', title: 'Iced Caramel Macchiato', price: 5.25, originalPrice: 6.50, rating: 5, badge: 'Sale', emoji: '🧊', categoryId: 'cold', description: 'Vanilla, milk, espresso, caramel' },
  { id: 'c5', title: 'Nitro Cold Brew', price: 5.50, rating: 4.5, badge: 'New', emoji: '🧊', categoryId: 'cold', description: 'Nitrogen-infused creamy cold brew' },
  { id: 'c6', title: 'Iced Mocha', price: 4.95, rating: 4.5, emoji: '🧊', categoryId: 'cold', description: 'Chocolate espresso over ice' },

  // Mojito
  { id: 'm1', title: 'Classic Mint Mojito', price: 5.50, rating: 5, badge: 'Popular', emoji: '🍹', categoryId: 'mojito', description: 'Fresh mint, lime, soda' },
  { id: 'm2', title: 'Strawberry Mojito', price: 6.25, rating: 5, badge: 'New', emoji: '🍹', categoryId: 'mojito', description: 'Muddled strawberries with mint' },
  { id: 'm3', title: 'Passion Fruit Mojito', price: 6.50, originalPrice: 7.99, rating: 4.5, badge: 'Sale', emoji: '🍹', categoryId: 'mojito', description: 'Tropical passion fruit and mint' },
  { id: 'm4', title: 'Blueberry Mojito', price: 6.25, rating: 4.5, emoji: '🍹', categoryId: 'mojito', description: 'Fresh blueberries with lime' },
  { id: 'm5', title: 'Watermelon Mojito', price: 6.00, rating: 5, emoji: '🍹', categoryId: 'mojito', description: 'Refreshing watermelon and mint' },
  { id: 'm6', title: 'Mango Mojito', price: 6.50, rating: 5, badge: 'New', emoji: '🍹', categoryId: 'mojito', description: 'Sweet mango with fresh mint' },

  // Smoothie
  { id: 's1', title: 'Strawberry Banana Smoothie', price: 5.95, rating: 5, badge: 'Popular', emoji: '🥤', categoryId: 'smoothie', description: 'Fresh fruit blended with yogurt' },
  { id: 's2', title: 'Tropical Mango Smoothie', price: 6.25, rating: 5, emoji: '🥤', categoryId: 'smoothie', description: 'Mango, pineapple, coconut milk' },
  { id: 's3', title: 'Berry Blast Smoothie', price: 6.50, originalPrice: 7.99, rating: 4.5, badge: 'Sale', emoji: '🥤', categoryId: 'smoothie', description: 'Mixed berries with almond milk' },
  { id: 's4', title: 'Green Detox Smoothie', price: 6.95, rating: 4.5, badge: 'New', emoji: '🥤', categoryId: 'smoothie', description: 'Spinach, kale, apple, ginger' },
  { id: 's5', title: 'Avocado Smoothie', price: 6.50, rating: 5, emoji: '🥤', categoryId: 'smoothie', description: 'Creamy avocado with honey' },
  { id: 's6', title: 'Peach Smoothie', price: 5.95, rating: 4.5, emoji: '🥤', categoryId: 'smoothie', description: 'Fresh peaches with vanilla yogurt' },

  // Sweets
  { id: 'sw1', title: 'Chocolate Lava Cake', price: 6.50, rating: 5, badge: 'Popular', emoji: '🍰', categoryId: 'sweets', description: 'Warm molten chocolate center' },
  { id: 'sw2', title: 'New York Cheesecake', price: 5.95, rating: 5, emoji: '🍰', categoryId: 'sweets', description: 'Classic creamy cheesecake' },
  { id: 'sw3', title: 'Tiramisu', price: 6.25, originalPrice: 7.99, rating: 5, badge: 'Sale', emoji: '🍰', categoryId: 'sweets', description: 'Coffee-soaked ladyfingers with mascarpone' },
  { id: 'sw4', title: 'Croissant', price: 3.50, rating: 4.5, emoji: '🥐', categoryId: 'sweets', description: 'Buttery flaky French pastry' },
  { id: 'sw5', title: 'Brownie', price: 4.25, rating: 4.5, badge: 'New', emoji: '🍫', categoryId: 'sweets', description: 'Fudgy double chocolate brownie' },
  { id: 'sw6', title: 'Cinnamon Roll', price: 4.50, rating: 5, emoji: '🥯', categoryId: 'sweets', description: 'Warm with cream cheese glaze' },
];

export const featuredProducts: Product[] = [
  products[1],
  products[10],
  products[12],
  products[18],
];

export const ourPicks: CartItem[] = [
  { id: 'pick1', name: 'Cappuccino', price: 3.75, quantity: 0, image: '☕' },
  { id: 'pick2', name: 'Cold Brew', price: 4.75, quantity: 0, image: '🧊' },
  { id: 'pick3', name: 'Classic Mint Mojito', price: 5.50, quantity: 0, image: '🍹' },
  { id: 'pick4', name: 'Chocolate Lava Cake', price: 6.50, quantity: 0, image: '🍰' },
];

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  orderDate: string;
  status: 'Completed' | 'Preparing' | 'Ready';
}

export const recentOrders: OrderItem[] = [
  { id: 'o1', product: products[1], quantity: 2, orderDate: 'Sep 9', status: 'Completed', },
  { id: 'o2', product: products[10], quantity: 1, orderDate: 'Sep 8', status: 'Completed', },
  { id: 'o3', product: products[18], quantity: 1, orderDate: 'Sep 7', status: 'Completed', },
  { id: 'o4', product: products[24], quantity: 2, orderDate: 'Sep 5', status: 'Completed', },
];

export const activeOrder: {
  arrivalTime: string;
  status: 'Preparing';
  items: { product: Product; quantity: number }[];
} = {
  arrivalTime: '9:35 AM',
  status: 'Preparing',
  items: [
    { product: products[1], quantity: 1 },
    { product: products[24], quantity: 1 },
  ],
};

export const rewardsProducts: Product[] = [
  { id: 'rw1', title: 'Free Drink Voucher', price: 0, originalPrice: 6.50, rating: 5, badge: 'Reward', emoji: '🎁', categoryId: 'hot', description: 'Redeem with 100 points' },
  { id: 'rw2', title: 'Free Pastry Voucher', price: 0, originalPrice: 5.95, rating: 5, badge: 'Reward', emoji: '🎁', categoryId: 'sweets', description: 'Redeem with 80 points' },
  { id: 'rw3', title: 'Buy 1 Get 1 Coffee', price: 3.75, originalPrice: 7.50, rating: 5, badge: 'Reward', emoji: '☕', categoryId: 'hot', description: 'Redeem with 150 points' },
  { id: 'rw4', title: 'Free Smoothie', price: 0, originalPrice: 6.25, rating: 5, badge: 'Reward', emoji: '🥤', categoryId: 'smoothie', description: 'Redeem with 120 points' },
];
