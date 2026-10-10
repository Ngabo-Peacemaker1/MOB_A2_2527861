import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Section from '../components/Section';
import SkillBar from '../components/SkillBar';
import { colors, spacing } from '../theme/colors';
import { EDUCATION, SKILLS } from '../data/portfolioData';

export default function SkillsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Skills & Education</Text>

        <Section title="Skills">
          <Card>
            {SKILLS.length === 0 ? (
              <Text style={styles.empty}>No skills added yet.</Text>
            ) : (
              SKILLS.map((s) => (
                <SkillBar key={s.id} name={s.name} level={s.level} />
              ))
            )}
          </Card>
        </Section>

        <Section title="Education & training">
          {EDUCATION.map((e) => (
            <Card key={e.id}>
              <View style={styles.timelineRow}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineBody}>
                  <Text style={styles.itemTitle}>{e.title}</Text>
                  <Text style={styles.itemSub}>{e.institution}</Text>
                  <Text style={styles.itemPeriod}>{e.period}</Text>
                </View>
              </View>
            </Card>
          ))}
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
  empty: { color: colors.textMuted, fontSize: 14 },
  timelineRow: { flexDirection: 'row' },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.md,
  },
  timelineBody: { flex: 1 },
  itemTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  itemSub: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  itemPeriod: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.3,
  },
});