/**
 * Orders Screen - Premium order tracking screen
 * Features: Design tokens integration, smooth animations, touchable feedback
 */

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";
import { shadows } from "@/src/design-tokens/shadows";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { recentOrders, activeOrder } from '@/constants/mockData';
import ProductCard from '@/components/ui/product-card';

export default function OrdersScreen() {
  const handleAddToCart = (product: any) => {
    // Could re-add an order item to cart if needed
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInUp.duration(300).springify()}>
          <Text style={styles.headerTitle}>Order History</Text>
          <Text style={styles.headerSubtitle}>Your recent orders</Text>
        </Animated.View>

        {/* Active Order Card */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.activeOrderCard}>
          <View style={styles.activeOrderHeader}>
            <Text style={styles.activeOrderLabel}>Active Order</Text>
            <View style={styles.statusBadgeActive}>
              <Text style={styles.statusTextActive}>{activeOrder.status}</Text>
            </View>
          </View>
          <Text style={styles.activeOrderStore}>{activeOrder.storeName}</Text>
          <Text style={styles.activeOrderTime}>Estimated arrival: {activeOrder.arrivalTime}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeOrderProducts}>
            {activeOrder.items.map((item) => (
              <ProductCard
                key={item.product.id}
                image={item.product.emoji}
                title={item.product.title}
                price={item.product.price}
                originalPrice={item.product.originalPrice}
                rating={item.product.rating}
                badge={item.product.badge}
                onAddToCart={() => handleAddToCart(item.product)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Recent Orders Horizontal Scroll */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.recentOrdersSection}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentOrders.map((order) => (
              <ProductCard
                key={order.id}
                image={order.product.emoji}
                title={order.product.title}
                price={order.product.price}
                originalPrice={order.product.originalPrice}
                rating={order.product.rating}
                badge={order.product.badge}
                onAddToCart={() => handleAddToCart(order.product)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    paddingHorizontal: space.lg,
    paddingTop: space.md,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
    paddingHorizontal: space.lg,
    paddingBottom: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  activeOrderCard: {
    marginHorizontal: space.lg,
    marginVertical: space.md,
    padding: space.lg,
    backgroundColor: colors.background.elevated,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  activeOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.sm,
  },
  activeOrderLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  statusBadgeActive: {
    backgroundColor: colors.AMBER + '20',
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    borderRadius: borderRadius.pill,
  },
  statusTextActive: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.AMBER,
  },
  activeOrderStore: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: 2,
  },
  activeOrderTime: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginBottom: space.md,
  },
  activeOrderProducts: {
    flexGrow: 0,
  },
  recentOrdersSection: {
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.md,
  },
});

