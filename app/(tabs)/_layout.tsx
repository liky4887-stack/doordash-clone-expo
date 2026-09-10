import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '@/store/useCartStore';
import MacOSDock, { DockApp } from '@/components/ui/mac-os-dock';
import { Coffee, Receipt, Gift, ShoppingCart } from 'lucide-react-native';

const dockApps: DockApp[] = [
  { id: 'index', name: 'Menu', icon: Coffee },
  { id: 'orders', name: 'Orders', icon: Receipt },
  { id: 'dashpass', name: 'Rewards', icon: Gift },
  { id: 'cart', name: 'Cart', icon: ShoppingCart },
];

function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const insets = useSafeAreaInsets();
  const itemCount = useCartStore((s) => s.items.length);
  const activeIndex = state.index;

  const handleAppClick = (index: number) => {
    const target = dockApps[index].id;
    navigation.navigate(target);
  };

  return (
    <View style={styles.tabBarContainer} pointerEvents="box-none">
      <MacOSDock
        apps={dockApps}
        activeIndex={activeIndex}
        onAppClick={handleAppClick}
        badge={itemCount}
        bottomInset={Math.max(insets.bottom, 0)}
        style={styles.dockFullWidth}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Menu' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="dashpass" options={{ title: 'Rewards' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dockFullWidth: {
    width: '100%',
  },
});
