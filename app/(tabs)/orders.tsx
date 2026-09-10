import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { recentOrders, activeOrder, OrderItem } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/ui/product-card';

export default function OrdersScreen() {
  const addItem = useCartStore((state) => state.addItem);

  const renderOrderItem = (item: OrderItem) => (
    <View style={styles.orderCard}>
      <ProductCard
        badge={item.product.badge}
        image={item.product.emoji}
        originalPrice={item.product.originalPrice}
        price={item.product.price}
        rating={item.product.rating}
        title={item.product.title}
        onAddToCart={() =>
          addItem({ id: item.product.id, name: item.product.title, price: item.product.price, image: item.product.emoji })
        }
      />
      <View style={styles.orderMeta}>
        <View style={styles.orderMetaLeft}>
          <Text style={styles.orderDate}>{item.orderDate} · Qty {item.quantity}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Orders</Text>
          <Text style={styles.headerSubtitle}>Track and reorder your favorites</Text>
        </View>

        <View style={styles.activeOrderSection}>
          <Text style={styles.sectionTitle}>Active Order</Text>
          <View style={styles.activeOrderCard}>
            <View style={styles.activeOrderHeader}>
              <View style={styles.activeOrderIcon}>
                <Ionicons name="cafe-outline" size={22} color={Colors.WHITE} />
              </View>
              <View style={styles.activeOrderInfo}>
                <Text style={styles.activeOrderLabel}>Ready for pickup</Text>
                <Text style={styles.activeOrderArrival}>Ready by {activeOrder.arrivalTime}</Text>
              </View>
              <TouchableOpacity style={styles.trackBtn} activeOpacity={0.7}>
                <Text style={styles.trackBtnText}>Track</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabelActive}>Preparing</Text>
                <Text style={styles.progressLabel}>Ready</Text>
                <Text style={styles.progressLabel}>Picked up</Text>
              </View>
            </View>

            <View style={styles.activeOrderItems}>
              {activeOrder.items.map((item, index) => (
                <View key={`active-${index}`} style={styles.activeItemRow}>
                  <Text style={styles.activeItemEmoji}>{item.product.emoji}</Text>
                  <Text style={styles.activeItemName} numberOfLines={1}>{item.product.title}</Text>
                  <Text style={styles.activeItemQty}>x{item.quantity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <Text style={styles.sectionSubtitle}>Tap to reorder in one click</Text>
          <View style={styles.ordersGrid}>
            {recentOrders.map((item, index) => {
              if (index % 2 !== 0) return null;
              const nextItem = recentOrders[index + 1];
              return (
                <View key={item.id} style={styles.ordersRow}>
                  {renderOrderItem(item)}
                  {nextItem ? renderOrderItem(nextItem) : <View style={styles.orderCardPlaceholder} />}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
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
  activeOrderSection: {
    paddingHorizontal: Spacing.LG,
    paddingTop: Spacing.MD,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: Spacing.SM,
  },
  activeOrderCard: {
    backgroundColor: 'rgba(255,248,240,0.72)',
    borderRadius: Radius.LG,
    padding: Spacing.MD,
    marginBottom: Spacing.LG,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  activeOrderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.MD,
  },
  activeOrderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOrderInfo: {
    flex: 1,
    marginLeft: Spacing.MD,
  },
  activeOrderLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  activeOrderArrival: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  trackBtn: {
    backgroundColor: Colors.BRAND,
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    borderRadius: Radius.CHIP,
  },
  trackBtnText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: Spacing.MD,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: Colors.BRAND,
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.SM,
  },
  progressLabelActive: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.BRAND,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.DARK_GRAY,
  },
  activeOrderItems: {
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
    paddingTop: Spacing.SM,
  },
  activeItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  activeItemEmoji: {
    fontSize: 20,
    marginRight: Spacing.SM,
  },
  activeItemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  activeItemQty: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.DARK_GRAY,
  },
  recentSection: {
    paddingTop: Spacing.MD,
    paddingHorizontal: Spacing.LG,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginBottom: Spacing.MD,
  },
  ordersGrid: {},
  ordersRow: {
    flexDirection: 'row',
    gap: Spacing.SM,
    marginBottom: Spacing.MD,
  },
  orderCard: {
    flex: 1,
  },
  orderCardPlaceholder: {
    flex: 1,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.SM,
    paddingHorizontal: 4,
  },
  orderMetaLeft: {
    flex: 1,
  },
  orderDate: {
    fontSize: 11,
    color: Colors.DARK_GRAY,
  },
  statusBadge: {
    backgroundColor: Colors.EMERALD_500 + '20',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.EMERALD_600,
  },
  bottomPadding: {
    height: 140,
  },
});
