export const colors = {
  bg: '#0B1120',
  bgElevated: '#0F172A',
  surface: '#111827',
  surfaceAlt: '#1A2233',
  border: '#1F2937',
  borderStrong: '#334155',

  primary: '#6366F1',
  primaryDark: '#4F46E5',
  accent: '#8B5CF6',

  text: '#F9FAFB',
  textMuted: '#9CA3AF',
  textDim: '#6B7280',

  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  tabBar: '#0F172A',
  tabBarInactive: '#6B7280',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
  h2: { fontSize: 22, fontWeight: '700' as const, color: colors.text },
  h3: { fontSize: 18, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 15, color: colors.text, lineHeight: 22 },
  muted: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  small: { fontSize: 12, color: colors.textDim },
};