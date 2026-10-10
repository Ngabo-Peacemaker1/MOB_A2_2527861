import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import { colors, radius, spacing } from '../theme/colors';
import { PROJECTS } from '../data/portfolioData';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProjectsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Projects</Text>

        {PROJECTS.length === 0 ? (
          <EmptyState
            title="No projects yet"
            message="Projects will appear here once added."
          />
        ) : (
          PROJECTS.map((p) => (
            <Pressable
              key={p.id}
              onPress={() =>
                navigation.navigate('ProjectDetails', { projectId: p.id })
              }
              style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
            >
              <Card>
                <Text style={styles.cardTitle}>{p.title}</Text>
                <Text style={styles.cardSummary}>{p.summary}</Text>
                <View style={styles.chipRow}>
                  {p.tech.map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                </View>
                <Text style={styles.cta}>View details →</Text>
              </Card>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  cardSummary: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  cta: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
    marginTop: spacing.sm,
  },
});