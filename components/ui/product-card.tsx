import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Check, Heart, ShoppingCart, Star } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '@/constants/colors';
import SmoothButton from '@/components/ui/smooth-button';

export interface ProductCardProps {
  badge?: string;
  style?: import('react-native').StyleProp<ViewStyle>;
  currency?: string;
  image: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  originalPrice?: number;
  price: number;
  rating?: number;
  title: string;
}

const badgeColors: Record<string, string> = {
  sale: Colors.RED_500,
  new: Colors.EMERALD_600,
  dashpass: Colors.BRAND,
};

function Rating({ value }: { value: number }) {
  const filledStars = Math.round(value);

  return (
    <View style={styles.ratingRow}>
      <View style={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={`rating-${index}`}
            size={13}
            color={index < filledStars ? Colors.AMBER : Colors.LIGHT_GRAY}
            fill={index < filledStars ? Colors.AMBER : 'transparent'}
            strokeWidth={1.5}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>{value.toFixed(1)}</Text>
    </View>
  );
}

export default function ProductCard({
  badge,
  currency = '$',
  image,
  onAddToCart,
  onWishlist,
  originalPrice,
  price,
  rating,
  style,
  title,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;
  const badgeColor = badge ? badgeColors[badge.toLowerCase()] ?? Colors.BLACK : Colors.BLACK;

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = () => {
    setWishlisted((current) => !current);
    onWishlist?.();
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageArea}>
        <Text style={styles.emoji}>{image}</Text>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
        {discount ? (
          <View style={styles.discountPill}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        ) : null}
        <Pressable
          accessibilityLabel={wishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          accessibilityRole="button"
          onPress={handleWishlist}
          style={({ pressed }) => [styles.heartButton, pressed && styles.pressed]}
        >
          <Heart
            size={17}
            color={wishlisted ? Colors.RED_500 : Colors.MUTED_FOREGROUND}
            fill={wishlisted ? Colors.RED_500 : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        {rating !== undefined ? <Rating value={rating} /> : null}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{currency}{price.toFixed(2)}</Text>
          {originalPrice && originalPrice > price ? (
            <Text style={styles.originalPrice}>{currency}{originalPrice.toFixed(2)}</Text>
          ) : null}
        </View>
        <SmoothButton
          accessibilityLabel={added ? `${title} added to cart` : `Add ${title} to cart`}
          disabled={added}
          onPress={handleAdd}
          style={[styles.addButton, added && styles.addedButton]}
          variant="default"
        >
          {added ? <Check color={Colors.WHITE} size={16} strokeWidth={2.5} /> : <ShoppingCart color={Colors.WHITE} size={16} strokeWidth={2} />}
          <Text style={styles.addButtonText}>{added ? 'Added' : 'Add to cart'}</Text>
        </SmoothButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderColor: 'rgba(255,255,255,0.65)',
    borderRadius: Radius.CARD,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  imageArea: {
    height: 126,
    backgroundColor: 'rgba(255,247,245,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 54,
  },
  badge: {
    position: 'absolute',
    left: 10,
    top: 10,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: '700',
  },
  discountPill: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: Colors.RED_50,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountText: {
    color: Colors.RED_600,
    fontSize: 10,
    fontWeight: '700',
  },
  heartButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    width: 36,
  },
  pressed: {
    opacity: 0.65,
  },
  content: {
    gap: 7,
    padding: Spacing.MD,
  },
  title: {
    color: Colors.BLACK,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19,
    minHeight: 38,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingText: {
    color: Colors.MUTED_FOREGROUND,
    fontSize: 12,
    marginLeft: 5,
  },
  priceRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 7,
    minHeight: 24,
  },
  price: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: '800',
  },
  originalPrice: {
    color: Colors.MUTED_FOREGROUND,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    height: 38,
    paddingHorizontal: 10,
    width: '100%',
  },
  addedButton: {
    backgroundColor: Colors.EMERALD_600,
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: 13,
    fontWeight: '700',
  },
});
