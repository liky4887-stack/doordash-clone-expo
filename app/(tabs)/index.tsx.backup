import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { categories, stores, deals } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import CategoryChip from '@/components/CategoryChip';
import StoreCard from '@/components/StoreCard';
import DealCard from '@/components/DealCard';

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}

function ActionButton({ icon, label, active }: ActionButtonProps) {
  return (
    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
      <View style={[styles.actionIcon, active && styles.actionIconActive]}>
        <Ionicons name={icon} size={18} color={active ? Colors.WHITE : Colors.BLACK} />
      </View>
      <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

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
          <ActionButton icon="trophy-outline" label="DashPass" active />
          <ActionButton icon="bag-outline" label="Pickup" />
          <ActionButton icon="star-outline" label="Ratings" />
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Easter prep, delivered 🐰</Text>
          <Text style={styles.heroSubtitle}>
            Get everything you need for a perfect Easter celebration
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop Groceries</Text>
          <View style={styles.storesList}>
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onPress={() =>
                  addItem({ id: store.id, name: store.name, price: 12.99, image: store.emoji })
                }
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DashPass Exclusive Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Easter Prep 🐣</Text>
          <View style={styles.storesList}>
            {stores.slice(0, 2).map((store) => (
              <StoreCard key={`easter-${store.id}`} store={store} />
            ))}
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
    gap: Spacing.MD,
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
  actionIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconActive: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  actionLabelActive: {
    color: Colors.PRIMARY,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    paddingHorizontal: Spacing.LG,
    marginBottom: Spacing.MD,
  },
  storesList: {
    paddingHorizontal: Spacing.LG,
  },
});
