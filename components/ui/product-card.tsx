import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { Check, Heart, ShoppingCart, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import SmoothButton from '@/components/ui/smooth-button';

export interface ProductCardProps {
  badge?: string;
  currency?: string;
  image: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  originalPrice?: number;
  price: number;
  rating?: number;
  style?: StyleProp<ViewStyle>;
  title: string;
}

const badgeColors: Record<string, string> = {
  sale: '#E63946',
  new: '#2A9D8F',
  popular: '#2D1B12',
  reward: '#6F4E37',
};

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

  const badgeColor = badge ? badgeColors[badge.toLowerCase()] ?? '#6F4E37' : undefined;

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
      {/* Image area - plain white, no separate background/border */}
      <View style={styles.imageArea}>
        <Text style={styles.emoji}>{image}</Text>

        {/* Badge - top-left absolute */}
        {badge ? (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}

        {/* Heart button - top-right absolute */}
        <Pressable
          accessibilityLabel={wishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          accessibilityRole="button"
          onPress={handleWishlist}
          style={({ pressed }) => [styles.heartButton, pressed && styles.pressed]}
        >
          <Heart
            size={17}
            color={wishlisted ? Colors.RED_500 : '#8C7B6B'}
            fill={wishlisted ? Colors.RED_500 : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>

      {/* Content area */}
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>

        {rating !== undefined && (
          <View style={styles.ratingRow}>
            <Star size={14} color="#8B7355" fill="#8B7355" strokeWidth={1} />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.price}>{currency}{price.toFixed(2)}</Text>
          {originalPrice && originalPrice > price ? (
            <Text style={styles.originalPrice}>{currency}{originalPrice.toFixed(2)}</Text>
          ) : null}
        </View>

        {/* Discount pill on image area (absolute bottom-left) */}
        {discount ? (
          <View style={styles.discountPill}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        ) : null}

        <SmoothButton
          accessibilityLabel={added ? `${title} added to cart` : `Add ${title} to cart`}
          disabled={added}
          onPress={handleAdd}
          style={[styles.addButton, added && styles.addedButton]}
          variant="default"
        >
          <View style={styles.addButtonContent}>
            {added ? (
              <Check color={Colors.WHITE} size={14} strokeWidth={2.5} />
            ) : (
              <ShoppingCart color={Colors.WHITE} size={14} strokeWidth={2} />
            )}
            <Text style={styles.addButtonText}>{added ? 'Added' : 'Add to cart'}</Text>
          </View>
        </SmoothButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0EAE3',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageArea: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 56,
  },
  badge: {
    position: 'absolute',
    left: 10,
    top: 10,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
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
    borderRadius: 8,
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    width: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  pressed: {
    opacity: 0.65,
  },
  content: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B12',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#8B7355',
    fontSize: 12,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6F4E37',
  },
  originalPrice: {
    fontSize: 12,
    color: '#8B7355',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#6F4E37',
    borderRadius: 8,
    height: 36,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addedButton: {
    backgroundColor: Colors.EMERALD_600,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    width: '100%',
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
});
