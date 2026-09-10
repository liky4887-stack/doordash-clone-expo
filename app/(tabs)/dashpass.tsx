/**
 * DashPass Screen - Premium subscription screen
 * Features: Design tokens integration, smooth animations, premium styling
 */

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";
import { shadows } from "@/src/design-tokens/shadows";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { dashpassProducts } from '@/constants/mockData';
import ProductCard from '@/components/ui/product-card';

export default function DashPassScreen() {
  const handleAddToCart = (product: any) => {
    // Could re-add a DashPass item to cart if needed
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero with brand gradient + stats */}
        <Animated.View entering={FadeInUp.duration(300).springify()} style={styles.heroSection}>
          <View style={styles.heroBackground} />
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Ionicons name="trophy" size={48} color={colors.primary[500]} />
            </View>
            <Text style={styles.heroTitle}>DashPass</Text>
            <Text style={styles.heroSubtitle}>
              Free delivery on orders over $12
            </Text>

            <View style={styles.heroStats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>$0</Text>
                <Text style={styles.statLabel}>Delivery fees</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>$1.99</Text>
                <Text style={styles.statLabel}>Service fees</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>5%</Text>
                <Text style={styles.statLabel}>Off pickup</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.ctaButton}
              accessibilityRole="button"
              accessibilityLabel="Start free trial"
            >
              <Text style={styles.ctaText}>Start Free Trial</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* DashPass Benefits */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>DashPass Benefits</Text>
          <View style={styles.benefitsGrid}>
            {[
              { icon: 'car-sport-outline', title: 'Free Delivery', desc: 'On orders $12+' },
              { icon: 'cash-outline', title: 'Lower Fees', desc: 'Reduced service fees' },
              { icon: 'bag-handle-outline', title: 'Pickup Discount', desc: '5% off pickup orders' },
              { icon: 'star-outline', title: 'Exclusive Deals', desc: 'DashPass-only offers' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <Ionicons name={benefit.icon} size={24} color={colors.primary[500]} style={styles.benefitIcon} />
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* DashPass Exclusive Products - 2-column grid */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>DashPass Exclusive Deals</Text>
          <View style={styles.productsGrid}>
            {dashpassProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.emoji}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                badge={product.badge}
                onAddToCart={() => handleAddToCart(product)}
              />
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
  heroSection: {
    position: 'relative',
    marginHorizontal: space.lg,
    marginTop: space.md,
    marginBottom: space.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary[50],
  },
  heroContent: {
    padding: space.xl,
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.lg,
  },
  heroTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.xs,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral[600],
    marginBottom: space.xl,
    textAlign: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: space.xl,
    paddingHorizontal: space.xl,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    marginTop: space.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral[300],
    marginHorizontal: space.xl,
  },
  ctaButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
    borderRadius: borderRadius.pill,
    ...shadows.md,
  },
  ctaText: {
    color: colors.background.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  section: {
    paddingTop: space.md,
    paddingBottom: space['2xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    paddingHorizontal: space.lg,
    marginBottom: space.md,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: space.lg,
    gap: space.md,
  },
  benefitCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: space.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  benefitIcon: {
    marginBottom: space.md,
  },
  benefitTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: space.xs,
  },
  benefitDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    textAlign: 'center',
  },
  productsGrid: {
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

