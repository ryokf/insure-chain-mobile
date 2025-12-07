// Use AsyncStorage (sufficient for simple flag)
import AsyncStorage from '@react-native-async-storage/async-storage';
// (Optional) SecureStore if you want encryption
// import * as SecureStore from 'expo-secure-store';

export const ONBOARDING_KEY = 'onboardingVersion';
export const ONBOARDING_VERSION = '1';

export async function getOnboardingVersion() {
  return AsyncStorage.getItem(ONBOARDING_KEY);
}

export async function completeOnboarding() {
  await AsyncStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
}
