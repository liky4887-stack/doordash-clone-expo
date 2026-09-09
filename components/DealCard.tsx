import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '@/constants/colors';
import { Deal } from '@/constants/mockData';

interface DealCardProps {
  deal: Deal;
  onPress?: () => void;
}

export default function DealCard({ deal, onPress }: DealCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{deal.emoji}</Text>
        <View style={styles.dealBadge}>
          <Ionicons name="pricetag" size={12} color={Colors.WHITE} />
          <Text style={styles.dealBadgeText}>DEAL</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{deal.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{deal.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.storeName} numberOfLines={1}>{deal.storeName}</Text>
        </View>
        <Text style={styles.meta}>{deal.distance} · {deal.time} · {deal.rating} ⭐</Text>
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
    width: 260,
    marginRight: Spacing.MD,
  },
  imageContainer: {
    height: 100,
    backgroundColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 40,
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dealBadgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  info: {
    padding: Spacing.MD,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.DARK_GRAY,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  storeName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.BLACK,
    flex: 1,
  },
  meta: {
    fontSize: 12,
    color: Colors.DARK_GRAY,
  },
});
