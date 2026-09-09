import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '@/constants/colors';
import { CartItem } from '@/store/useCartStore';

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.image}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => onDecrement(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={18} color={Colors.BLACK} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => onIncrement(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={18} color={Colors.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color={Colors.DARK_GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.CARD,
    padding: Spacing.MD,
    marginBottom: Spacing.SM,
    elevation: 1,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.MD,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.BLACK,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BLACK,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: Spacing.SM,
    padding: 4,
  },
});
