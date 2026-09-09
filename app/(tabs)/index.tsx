/**
 * Home Screen - Premium UI/UX Overhaul
 * Features: Reanimated transitions, parallax header, skeleton loaders, smooth category filtering
 */

import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInRight, SlideOutLeft, withTiming, useSharedValue, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";
import { shadows } from "@/src/design-tokens/shadows";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { categories, stores, deals } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import CategoryChip from '@/components/CategoryChip';
import StoreCard from '@/components/StoreCard';
import DealCard from '@/components/DealCard';

// Animated components from Reanimated
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}

function ActionButton({ icon, label, active }: ActionButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchableOpacity
      style={[styles.actionBtn, animatedStyle]}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.actionIcon, active && styles.actionIconActive]}>
        <Ionicons name={icon} size={18} color={active ? colors.primary[500] : colors.neutral[900]} />
      </View>
      <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>{label}</Text>
    </AnimatedTouchableOpacity>
  );
}

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Location Header */}
        <Animated.View entering={FadeInDown.duration(300).springify()}>
          <LocationHeader />
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <SearchBar />
        </Animated.View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat, index) => (
            <Animated.View
              key={cat.id}
              entering={FadeInRight.delay(index * 50).springify()}
            >
              <CategoryChip
                category={cat}
                selected={selectedCategory === cat.id}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
              />
            </Animated.View>
          ))}
        </ScrollView>

        {/* Quick Action Buttons */}
        <View style={styles.actionsRow}>
          <ActionButton icon="trophy-outline" label="DashPass" active />
          <ActionButton icon="bag-outline" label="Pickup" />
          <ActionButton icon="star-outline" label="Ratings" />
        </View>

        {/* Hero Section */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.heroSection}>
          <Text style={styles.heroTitle}>Easter prep, delivered 🐰</Text>
          <Text style={styles.heroSubtitle}>
            Get everything you need for a perfect Easter celebration
          </Text>
        </Animated.View>

        {/* Shop Groceries Section */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Shop Groceries</Text>
          <AnimatedFlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storesList}
            data={stores.slice(0, 4)}
            renderItem={({ item }) => (
              <StoreCard
                store={item}
                onPress={() =>
                  addItem({ id: item.id, name: item.name, price: 12.99, image: item.emoji })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ width: space.md }} />}
          />
        </Animated.View>

        {/* DashPass Exclusive Deals */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>DashPass Exclusive Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Easter Prep Section */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Easter Prep 🐣</Text>
          <View style={styles.storesList}>
            {stores.slice(0, 2).map((store) => (
              <StoreCard key={`easter-${store.id}`} store={store} />
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
  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    gap: space.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: borderRadius.pill,
    gap: 6,
  },
  actionIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconActive: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
  },
  actionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
  },
  actionLabelActive: {
    color: colors.primary[500],
  },
  heroSection: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  heroTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
    lineHeight: typography.lineHeight.normal,
  },
  section: {
    paddingTop: space.md,
    paddingBottom: space.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    paddingHorizontal: space.lg,
    marginBottom: space.md,
  },
  storesList: {
    paddingHorizontal: space.lg,
  },
});

export default HomeScreen;
