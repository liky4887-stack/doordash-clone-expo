import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, FadeInUp } from 'react-native-reanimated';
import { Cart, Heart, Check, Star } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import colors from '@/src/design-tokens/colors';
import { space } from '@/src/design-tokens/spacing';
import { borderRadius } from '@/src/design-tokens/border-radius';
import { shadows } from '@/src/design-tokens/shadows';
import typography from '@/src/design-tokens/typography';

interface ProductCardProps {
  image?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  badge?: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  currency = 'USD',
  rating,
  badge,
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const iconScale = useSharedValue(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handleWishlist = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWishlisted(!wishlisted);
    heartScale.value = withSpring(1.3, { damping: 10 });
    setTimeout(() => {
      heartScale.value = withSpring(1, { damping: 10 });
    }, 200);
    if (onWishlist) onWishlist();
  };

  const handleAddToCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAdded(true);
    iconScale.value = withSpring(1.3, { damping: 10 });
    setTimeout(() => {
      iconScale.value = withSpring(1, { damping: 10 });
      setAdded(false);
    }, 500);
    if (onAddToCart) onAddToCart();
  };

  const badgeColor =
    badge === 'Sale'
      ? colors.RED_500
      : badge === 'New'
      ? colors.GREEN
      : colors.BRAND;

  const isImageUri = image ? image.startsWith('http') || image.startsWith('data:') : false;

  return (
    <Animated.View entering={FadeInUp.duration(300).springify()} style={[styles.card, animatedStyle, shadows.md]}>
      <Pressable
        onPress={handleAddToCart}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: colors.BACKDROP }}
        style={{ flex: 1 }}
      >
        <View style={styles.imageContainer}>
          {image && isImageUri ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderEmoji}>{image || '🍽️'}</Text>
            </View>
          )}
          {badge && (
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {currency} {price.toFixed(2)}
            </Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>
                {currency} {originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
          {rating && (
            <View style={styles.ratingRow}>
              <Star size={16} color={colors.YELLOW} />
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          )}
          <View style={styles.actionsRow}>
            <Pressable
              onPress={handleWishlist}
              style={({ pressed }) => [
                styles.wishlistBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Animated.View style={heartAnimatedStyle}>
                <Heart
                  size={20}
                  color={wishlisted ? colors.PRIMARY : colors.DARK_GRAY}
                  fill={wishlisted ? colors.PRIMARY : 'transparent'}
                  stroke={wishlisted ? 'transparent' : colors.DARK_GRAY}
                />
              </Animated.View>
            </Pressable>
            {onAddToCart && (
              <Pressable
                onPress={handleAddToCart}
                style={({ pressed }) => [
                  styles.addBtn,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Animated.View style={iconAnimatedStyle}>
                  <View style={styles.addBtnContent}>
                    {added ? (
                      <Check size={16} color={colors.WHITE} />
                    ) : (
                      <Cart size={16} color={colors.WHITE} />
                    )}
                  </View>
                </Animated.View>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: space.sm,
    marginBottom: space.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 32,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.WHITE,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.RED_500,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.WHITE,
  },
  content: {
    padding: space.md,
    paddingTop: space.sm,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.BLACK,
    marginBottom: space.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: space.sm,
  },
  price: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.BLACK,
  },
  originalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.DARK_GRAY,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: space.md,
  },
  rating: {
    fontSize: typography.fontSize.sm,
    color: colors.DARK_GRAY,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    alignItems: 'center',
  },
  wishlistBtn: {
    padding: 4,
    borderRadius: borderRadius.sm,
  },
  addBtn: {
    padding: space.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnContent: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
