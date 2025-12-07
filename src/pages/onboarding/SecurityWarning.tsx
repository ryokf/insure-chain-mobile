import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function SecurityWarning() {
    const [secondsLeft, setSecondsLeft] = React.useState(10);

    React.useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setTimeout(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const waiting = secondsLeft <= 0;

    const handleNext = () => {
        router.push('/(onboarding)/(create-wallet)/view-seed-phrase');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header */}
                <View className="pt-4 px-6">
                    <Text className="text-white text-3xl font-bold mb-2">
                        Security Warning
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Step 2 of 3
                    </Text>
                </View>

                {/* Content */}
                <View className="flex-1 px-6 py-4 justify-center">
                    {/* Warning Icon */}
                    <View className="items-center">
                        <View className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-500/30 to-orange-500/20 items-center justify-center mb-6">
                            <Ionicons name="warning" size={48} color="#F59E0B" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text className="text-white text-2xl font-semibold text-center mb-6">
                        Protect Your Recovery Phrase
                    </Text>

                    {/* Warning Content */}
                    <View className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-8">
                        <Text className="text-orange-300 font-semibold text-base mb-3">
                            ⚠️ Important Security Tips:
                        </Text>
                        <Text className="text-orange-200 text-sm leading-6 mb-3">
                            • <Text className="font-semibold">Never share</Text> your recovery phrase with anyone
                        </Text>
                        <Text className="text-orange-200 text-sm leading-6 mb-3">
                            • <Text className="font-semibold">Write it down</Text> on paper and store it in a safe place
                        </Text>
                        <Text className="text-orange-200 text-sm leading-6 mb-3">
                            • <Text className="font-semibold">Do not screenshot</Text> or save it digitally
                        </Text>
                        <Text className="text-orange-200 text-sm leading-6">
                            • <Text className="font-semibold">Anyone with your phrase</Text> can access your wallet
                        </Text>
                    </View>

                    {/* Risk Assessment */}
                    <Text className="text-gray-300 text-base font-semibold mb-4">
                        If you lose your recovery phrase:
                    </Text>
                    <View className="space-y-3 mb-8">
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="close-circle" size={20} color="#EF4444" />
                            <Text className="flex-1 text-gray-300 text-sm">
                                You will lose access to your wallet forever
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="close-circle" size={20} color="#EF4444" />
                            <Text className="flex-1 text-gray-300 text-sm">
                                No one can help recover your account
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="close-circle" size={20} color="#EF4444" />
                            <Text className="flex-1 text-gray-300 text-sm">
                                Your funds and identity proofs will be inaccessible
                            </Text>
                        </View>
                    </View>

                    {/* Confirmation Text */}
                    <View className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                        <Text className="text-primary/90 text-sm text-center">
                            On the next screen, you will see your 12-word recovery phrase. Write it down in order and store it safely before proceeding.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Button Container */}
            <View className="px-6 pb-10 gap-3">
                <SecondaryButton
                    title="Back"
                    onPress={handleBack}
                />
            <PrimaryButton
                disabled={!waiting}
                title={waiting ? "I Understand, Show My Phrase" : `Please wait ${secondsLeft}s`}
                onPress={handleNext}
            />
            </View>
        </View>
    );
}
