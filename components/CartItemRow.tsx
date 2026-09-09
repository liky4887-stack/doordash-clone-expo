/**
 * CartItemRow - Individual cart item with animations and haptic feedback
 * Features: Reanimated press feedback, animated removal, haptic feedback
 */

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { shadows } from "@/src/design-tokens/shadows";
import { space } from "@/src/design-tokens/spacing";
import { borderRadius } from "@/src/design-tokens/border-radius";
import { CartItem } from '@/store/useCartStore';
import * as Haptics from 'expo-haptics';

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const handleRemove = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    opacity.value = withTiming(0, { duration: 300 }, () => {
      onRemove(item.id);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View entering={FadeIn.duration(300).springify()} style={[styles.container, animatedStyle]}>
      <AnimatedTouchableOpacity
        style={styles.content}
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, quantity ${item.quantity}`}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{item.image}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onDecrement(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Decrease ${item.name} quantity`}
          >
            <Ionicons name="remove" size={16} color={colors.neutral[600]} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onIncrement(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Increase ${item.name} quantity`}
          >
            <Ionicons name="add" size={16} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={handleRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.name} from cart`}
        >
          <Ionicons name="trash-outline" size={18} color={colors.semantic.error} />
        </TouchableOpacity>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: space.md,
    marginBottom: space.sm,
    ...shadows.sm,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: space.md,
  },
  emoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: 2,
  },
  price: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[500],
    fontWeight: typography.fontWeight.medium,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.pill,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    marginRight: space.sm,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    padding: space.xs,
    marginLeft: space.sm,
  },
});
