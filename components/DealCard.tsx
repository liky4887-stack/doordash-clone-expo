/**
 * DealCard - Premium deal/promotion card with hover lift effect
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
import { Deal } from '@/constants/mockData';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface DealCardProps {
  deal: Deal;
  onPress?: () => void;
}

export default function DealCard({ deal, onPress }: DealCardProps) {
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
        accessibilityLabel={`View deal: ${deal.title}`}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{deal.emoji}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <Text style={styles.subtitle}>{deal.subtitle}</Text>
          <Text style={styles.storeName}>{deal.storeName}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>⭐ {deal.rating}</Text>
            <Text style={styles.meta}>⏱ {deal.time}</Text>
            <Text style={styles.meta}>📍 {deal.distance}</Text>
          </View>
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
    marginRight: space.sm,
    minWidth: 160,
  },
  content: {
    padding: space.lg,
  },
  emojiContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  storeName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: space.xs,
  },
  meta: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
  },
});
