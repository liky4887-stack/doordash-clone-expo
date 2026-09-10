import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { dashpassProducts, Product } from '@/constants/mockData';
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
          colors={['#1A1A1A', '#2D2D2D']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroBadge}>
            <Ionicons name="trophy" size={20} color={Colors.YELLOW} />
            <Text style={styles.heroBadgeText}>DASHPASS</Text>
          </View>

          <Text style={styles.heroTitle}>Save on every order</Text>
          <Text style={styles.heroSubtitle}>
            Get $0 delivery fees and reduced service fees on eligible orders over $12
          </Text>

          <TouchableOpacity style={styles.heroBtn} activeOpacity={0.85}>
            <Text style={styles.heroBtnText}>Try DashPass Free</Text>
          </TouchableOpacity>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>$0</Text>
              <Text style={styles.heroStatLabel}>Delivery fees</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>10%</Text>
              <Text style={styles.heroStatLabel}>Off orders</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>5%</Text>
              <Text style={styles.heroStatLabel}>Cash back</Text>
            </View>
          </View>
        </LinearGradient>

        <LocationHeader />
        <SearchBar placeholder="Search DashPass stores" />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>DashPass Exclusives</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Member-only prices on top dishes
          </Text>
          <View style={styles.productGrid}>
            {dashpassProducts.map((item, index) => {
              if (index % 2 !== 0) return null;
              const nextItem = dashpassProducts[index + 1];
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
    color: Colors.YELLOW,
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
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: Spacing.LG,
  },
  heroBtn: {
    backgroundColor: Colors.BRAND,
    paddingVertical: Spacing.MD,
    borderRadius: Radius.CHIP,
    alignItems: 'center',
    marginBottom: Spacing.LG,
  },
  heroBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.YELLOW,
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
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
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.BRAND,
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
