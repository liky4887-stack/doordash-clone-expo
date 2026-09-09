import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { addOns, healthItems, HealthItem } from '@/constants/mockData';

export default function OrdersScreen() {
  const renderHealthItem = ({ item }: { item: HealthItem }) => (
    <View style={styles.healthItem}>
      <Text style={styles.healthEmoji}>{item.emoji}</Text>
      <Text style={styles.healthName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Confirming order</Text>
          <Text style={styles.headerSubtitle}>Arriving by 9:45 PM</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryLeft}>
              <View style={styles.statusIcon}>
                <Ionicons name="restaurant-outline" size={24} color={Colors.WHITE} />
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryTitle}>Tony Pizza Napoletana</Text>
                <Text style={styles.deliveryMeta}>1 item · $18.50</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.trackBtn} activeOpacity={0.7}>
              <Text style={styles.trackBtnText}>Track</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.windowCard}>
            <Text style={styles.windowLabel}>Delivery Window</Text>
            <Text style={styles.windowTime}>9:30 - 9:45 PM</Text>
            <Text style={styles.windowMeta}>Standard delivery · Free with DashPass</Text>
          </View>

          <View style={styles.doubleDashCard}>
            <View style={styles.doubleDashHeader}>
              <View style={styles.doubleDashIcon}>
                <Ionicons name="layers-outline" size={18} color={Colors.PRIMARY} />
              </View>
              <Text style={styles.doubleDashTitle}>DoubleDash</Text>
            </View>
            <Text style={styles.doubleDashTimer}>9:56 mins left</Text>
            <Text style={styles.doubleDashSubtitle}>
              Add items from another store and get them delivered together
            </Text>
          </View>

          <View style={styles.addOnsSection}>
            <Text style={styles.sectionTitle}>Add to your order</Text>
            {addOns.map((addon) => (
              <View key={addon.id} style={styles.addOnRow}>
                <View style={styles.addOnLeft}>
                  <Text style={styles.addOnEmoji}>{addon.emoji}</Text>
                  <View>
                    <Text style={styles.addOnName}>{addon.name}</Text>
                    <Text style={styles.addOnMeta}>{addon.extraTime} · {addon.price}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
                  <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.healthSection}>
            <Text style={styles.sectionTitle}>Health & Wellness</Text>
            <FlatList
              data={healthItems}
              renderItem={renderHealthItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.healthGrid}
            />
          </View>
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
    color: Colors.BLACK,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  content: {
    paddingHorizontal: Spacing.LG,
    paddingTop: Spacing.MD,
  },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.GRAY,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    marginBottom: Spacing.MD,
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryInfo: {
    marginLeft: Spacing.MD,
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  deliveryMeta: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  trackBtn: {
    backgroundColor: Colors.BLACK,
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    borderRadius: Radius.CHIP,
  },
  trackBtnText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  windowCard: {
    backgroundColor: Colors.GRAY,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    marginBottom: Spacing.MD,
  },
  windowLabel: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    fontWeight: '500',
  },
  windowTime: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    marginTop: 4,
    marginBottom: 4,
  },
  windowMeta: {
    fontSize: 13,
    color: Colors.GREEN,
    fontWeight: '500',
  },
  doubleDashCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    marginBottom: Spacing.MD,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  doubleDashHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  doubleDashIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.SM,
  },
  doubleDashTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  doubleDashTimer: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.PRIMARY,
    marginBottom: 4,
  },
  doubleDashSubtitle: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    lineHeight: 18,
  },
  addOnsSection: {
    marginBottom: Spacing.MD,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: Spacing.MD,
  },
  addOnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.GRAY,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    marginBottom: Spacing.SM,
  },
  addOnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addOnEmoji: {
    fontSize: 24,
    marginRight: Spacing.MD,
  },
  addOnName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  addOnMeta: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    paddingHorizontal: Spacing.MD,
    paddingVertical: 8,
    borderRadius: Radius.CHIP,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  healthSection: {
    marginBottom: Spacing.XL * 2,
  },
  healthGrid: {
    gap: Spacing.SM,
  },
  healthItem: {
    flex: 1,
    backgroundColor: Colors.GRAY,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    alignItems: 'center',
    margin: 4,
  },
  healthEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  healthName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.BLACK,
    textAlign: 'center',
  },
});
