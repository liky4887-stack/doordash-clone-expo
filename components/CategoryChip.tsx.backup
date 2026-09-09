import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/colors';
import { Category } from '@/constants/mockData';

interface CategoryChipProps {
  category: Category;
  selected?: boolean;
  onPress?: () => void;
}

export default function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY,
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    borderRadius: Radius.CHIP,
    marginRight: Spacing.SM,
  },
  chipSelected: {
    backgroundColor: Colors.BLACK,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  labelSelected: {
    color: Colors.WHITE,
  },
});
