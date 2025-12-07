import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function CreateWalletOverview() {
    const handleNext = () => {
        router.push('/(onboarding)/(create-wallet)/security-warning');
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
                        Create Your Wallet
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Step 1 of 3
                    </Text>
                </View>

                {/* Content */}
                <View className="flex-1 px-6 py-8 justify-center">
                    {/* Icon Circle */}
                    <View className="items-center mb-8">
                        <View className="w-24 h-24 rounded-full bg-gradient-to-b from-blue-500/30 to-cyan-500/20 items-center justify-center mb-6">
                            <Ionicons name="wallet" size={48} color="#06B6D4" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text className="text-white text-3xl font-semibold text-center mb-6">
                        Secure Your Wallet
                    </Text>

                    {/* Description */}
                    <View className="mb-8">
                        <View className="flex-row items-start gap-4">
                            {/* <View className="mt-1">
                                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                            </View> */}
                            <Text className="flex-1 text-gray-300 text-xl leading-relaxed">
                                Don&apos;t risk losing your funds. Protect your wallet by saving your Seed phrase in a place
                                you trust.
                            </Text>
                        </View>

                        <View className="flex-row items-start gap-4 my-4">
                            {/* <View className="mt-1">
                                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                            </View> */}
                            <Text className="flex-1 text-gray-300 text-xl leading-relaxed">
                                It&apos;s the only way to recover your wallet if you get locked out of the app or get a new device.
                            </Text>
                        </View>

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
                    title="Next"
                    onPress={handleNext}
                />
            </View>
        </View>
    );
}
