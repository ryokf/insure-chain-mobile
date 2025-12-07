import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import './global.css';

export default function RootLayout() {
  return <View className='bg-[#0f172a] flex-1'>
    <SafeAreaView className="flex-1" edges={['top']}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f172a' } }} />
    </SafeAreaView>
  </View>;
}
