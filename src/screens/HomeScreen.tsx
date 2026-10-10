import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import Chip from '../components/Chip';
import Section from '../components/Section';
import { colors, radius, spacing } from '../theme/colors';
import { loadProfile } from '../storage/profileStorage';
import { DEFAULT_PROFILE, STUDENT } from '../data/portfolioData';
import { Profile } from '../types';

export default function HomeScreen() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProfile().then((p) => {
        if (active) setProfile(p);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          My name is {profile.fullName || STUDENT.fullName}.
        </Text>

        <View style={styles.heroRow}>
          <Avatar uri={profile.imageUri} name={profile.fullName} size={96} />
          <View style={styles.heroText}>
            <Text style={styles.headline}>{profile.headline}</Text>
            <View style={styles.statusRow}>
              <View style={styles.dot} />
              <Text style={styles.status}>{profile.availability}</Text>
            </View>
          </View>
        </View>

        <Section title="About me">
          <Card>
            <Text style={styles.bio}>{profile.bio}</Text>
          </Card>
        </Section>

        <Section title="Primary skill">
          <Chip label={profile.primarySkill} />
        </Section>

        <Section title="Verification">
          <Card style={styles.verifyCard}>
            <Text style={styles.verifyLabel}>Identity code</Text>
            <Text style={styles.verifyCode}>{STUDENT.verificationCode}</Text>
            <Text style={styles.verifyHint}>
              Registration {STUDENT.registrationNumber}
            </Text>
          </Card>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  greeting: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.lg,
    letterSpacing: 0.2,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroText: { flex: 1, marginLeft: spacing.lg },
  headline: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  status: { color: colors.textMuted, fontSize: 13 },
  bio: { color: colors.text, fontSize: 15, lineHeight: 22 },
  verifyCard: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  verifyLabel: {
    color: colors.textMuted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  verifyCode: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  verifyHint: { color: colors.textDim, fontSize: 12, marginTop: spacing.xs },
});