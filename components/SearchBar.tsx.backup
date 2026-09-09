import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '@/constants/colors';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ placeholder = 'Search DoorDash', value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.DARK_GRAY} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.DARK_GRAY}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY,
    borderRadius: Radius.CHIP,
    paddingHorizontal: Spacing.MD,
    height: 48,
    marginHorizontal: Spacing.LG,
    marginVertical: Spacing.SM,
  },
  icon: {
    marginRight: Spacing.SM,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.BLACK,
  },
});
