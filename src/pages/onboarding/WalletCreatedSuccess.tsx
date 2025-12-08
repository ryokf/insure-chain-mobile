import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { completeOnboarding } from '@/src/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';

export default function WalletCreatedSuccess() {
    const [scaleAnim] = useState(new Animated.Value(0));
    const [opacityAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Animate the success icon
        Animated.sequence([
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [scaleAnim, opacityAnim]);

    const onDone = async () => {
        await completeOnboarding();
        router.replace('/(app)'); // cegah kembali ke onboarding
    };

    const onRequestCredential = () => {
        router.push('/(onboarding)/request-credential/' as any);
    };

    return (
        <View className="flex-1 bg-dark items-center justify-center px-6">
            {/* Success Checkmark */}
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                    marginBottom: 32,
                }}
            >
                <View className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 items-center justify-center">
                    <Ionicons name="checkmark" size={56} color="#10B981" />
                </View>
            </Animated.View>

            {/* Success Messages */}
            <View className="items-center mb-12">
                <Text className="text-white text-4xl font-bold text-center mb-4">
                    Wallet Created!
                </Text>
                <Text className="text-gray-400 text-base text-center leading-6">
                    Your wallet has been successfully created and secured with your password.
                </Text>
            </View>

            {/* Success Details */}
            <View className="w-full bg-dark/50 border border-dark/80 rounded-2xl p-6 mb-12">
                <SuccessItem
                    icon="checkmark-circle"
                    title="Seed Phrase Verified"
                    description="Your recovery phrase has been confirmed"
                />
                <View className="h-px bg-slate-700 my-4" />
                <SuccessItem
                    icon="lock-closed"
                    title="Password Protected"
                    description="Your wallet is secured with your password"
                />
                <View className="h-px bg-slate-700 my-4" />
                <SuccessItem
                    icon="shield-checkmark"
                    title="Ready to Use"
                    description="Your wallet is now ready for transactions"
                />
            </View>

            {/* Tips Section */}
            <View className="w-full bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-12">
                <View className="flex-row gap-3 mb-3">
                    <Ionicons name="information-circle" size={20} color="#3B82F6" />
                    <Text className="text-blue-400 font-semibold flex-1">
                        Security Tips
                    </Text>
                </View>
                <Text className="text-blue-300 text-xs leading-5">
                    • Keep your seed phrase safe and never share it with anyone{'\n'}
                    • Never reveal your password to anyone{'\n'}
                    • Consider enabling biometric authentication for faster access{'\n'}
                    • Regularly back up your wallet
                </Text>
            </View>

            {/* Spacer */}
            <View className="flex-1" />

            {/* Action Buttons */}
            <View className="w-full pb-10">
                <PrimaryButton
                    title="Request Your First Policy"
                    onPress={onRequestCredential}
                />
                <View className="mt-3">
                    <SecondaryButton
                        title="Skip for Now"
                        onPress={onDone}
                    />
                </View>
            </View>
        </View>
    );
}

function SuccessItem({
    icon,
    title,
    description,
}: Readonly<{
    icon: string;
    title: string;
    description: string;
}>) {

    return (
        <View className="flex-row gap-3">
            <Ionicons name={icon as any} size={20} color="#10B981" />
            <View className="flex-1">
                <Text className="text-white font-semibold text-sm mb-1">
                    {title}
                </Text>
                <Text className="text-gray-400 text-xs">
                    {description}
                </Text>
            </View>
        </View>
    );
}
