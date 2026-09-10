import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useCartStore } from '@/store/useCartStore';

export default function TabLayout() {
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.BRAND,
        tabBarInactiveTintColor: Colors.DARK_GRAY,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.LIGHT_GRAY,
          height: 56,
          paddingBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashpass"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
        }}
      />
    </Tabs>
  );
}
