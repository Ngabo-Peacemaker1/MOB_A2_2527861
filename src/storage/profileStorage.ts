import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';
import { DEFAULT_PROFILE } from '../data/portfolioData';

const PROFILE_KEY = '@mnportfolio/profile';

export async function loadProfile(): Promise<Profile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (error) {
    console.warn('loadProfile failed:', error);
    return DEFAULT_PROFILE;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.warn('saveProfile failed:', error);
    throw error;
  }
}

export async function resetProfile(): Promise<Profile> {
  try {
    await AsyncStorage.removeItem(PROFILE_KEY);
    return DEFAULT_PROFILE;
  } catch (error) {
    console.warn('resetProfile failed:', error);
    return DEFAULT_PROFILE;
  }
}