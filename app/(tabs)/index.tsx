import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { categories, products, featuredProducts, Product } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import CategoryChip from '@/components/CategoryChip';
import ProductCard from '@/components/ui/product-card';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const filtered = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity
            style={[styles.chip, !selectedCategory && styles.chipSelected]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipLabel, !selectedCategory && styles.chipLabelSelected]}>All</Text>
          </TouchableOpacity>
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

        {!selectedCategory && !searchQuery && (
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Good morning! ☕</Text>
            <Text style={styles.heroSubtitle}>
              Start your day with a perfect brew
            </Text>
          </View>
        )}

        {!selectedCategory && !searchQuery && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Drinks</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContent}
            >
              {featuredProducts.map((item) => (
                <View key={item.id} style={styles.featuredCard}>
                  <Text style={styles.featuredEmoji}>{item.emoji}</Text>
                  <Text style={styles.featuredTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.featuredDesc} numberOfLines={2}>{item.description}</Text>
                  <View style={styles.featuredBottom}>
                    <Text style={styles.featuredPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                      style={styles.featuredAdd}
                      onPress={() => addItem({ id: item.id, name: item.title, price: item.price, image: item.emoji })}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={18} color={Colors.WHITE} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.label ?? 'Menu'
                : searchQuery
                  ? 'Search Results'
                  : 'Full Menu'}
            </Text>
            <Text style={styles.itemCount}>{filtered.length} items</Text>
          </View>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={40} color={Colors.LIGHT_GRAY} />
              <Text style={styles.emptyText}>No items found</Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {filtered.map((item, index) => {
                if (index % 2 !== 0) return null;
                const nextItem = filtered[index + 1];
                return (
                  <View key={item.id} style={styles.productRow}>
                    <View style={styles.productGridItem}>{renderProduct(item)}</View>
                    <View style={styles.productGridItem}>{nextItem ? renderProduct(nextItem) : null}</View>
                  </View>
                );
              })}
            </View>
          )}
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
  chip: {
    backgroundColor: 'rgba(255,248,240,0.72)',
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    borderRadius: Radius.CHIP,
    marginRight: Spacing.SM,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  chipSelected: {
    backgroundColor: Colors.BRAND,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  chipLabelSelected: {
    color: Colors.WHITE,
  },
  heroSection: {
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.MD,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.BRAND,
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
  itemCount: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    fontWeight: '500',
  },
  featuredContent: {
    paddingHorizontal: Spacing.LG,
    gap: Spacing.MD,
  },
  featuredCard: {
    width: 160,
    backgroundColor: 'rgba(255,248,240,0.72)',
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredEmoji: {
    fontSize: 44,
    textAlign: 'center',
  },
  featuredTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  featuredDesc: {
    fontSize: 12,
    color: Colors.DARK_GRAY,
    lineHeight: 16,
  },
  featuredBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  featuredPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.BRAND,
  },
  featuredAdd: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.XL * 2,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.DARK_GRAY,
    marginTop: Spacing.SM,
  },
  bottomPadding: {
    height: 140,
  },
});
