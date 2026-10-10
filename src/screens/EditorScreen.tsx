import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Section from '../components/Section';
import Chip from '../components/Chip';
import { colors, radius, spacing } from '../theme/colors';
import { loadProfile, resetProfile, saveProfile } from '../storage/profileStorage';
import { DEFAULT_PROFILE } from '../data/portfolioData';
import { Availability, Profile } from '../types';

const AVAILABILITIES: Availability[] = [
  'Open to internship',
  'Open to freelance',
  'Open to full-time',
  'Not available',
];

interface Errors {
  headline?: string | null;
  bio?: string | null;
  primarySkill?: string | null;
}

export default function EditorScreen() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

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

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (p: Profile): Errors => {
    const next: Errors = {};
    const headline = p.headline.trim();
    const bio = p.bio.trim();
    const skill = p.primarySkill.trim();

    if (headline.length < 4) {
      next.headline = 'Headline must be at least 4 characters.';
    } else if (headline.length > 60) {
      next.headline = 'Headline must be 60 characters or fewer.';
    }

    if (bio.length < 20) {
      next.bio = 'Bio must be at least 20 characters.';
    } else if (bio.length > 400) {
      next.bio = 'Bio must be 400 characters or fewer.';
    }

    if (skill.length < 2) {
      next.primarySkill = 'Primary skill must be at least 2 characters.';
    }

    return next;
  };

  const onSave = async () => {
    const v = validate(profile);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setSaving(true);
      await saveProfile(profile);
      Alert.alert('Saved', 'Your profile has been saved locally.');
    } catch {
      Alert.alert('Error', 'Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    Alert.alert('Reset profile', 'Discard your changes and restore defaults?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          const p = await resetProfile();
          setProfile(p);
          setErrors({});
        },
      },
    ]);
  };

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        'Permission needed',
        'We need access to your photos to set a profile image.'
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;
    update('imageUri', result.assets[0].uri);
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        'Permission needed',
        'We need camera access to take a profile image.'
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;
    update('imageUri', result.assets[0].uri);
  };

  const removeImage = () => update('imageUri', null);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Edit Profile</Text>

        <Section title="Profile image">
          <Card>
            <View style={styles.imageWrap}>
              {profile.imageUri ? (
                <Image
                  source={{ uri: profile.imageUri }}
                  style={styles.image}
                />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                  <Text style={styles.placeholderText}>No image</Text>
                </View>
              )}
            </View>
            <View style={styles.imageActions}>
              <Button
                label="Take photo"
                onPress={takePhoto}
                variant="secondary"
                style={styles.imageBtn}
              />
              <Button
                label="Choose from gallery"
                onPress={pickFromGallery}
                variant="secondary"
                style={styles.imageBtn}
              />
            </View>
            {profile.imageUri ? (
              <Button
                label="Remove image"
                onPress={removeImage}
                variant="danger"
                style={{ marginTop: spacing.sm }}
              />
            ) : null}
          </Card>
        </Section>

        <Section title="Headline">
          <Input
            label="Professional headline"
            value={profile.headline}
            onChangeText={(v) => update('headline', v)}
            placeholder="e.g. Junior Mobile Developer"
            error={errors.headline}
            maxLength={80}
          />
        </Section>

        <Section title="Biography">
          <Input
            label="Short biography"
            value={profile.bio}
            onChangeText={(v) => update('bio', v)}
            placeholder="Tell recruiters about yourself"
            error={errors.bio}
            multiline
            maxLength={420}
          />
        </Section>

        <Section title="Primary skill">
          <Input
            label="Primary skill"
            value={profile.primarySkill}
            onChangeText={(v) => update('primarySkill', v)}
            placeholder="e.g. React Native"
            error={errors.primarySkill}
            maxLength={40}
          />
        </Section>

        <Section title="Availability">
          <View style={styles.chipRow}>
            {AVAILABILITIES.map((a) => (
              <Text
                key={a}
                onPress={() => update('availability', a)}
                style={styles.chipHit}
              >
                <Chip label={a === profile.availability ? `● ${a}` : a} />
              </Text>
            ))}
          </View>
        </Section>

        <Button
          label="Save profile"
          onPress={onSave}
          loading={saving}
          style={{ marginTop: spacing.md }}
        />
        <Button
          label="Reset to defaults"
          onPress={onReset}
          variant="ghost"
          style={{ marginTop: spacing.sm }}
        />
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
  imageWrap: { alignItems: 'center', marginBottom: spacing.md },
  image: {
    width: 120,
    height: 120,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  imagePlaceholder: { alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: colors.textDim, fontSize: 13 },
  imageActions: { flexDirection: 'row', gap: spacing.sm },
  imageBtn: { flex: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chipHit: { marginRight: spacing.sm, marginBottom: spacing.sm },
});