import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '@/constants/colors';
import { stores } from '@/constants/mockData';
import LocationHeader from '@/components/LocationHeader';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';

export default function DashPassScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Ionicons name="trophy" size={20} color={Colors.YELLOW} />
            <Text style={styles.heroBadgeText}>DASHPASS</Text>
          </View>
          <Text style={styles.heroTitle}>Save on every order</Text>
          <Text style={styles.heroSubtitle}>
            Get $0 delivery fees and reduced service fees on eligible orders over $12
          </Text>
          <View style={styles.heroBtnRow}>
            <View style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>Try DashPass Free</Text>
            </View>
          </View>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>$0</Text>
              <Text style={styles.heroStatLabel}>Delivery fees</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>10%</Text>
              <Text style={styles.heroStatLabel}>Off orders</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>5%</Text>
              <Text style={styles.heroStatLabel}>Cash back</Text>
            </View>
          </View>
        </View>

        <LocationHeader />
        <SearchBar placeholder="Search DashPass stores" />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DashPass Stores Near You</Text>
          <View style={styles.storesList}>
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} showBadge />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
  },
  heroCard: {
    backgroundColor: Colors.BLACK,
    marginHorizontal: Spacing.LG,
    marginTop: Spacing.MD,
    borderRadius: Radius.CARD,
    padding: Spacing.XL,
    overflow: 'hidden',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.MD,
  },
  heroBadgeText: {
    color: Colors.YELLOW,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: Spacing.SM,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.WHITE,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: Spacing.LG,
  },
  heroBtnRow: {
    marginBottom: Spacing.LG,
  },
  heroBtn: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: Spacing.MD,
    borderRadius: Radius.CHIP,
    alignItems: 'center',
  },
  heroBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.YELLOW,
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
  },
  section: {
    paddingTop: Spacing.MD,
    paddingBottom: Spacing.XL * 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.BLACK,
    paddingHorizontal: Spacing.LG,
    marginBottom: Spacing.MD,
  },
  storesList: {
    paddingHorizontal: Spacing.LG,
  },
});
