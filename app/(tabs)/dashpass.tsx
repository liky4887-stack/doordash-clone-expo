import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { rewardsProducts, Product } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ui/product-card';

export default function DashPassScreen() {
  const addItem = useCartStore((state) => state.addItem);

  const renderProduct = (item: Product) => (
    <ProductCard
      badge={item.badge}
      image={item.emoji}
      originalPrice={item.originalPrice}
      price={item.price}
      rating={item.rating}
      title={item.title}
      onAddToCart={() =>
        addItem({ id: item.id, name: item.title, price: item.price, image: item.emoji })
      }
    />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#3B2417', '#6F4E37']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroBadge}>
            <Ionicons name="gift" size={20} color={Colors.GOLD} />
            <Text style={styles.heroBadgeText}>BREW REWARDS</Text>
          </View>

          <Text style={styles.heroTitle}>Earn points with every cup</Text>
          <Text style={styles.heroSubtitle}>
            Collect points on every order and redeem them for free drinks and treats
          </Text>

          <View style={styles.pointsRow}>
            <View style={styles.pointsCircle}>
              <Text style={styles.pointsValue}>320</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsNext}>Next reward at 400 points</Text>
              <View style={styles.pointsBar}>
                <View style={styles.pointsBarFill} />
              </View>
              <Text style={styles.pointsRemaining}>80 points to go</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.heroBtn} activeOpacity={0.85}>
            <Text style={styles.heroBtnText}>How Rewards Work</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LocationHeader address="Brew & Bean Cafe" />
        <SearchBar placeholder="Search rewards..." />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Redeem Your Points</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Member-only rewards and free items
          </Text>
          <View style={styles.productGrid}>
            {rewardsProducts.map((item, index) => {
              if (index % 2 !== 0) return null;
              const nextItem = rewardsProducts[index + 1];
              return (
                <View key={item.id} style={styles.productRow}>
                  <View style={styles.productGridItem}>{renderProduct(item)}</View>
                  <View style={styles.productGridItem}>{nextItem ? renderProduct(nextItem) : null}</View>
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
  heroCard: {
    marginHorizontal: Spacing.LG,
    marginTop: Spacing.MD,
    borderRadius: Radius.LG,
    padding: Spacing.XL,
    overflow: 'hidden',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.MD,
  },
  heroBadgeText: {
    color: Colors.GOLD,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: Spacing.SM,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.WHITE,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#D4C4B5',
    lineHeight: 20,
    marginBottom: Spacing.LG,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.LG,
  },
  pointsCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(201,169,110,0.15)',
    borderWidth: 2,
    borderColor: Colors.GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.MD,
  },
  pointsValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.GOLD,
  },
  pointsLabel: {
    fontSize: 10,
    color: '#D4C4B5',
    marginTop: 1,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsNext: {
    fontSize: 12,
    color: '#D4C4B5',
    marginBottom: 6,
  },
  pointsBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  pointsBarFill: {
    width: '80%',
    height: '100%',
    backgroundColor: Colors.GOLD,
    borderRadius: 3,
  },
  pointsRemaining: {
    fontSize: 11,
    color: Colors.GOLD,
    marginTop: 4,
    fontWeight: '600',
  },
  heroBtn: {
    backgroundColor: Colors.BRAND,
    paddingVertical: Spacing.MD,
    borderRadius: Radius.CHIP,
    alignItems: 'center',
  },
  heroBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingTop: Spacing.MD,
    paddingBottom: Spacing.SM,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.LG,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    paddingHorizontal: Spacing.LG,
    marginBottom: Spacing.MD,
  },
  productGrid: {
    paddingHorizontal: Spacing.LG,
  },
  productRow: {
    flexDirection: 'row',
    gap: Spacing.SM,
    marginBottom: Spacing.MD,
  },
  productGridItem: {
    flex: 1,
  },
  bottomPadding: {
    height: Spacing.XL * 2,
  },
});
