import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { ourPicks } from '@/constants/mockData';
import CartItemRow from '@/components/CartItemRow';

export default function CartScreen() {
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const itemCount = items.length;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const renderPick = (item: CartItem) => (
    <TouchableOpacity
      style={styles.pickCard}
      onPress={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
      activeOpacity={0.7}
    >
      <Text style={styles.pickEmoji}>{item.image}</Text>
      <Text style={styles.pickName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.pickPrice}>${item.price.toFixed(2)}</Text>
      <View style={styles.addPickBtn}>
        <Ionicons name="add" size={16} color={Colors.WHITE} />
      </View>
    </TouchableOpacity>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cafe-outline" size={48} color={Colors.DARK_GRAY} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add drinks and treats from our menu to get started</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.headerSubtitle}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsSection}>
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={removeItem}
            />
          ))}
        </View>

        <View style={styles.picksSection}>
          <Text style={styles.sectionTitle}>You Might Also Like</Text>
          <View style={styles.picksGrid}>
            {ourPicks.map((item, index) => {
              if (index % 2 !== 0) return null;
              const nextItem = ourPicks[index + 1];
              return (
                <View key={item.id} style={styles.picksRow}>
                  {renderPick(item)}
                  {nextItem ? renderPick(nextItem) : <View style={styles.pickPlaceholder} />}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Subtotal</Text>
            <Text style={styles.footerValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Tax (8%)</Text>
            <Text style={styles.footerValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.footerRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
            <Text style={styles.checkoutBtnText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.MD,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.BRAND,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  container: {
    flex: 1,
  },
  itemsSection: {
    paddingHorizontal: Spacing.LG,
    paddingTop: Spacing.MD,
  },
  picksSection: {
    paddingTop: Spacing.LG,
    paddingHorizontal: Spacing.LG,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: Spacing.MD,
  },
  picksGrid: {},
  picksRow: {
    flexDirection: 'row',
    gap: Spacing.SM,
    marginBottom: Spacing.SM,
  },
  pickPlaceholder: {
    flex: 1,
  },
  pickCard: {
    flex: 1,
    backgroundColor: Colors.CREAM,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    alignItems: 'center',
    margin: 4,
    position: 'relative',
  },
  pickEmoji: {
    fontSize: 36,
    marginBottom: Spacing.SM,
  },
  pickName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.BLACK,
    marginBottom: 4,
  },
  pickPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BRAND,
  },
  addPickBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.LG,
    paddingTop: Spacing.LG,
    paddingBottom: Spacing.XL * 3,
    marginTop: Spacing.MD,
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.SM,
  },
  footerLabel: {
    fontSize: 15,
    color: Colors.DARK_GRAY,
  },
  footerValue: {
    fontSize: 15,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
    marginVertical: Spacing.SM,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BRAND,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BRAND,
    borderRadius: Radius.CHIP,
    paddingVertical: Spacing.MD + 2,
    marginTop: Spacing.LG,
    gap: 8,
  },
  checkoutBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.XL,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.CREAM,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.LG,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BRAND,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
  },
});
