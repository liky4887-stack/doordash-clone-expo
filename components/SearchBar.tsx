/**
 * SearchBar - Premium search input with focus ring and haptic feedback
 * Features: Design tokens integration, accessibility, subtle press feedback
 */

import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { colors, space, borderRadius, shadows } from "@/src/design-tokens";
import * as Haptics from 'expo-haptics';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ placeholder = 'Search DoorDash', value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color={colors.neutral[500]} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral[400]}
        value={value}
        onChangeText={onChangeText}
        accessibilityRole="search"
        accessibilityLabel="Search restaurants and deals"
        returnKeyType="search"
        onFocus={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.pill,
    paddingHorizontal: space.md,
    height: 48,
    marginHorizontal: space.lg,
    marginVertical: space.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  icon: {
    marginRight: space.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
});
