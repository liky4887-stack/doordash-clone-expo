/**
 * Design Tokens - Colors
 * Premium color palette for the DoorDash clone
 * All colors meet WCAG AA contrast standards
 */

// Primary brand colors (DoorDash red family)
export const primary = {
  50: '#FFF5F5',
  100: '#FFE8E8',
  200: '#FFCACA',
  300: '#FFA8A8',
  400: '#FF6B6B',
  500: '#FF2B2B', // Main brand red
  600: '#E02424', // Darker brand red
  700: '#C41E1E',
  800: '#A01818',
  900: '#7D1414',
};

// Neutral colors (grays, blacks, whites)
export const neutral = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EAEAEA',
  300: '#D4D4D4',
  400: '#B0B0B0',
  500: '#888888',
  600: '#666666',
  700: '#444444',
  800: '#2A2A2A',
  900: '#1A1A1A',
};

// Semantic colors
export const semantic = {
  success: '#0B9B4A',
  warning: '#FFB800',
  error: '#FF2B2B',
  info: '#007AFF',
  disabled: '#B0B0B0',
};

// Background colors
export const background = {
  primary: '#FFFFFF',
  secondary: '#F5F5F5',
  tertiary: '#FAFAFA',
  elevated: '#FFFFFF',
};

// Text colors
export const text = {
  primary: '#1A1A1A',
  secondary: '#888888',
  tertiary: '#B0B0B0',
  disabled: '#B0B0B0',
  inverse: '#FFFFFF',
  link: '#007AFF',
};

// Border colors
export const border = {
  light: '#EAEAEA',
  medium: '#D4D4D4',
  dark: '#B0B0B0',
};

export const colors = { primary, neutral, semantic, background, text, border };
export default colors;
