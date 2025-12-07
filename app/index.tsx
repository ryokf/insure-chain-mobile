import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getOnboardingVersion, ONBOARDING_VERSION } from '../src/utils/storage';

export default function Index() {
  const [dest, setDest] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await getOnboardingVersion();
      setDest(stored === ONBOARDING_VERSION ? '/(app)' : '/(onboarding)');
    })();
  }, []);

  if (!dest) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={dest as any} />;
}
