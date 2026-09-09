/**
 * LocationHeader - Premium location and profile header
 * Features: Design tokens integration, accessibility, consistent spacing
 */

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "@/src/design-tokens/colors";
import typography from "@/src/design-tokens/typography";
import { space } from "@/src/design-tokens/spacing";

interface LocationHeaderProps {
  address?: string;
}

export default function LocationHeader({ address = '283 Hayes St' }: LocationHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationBtn}
        accessibilityRole="button"
        accessibilityLabel={`Change delivery address: ${address}`}
      >
        <Text style={styles.label}>Delivery to</Text>
        <View style={styles.addressRow}>
          <Text style={styles.address}>{address}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.neutral[600]} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileBtn}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
      >
        <Ionicons name="person-circle-outline" size={32} color={colors.neutral[700]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  locationBtn: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    fontWeight: typography.fontWeight.medium,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  address: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginRight: 4,
  },
  profileBtn: {
    padding: 4,
  },
});
