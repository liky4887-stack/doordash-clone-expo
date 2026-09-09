/**
 * StoreCard - Premium restaurant store card with hover lift and micro-interactions
 * Features: Animated lift on press, design tokens integration, accessibility labels
 */

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { shadows } from "@/src/design-tokens/shadows";
import { Store } from '@/constants/mockData';


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface StoreCardProps {
  store: Store;
  showBadge?: boolean;
  onPress?: () => void;
}

export default function StoreCard({ store, showBadge = true, onPress }: StoreCardProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(300).springify()} style={[styles.container, animatedStyle]}>
      <AnimatedTouchableOpacity
        style={styles.content}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Order from ${store.name}`}
      >
        <View style={styles.imageContainer}>
          <Text style={styles.emoji}>{store.emoji}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.name}>{store.name}</Text>

          <View style={styles.meta}>
            <Text style={styles.rating}>{'⭐'.repeat(Math.min(parseInt(store.rating), 5))}</Text>
            <Text style={styles.reviews}>{store.reviews} reviews</Text>
          </View>

          {showBadge && store.tag ? (
            <Text style={styles.tag}>{store.tag}</Text>
          ) : null}

          <Text style={styles.fee}>Fee: {store.feeText}</Text>
        </View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
    elevation: 4,
  },
  content: {
    padding: space.lg,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  emoji: {
    fontSize: 40,
  },
  details: {
    alignItems: 'center',
  },
  name: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: space.xs,
    textAlign: 'center',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: space.xs,
  },
  rating: {
    fontSize: typography.fontSize.xs,
    color: colors.primary[500],
    marginRight: space.xs,
  },
  reviews: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
  },
  tag: {
    position: 'absolute',
    top: space.xs,
    left: space.xs,
    backgroundColor: colors.primary[500],
    color: colors.background.inverse,
    borderRadius: borderRadius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  fee: {
    fontSize: typography.fontSize.sm,
    color: colors.semantic.success,
    fontWeight: typography.fontWeight.medium,
    marginTop: space.xs,
  },
});
