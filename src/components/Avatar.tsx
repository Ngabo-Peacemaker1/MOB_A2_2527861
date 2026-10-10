import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/colors';

interface Props {
  uri: string | null;
  name: string;
  size?: number;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function Avatar({ uri, name, size = 96 }: Props) {
  const s = { width: size, height: size, borderRadius: radius.pill };

  if (uri) {
    return <Image source={{ uri }} style={[styles.img, s]} />;
  }

  return (
    <View style={[styles.fallback, s]}>
      <Text style={[styles.initials, { fontSize: size * 0.34 }]}>
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  fallback: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.text,
    fontWeight: '700',
  },
});