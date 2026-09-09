/**
 * Cart Screen - Premium shopping cart with smooth animations
 * Features: Animated items, haptic feedback, empty state, order summary
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
import { space } from "@/src/design-tokens/spacing";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { shadows } from "@/src/design-tokens/shadows";
import { useCartStore } from '@/store/useCartStore';
import { ourPicks } from '@/constants/mockData';
import CartItemRow from '@/components/CartItemRow';
import * as Haptics from 'expo-haptics';

export default function CartScreen() {
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const itemCount = useCartStore((state) => state.getItemCount());

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handlePlaceOrder = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert('Order placed! Total: $' + total.toFixed(2));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(300).springify()}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Cart</Text>
            <Text style={styles.headerSubtitle}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </Animated.View>

        {items.length > 0 ? (
          <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.itemsSection}>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <CartItemRow
                  item={item}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={removeItem}
                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
              contentContainerStyle={{ paddingBottom: space.lg }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.emptyState}>
            <Ionicons name="cart-outline" size={64} color={colors.neutral[300]} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add items to your cart to see them here
            </Text>
          </Animated.View>
        )}

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee:</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryDivider]}>
            <Text style={styles.summaryLabelTotal}>Total:</Text>
            <Text style={styles.summaryValueTotal}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.placeOrderBtn, total > 0 && styles.placeOrderBtnEnabled]}
          onPress={handlePlaceOrder}
          disabled={total === 0}
          accessibilityRole="button"
          accessibilityLabel={total > 0 ? 'Place order' : 'Place order (disabled)'}
        >
          <Text style={styles.placeOrderBtnText}>
            {total > 0 ? 'Place Order' : 'Add items to order'}
          </Text>
        </TouchableOpacity>

        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.picksSection}>
          <Text style={styles.picksTitle}>You Might Also Like</Text>
          <View style={styles.picksGrid}>
            {ourPicks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.pickCard}
                onPress={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={'Add ' + item.name + ' to cart'}
              >
                <View style={styles.pickEmojiContainer}>
                  <Text style={styles.pickEmoji}>{item.image}</Text>
                </View>
                <Text style={styles.pickName}>{item.name}</Text>
                <Text style={styles.pickPrice}>${item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  header: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
    marginTop: space.xs,
  },
  itemsSection: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
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
  summarySection: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  summaryTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: space.xs,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[700],
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
  },
  summaryLabelTotal: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  summaryValueTotal: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
  },
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    marginTop: space.md,
  },
  placeOrderBtn: {
    backgroundColor: colors.neutral[200],
    padding: space.lg,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    margin: space.lg,
  },
  placeOrderBtnEnabled: {
    backgroundColor: colors.primary[500],
  },
  placeOrderBtnText: {
    color: colors.background.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  picksSection: {
    paddingTop: space.lg,
    paddingHorizontal: space.lg,
  },
  picksTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.md,
  },
  picksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
  },
  pickCard: {
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    padding: space.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  pickEmojiContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  pickEmoji: {
    fontSize: 24,
  },
  pickName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: space.xs,
    textAlign: 'center',
  },
  pickPrice: {
    fontSize: typography.fontSize.base,
    color: colors.primary[500],
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
});
