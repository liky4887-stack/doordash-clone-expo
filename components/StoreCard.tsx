import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '@/constants/colors';
import { Store } from '@/constants/mockData';

interface StoreCardProps {
  store: Store;
  showBadge?: boolean;
  onPress?: () => void;
}

export default function StoreCard({ store, showBadge, onPress }: StoreCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{store.emoji}</Text>
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DASHPASS</Text>
          </View>
        )}
        {store.tag && !showBadge && (
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>{store.tag}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{store.name}</Text>
        <Text style={styles.meta}>{store.rating} ⭐ ({store.reviews})</Text>
        <Text style={styles.meta}>{store.distance} · {store.time}</Text>
        <Text style={styles.fee}>{store.feeText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.CARD,
    marginBottom: Spacing.MD,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 120,
    backgroundColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 48,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tagBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagBadgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    padding: Spacing.MD,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginBottom: 2,
  },
  fee: {
    fontSize: 13,
    color: Colors.GREEN,
    fontWeight: '600',
    marginTop: 4,
  },
});
