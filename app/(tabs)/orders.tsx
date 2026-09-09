/**
 * Orders Screen - Premium order tracking screen
 * Features: Design tokens integration, smooth animations, touchable feedback
 */

import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { shadows } from "@/src/design-tokens/shadows";
import { ourPicks } from '@/constants/mockData';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([
    {
      id: '1',
      restaurant: 'Burger Place',
      status: 'Preparing',
      time: '30 min',
      deliveryFee: '$3.50',
    },
    {
      id: '2',
      restaurant: 'Sushi Bar',
      status: 'On the way',
      time: '15 min',
      deliveryFee: '$2.50',
    },
  ]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(300).springify()}>
          <Text style={styles.headerTitle}>Order History</Text>
          <Text style={styles.headerSubtitle}>Your recent orders</Text>
        </Animated.View>

        <Animated.View style={styles.ordersListSection} entering={FadeInUp.delay(100).springify()}>
          {orders.map((order, index) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              accessibilityRole="button"
              accessibilityLabel={order.restaurant + ' order'}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.restaurantName}>{order.restaurant}</Text>
                <Text style={styles.statusBadge}>{order.status}</Text>
              </View>

              <View style={styles.orderDetails}>
                <Text style={styles.deliveryTime}>{order.time}</Text>
                <Text style={styles.deliveryFee}>Delivery: {order.deliveryFee}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Empty state */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.emptyState}>
          <Ionicons name="list-outline" size={64} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>
            Start ordering to see your order history here
          </Text>
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
  ordersListSection: {
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
  },
  orderCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: space.lg,
    marginBottom: space.lg,
    ...shadows.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.md,
  },
  restaurantName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  statusBadge: {
    backgroundColor: colors.primary[100],
    color: colors.primary[500],
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    borderRadius: borderRadius.sm,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
  },
  deliveryFee: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[500],
    fontWeight: typography.fontWeight.medium,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.lg,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
    textAlign: 'center',
    maxWidth: 200,
  },
});
