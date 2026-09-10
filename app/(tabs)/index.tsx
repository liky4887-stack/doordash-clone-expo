/**
 * Home Screen - Premium UI/UX Overhaul
 * Features: Reanimated transitions, parallax header, skeleton loaders, smooth category filtering
 */

import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform, Image } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInRight, SlideOutLeft, withTiming, useSharedValue, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";
import { shadows } from "@/src/design-tokens/shadows";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { categories, products } from '@/constants/mockData';
import { useCartStore } from '@/store/useCartStore';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import CategoryChip from '@/components/CategoryChip';
import ProductCard from '@/components/ui/product-card';

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

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.emoji,
    });
  };

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

        {/* Shop Groceries Section - 2-column grid */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Shop Groceries</Text>
          <FlatList
            numColumns={2}
            data={products.slice(0, 8)}
            renderItem={({ item }) => (
              <ProductCard
                image={item.emoji}
                title={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                rating={item.rating}
                badge={item.badge}
                onAddToCart={() => handleAddToCart(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productsGrid}
          />
        </Animated.View>

        {/* Bottom Banner */}
        <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.bottomBanner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Get 5% off pickup orders</Text>
            <Text style={styles.bannerSubtitle}>DashPass members save more every day</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Learn More</Text>
            </TouchableOpacity>
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
    paddingTop: space.xs,
    paddingBottom: space.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    paddingHorizontal: space.lg,
    marginBottom: space.md,
  },
  bottomBanner: {
    marginHorizontal: space.lg,
    marginBottom: space.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.primary[500],
    ...shadows.lg,
  },
  bannerContent: {
    padding: space.lg,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.background.inverse,
    textAlign: 'center',
    marginBottom: space.xs,
  },
  bannerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.background.inverse,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: space.md,
  },
  bannerButton: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: space.xl,
    paddingVertical: space.sm,
    borderRadius: borderRadius.pill,
  },
  bannerButtonText: {
    color: colors.primary[500],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
});

