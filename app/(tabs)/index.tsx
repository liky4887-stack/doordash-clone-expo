import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { categories, products, Product } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import CategoryChip from '@/components/CategoryChip';
import ProductCard from '@/components/ui/product-card';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
        <LocationHeader />
        <SearchBar />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              selected={selectedCategory === cat.id}
              onPress={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
            />
          ))}
        </ScrollView>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <View style={styles.actionIconActive}>
              <Ionicons name="trophy-outline" size={16} color={Colors.WHITE} />
            </View>
            <Text style={styles.actionLabelActive}>DashPass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="bag-outline" size={16} color={Colors.BLACK} />
            <Text style={styles.actionLabel}>Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="star-outline" size={16} color={Colors.BLACK} />
            <Text style={styles.actionLabel}>Ratings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Fresh picks, delivered fast</Text>
          <Text style={styles.heroSubtitle}>
            Explore top-rated dishes from restaurants near you
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Near You</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {products.map((item, index) => {
              if (index % 2 !== 0) return null;
              const nextItem = products[index + 1];
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
  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.SM,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.SM,
    gap: Spacing.SM,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY,
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    borderRadius: Radius.CHIP,
    gap: 6,
  },
  actionIconActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  actionLabelActive: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.BRAND,
  },
  heroSection: {
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.MD,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    lineHeight: 20,
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
    marginBottom: Spacing.MD,
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
