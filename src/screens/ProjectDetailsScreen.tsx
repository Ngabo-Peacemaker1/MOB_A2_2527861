import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import Section from '../components/Section';
import { colors, spacing } from '../theme/colors';
import { PROJECTS } from '../data/portfolioData';
import { RootStackParamList } from '../types';

type Rt = RouteProp<RootStackParamList, 'ProjectDetails'>;

export default function ProjectDetailsScreen() {
  const route = useRoute<Rt>();
  const project = PROJECTS.find((p) => p.id === route.params.projectId);

  if (!project) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <EmptyState
          title="Project not found"
          message="This project could not be loaded."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{project.title}</Text>

        <Section title="Problem">
          <Card>
            <Text style={styles.body}>{project.problem}</Text>
          </Card>
        </Section>

        <Section title="My contribution">
          <Card>
            <Text style={styles.body}>{project.contribution}</Text>
          </Card>
        </Section>

        <Section title="Technology used">
          <View style={styles.chipRow}>
            {project.tech.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </View>
        </Section>

        <Section title="Summary">
          <Card>
            <Text style={styles.body}>{project.summary}</Text>
          </Card>
        </Section>
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
  body: { color: colors.text, fontSize: 15, lineHeight: 22 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
});