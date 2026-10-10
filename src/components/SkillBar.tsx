import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

interface Props {
  name: string;
  level: number; // 1-5
}

export default function SkillBar({ name, level }: Props) {
  const pct = Math.max(0, Math.min(5, level)) / 5;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.level}>{level}/5</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  name: { color: colors.text, fontSize: 15, fontWeight: '600' },
  level: { color: colors.textMuted, fontSize: 13 },
  track: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
});