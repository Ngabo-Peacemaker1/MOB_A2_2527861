import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Section from '../components/Section';
import Button from '../components/Button';
import { colors, spacing } from '../theme/colors';
import { STUDENT } from '../data/portfolioData';

export default function AboutScreen() {
  const onOpenGithub = () => {
    Linking.openURL('https://github.com/').catch(() =>
      alert('Could not open link.')
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>About</Text>

        <Section title="App">
          <Card>
            <Row label="App name" value={STUDENT.appName} />
            <Row label="Version" value={STUDENT.version} />
            <Row label="Student" value={STUDENT.fullName} />
            <Row
              label="Registration"
              value={STUDENT.registrationNumber}
            />
            <Row
              label="Verification code"
              value={STUDENT.verificationCode}
              strong
            />
          </Card>
        </Section>

        <Section title="Data use">
          <Card>
            <Text style={styles.body}>
              This app stores your profile information and chosen image
              reference only on this device using AsyncStorage. No data is
              sent to any server. You can reset everything from the Profile
              Editor at any time.
            </Text>
          </Card>
        </Section>

        <Section title="Optional links">
          <Card>
            <Text style={styles.muted}>
              The link below requires an internet connection. All other
              features work fully offline.
            </Text>
            <Button
              label="Open GitHub"
              onPress={onOpenGithub}
              variant="secondary"
              style={{ marginTop: spacing.md }}
            />
          </Card>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, strong && styles.rowStrong]}>
        {value}
      </Text>
    </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { color: colors.textMuted, fontSize: 14 },
  rowValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: spacing.md,
  },
  rowStrong: { color: colors.primary, letterSpacing: 1 },
  body: { color: colors.text, fontSize: 14, lineHeight: 21 },
  muted: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});