import React, { useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Platform,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/colors';

export interface DockApp {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number; color: string; strokeWidth?: number }>;
}

export interface MacOSDockProps {
  apps: DockApp[];
  activeIndex: number;
  onAppClick: (index: number) => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
}

const BASE_ICON_SIZE = 52;
const MAX_SCALE = 1.6;
const MIN_SCALE = 1.0;
const EFFECT_WIDTH = 220;
const SPACING = 8;
const PADDING = 12;

export default function MacOSDock({
  apps,
  activeIndex,
  onAppClick,
  badge,
  style,
}: MacOSDockProps) {
  const touchX = useSharedValue<number | null>(null);
  const dockX = useRef(0);
  const dockWidth = useRef(0);

  const scale0 = useSharedValue(1);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  const scale4 = useSharedValue(1);
  const scale5 = useSharedValue(1);
  const scales: SharedValue<number>[] = [scale0, scale1, scale2, scale3, scale4, scale5];

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    dockX.current = e.nativeEvent.layout.x;
    dockWidth.current = e.nativeEvent.layout.width;
  }, []);

  const panGesture = Gesture.Pan()
    .activateAfterLongPress(1)
    .onUpdate((e) => {
      touchX.value = e.absoluteX - dockX.current;
    })
    .onEnd(() => {
      touchX.value = null;
    });

  const hoverGesture = Gesture.Hover()
    .onUpdate((e) => {
      touchX.value = e.absoluteX - dockX.current;
    })
    .onEnd(() => {
      touchX.value = null;
    });

  const gesture = Platform.OS === 'web' ? hoverGesture : panGesture;

  useEffect(() => {
    const interval = setInterval(() => {
      const mx = touchX.value;
      if (mx === null) {
        scales.forEach((sv, i) => {
          if (i < apps.length && Math.abs(sv.value - MIN_SCALE) > 0.005) {
            sv.value = withSpring(MIN_SCALE, { damping: 18, stiffness: 250 });
          }
        });
        return;
      }
      const totalIconsWidth = apps.length * BASE_ICON_SIZE + (apps.length - 1) * SPACING;
      const sidePadding = (dockWidth.current - totalIconsWidth) / 2;
      apps.forEach((_, i) => {
        const iconCenter = sidePadding + i * (BASE_ICON_SIZE + SPACING) + BASE_ICON_SIZE / 2;
        const min = mx - EFFECT_WIDTH / 2;
        const max = mx + EFFECT_WIDTH / 2;
        const sv = scales[i];
        if (iconCenter < min || iconCenter > max) {
          if (Math.abs(sv.value - MIN_SCALE) > 0.005) {
            sv.value = withSpring(MIN_SCALE, { damping: 18, stiffness: 300 });
          }
          return;
        }
        const theta = ((iconCenter - min) / EFFECT_WIDTH) * 2 * Math.PI;
        const capped = Math.min(Math.max(theta, 0), 2 * Math.PI);
        const factor = (1 - Math.cos(capped)) / 2;
        const target = MIN_SCALE + factor * (MAX_SCALE - MIN_SCALE);
        sv.value = withSpring(target, { damping: 16, stiffness: 280 });
      });
    }, 16);
    return () => clearInterval(interval);
  }, [apps, scales, touchX]);

  return (
    <GestureDetector gesture={gesture}>
      <View
        onLayout={handleLayout}
        style={[styles.dockContainer, style]}
      >
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFillObject} />
        <View style={styles.dockInner}>
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <DockIcon
                key={app.id}
                scale={scales[index]}
                isActive={activeIndex === index}
                badge={app.id === 'cart' ? badge : undefined}
                onPress={() => onAppClick(index)}
                Icon={Icon}
              />
            );
          })}
        </View>
      </View>
    </GestureDetector>
  );
}

interface DockIconProps {
  scale: SharedValue<number>;
  isActive: boolean;
  badge?: number;
  onPress: () => void;
  Icon: React.ComponentType<{ size: number; color: string; strokeWidth?: number }>;
}

const DockIcon = React.memo(function DockIcon({
  scale,
  isActive,
  badge,
  onPress,
  Icon,
}: DockIconProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotOpacity = useSharedValue(isActive ? 1 : 0);
  useEffect(() => {
    dotOpacity.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  return (
    <Pressable onPress={onPress} style={styles.iconWrapper}>
      <Animated.View style={[styles.iconBox, animatedStyle]}>
        <Icon size={30} color={Colors.BRAND} strokeWidth={2} />
        {badge !== undefined && badge > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        ) : null}
      </Animated.View>
      <Animated.View style={[styles.dot, dotStyle]} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  dockContainer: {
    height: BASE_ICON_SIZE + PADDING * 2 + 6,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
    backgroundColor: 'rgba(255,248,240,0.92)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  dockInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: PADDING,
    paddingBottom: PADDING,
    paddingTop: PADDING,
    gap: SPACING,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: BASE_ICON_SIZE,
    height: BASE_ICON_SIZE,
  },
  iconBox: {
    width: BASE_ICON_SIZE,
    height: BASE_ICON_SIZE,
    borderRadius: 14,
    backgroundColor: 'rgba(111,78,55,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.BRAND,
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.RED_500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: '700',
  },
});
