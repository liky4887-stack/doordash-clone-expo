export const Colors = {
  PRIMARY: '#FF2B2B',
  PRIMARY_DARK: '#E02424',
  BLACK: '#1A1A1A',
  WHITE: '#FFFFFF',
  GRAY: '#F5F5F5',
  LIGHT_GRAY: '#EAEAEA',
  DARK_GRAY: '#888888',
  GREEN: '#0B9B4A',
  YELLOW: '#FFB800',
  BLUE: '#007AFF',
  BRAND: '#FF3B5C',
  BRAND_SECONDARY: '#E62E4D',
  AMBER: '#F59E0B',
  EMERALD: '#059669',
  RED_500: '#EF4444',
  RED_50: '#FEF2F2',
  RED_600: '#DC2626',
  EMERALD_500: '#10B981',
  EMERALD_600: '#059669',
  MUTED: '#F3F4F6',
  MUTED_FOREGROUND: '#6B7280',
  CARD: '#FFFFFF',
  BORDER: '#E5E7EB',
  RING: '#FF3B5C',
  BACKDROP: 'rgba(255,255,255,0.8)',
};

export const Spacing = {
  SM: 8,
  MD: 16,
  LG: 20,
  XL: 24,
};

export const Radius = {
  CHIP: 30,
  CARD: 16,
  SM: 8,
  LG: 24,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  fontWeight: {
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};
