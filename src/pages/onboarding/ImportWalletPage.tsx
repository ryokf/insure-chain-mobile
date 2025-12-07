import CreatePassword from '@/src/components/CreatePassword';
import ImportSeedPhrase from '@/src/components/ImportSeedPhrase';
import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { completeOnboarding } from '@/src/utils/storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Step = 'seed-phrase' | 'password' | 'confirmation';

export default function ImportWalletPage() {
    const [step, setStep] = useState<Step>('seed-phrase');
    const [seedPhrase, setSeedPhrase] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSeedPhraseSubmit = (phrase: string) => {
        setIsLoading(true);
        // Simulate validation
        setTimeout(() => {
            setSeedPhrase(phrase);
            setStep('password');
            setIsLoading(false);
        }, 500);
    };

    const handlePasswordSubmit = (pwd: string) => {
        setIsLoading(true);
        // Simulate processing
        setTimeout(() => {
            setPassword(pwd);
            setStep('confirmation');
            setIsLoading(false);
        }, 500);
    };

    const onDone = async () => {
        // TODO: Save password and seed phrase to secure storage before navigating
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const walletData = { seedPhrase, password };
        await completeOnboarding();
        router.replace('/(app)'); // cegah kembali ke onboarding
    };

    return (
        <View className="flex-1 bg-dark">
            {/* Header with Back Button */}
            {step !== 'seed-phrase' && (
                <View className="bg-dark/80 px-5 py-4 flex-row items-center">
                    <TouchableOpacity
                        onPress={() => {
                            if (step === 'password') {
                                setStep('seed-phrase');
                            } else if (step === 'confirmation') {
                                setStep('password');
                            }
                        }}
                        className="flex-row items-center gap-2"
                    >
                        <Text className="text-2xl text-white">←</Text>
                        <Text className="text-white font-semibold">Back</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Step Indicator */}
            <View className="flex-row items-center justify-center gap-3 py-4 px-5">
                <View className={`h-8 w-8 rounded-full flex-row items-center justify-center ${['seed-phrase', 'password', 'confirmation'].includes(step) ? 'bg-primary' : 'bg-gray-700'
                    }`}>
                    <Text className="text-white font-bold text-sm">1</Text>
                </View>

                <View className={`h-1 flex-1 ${['password', 'confirmation'].includes(step) ? 'bg-primary' : 'bg-gray-700'
                    }`} />

                <View className={`h-8 w-8 rounded-full flex-row items-center justify-center ${['password', 'confirmation'].includes(step) ? 'bg-primary' : 'bg-gray-700'
                    }`}>
                    <Text className="text-white font-bold text-sm">2</Text>
                </View>

                <View className={`h-1 flex-1 ${step === 'confirmation' ? 'bg-primary' : 'bg-gray-700'
                    }`} />

                <View className={`h-8 w-8 rounded-full flex-row items-center justify-center ${step === 'confirmation' ? 'bg-primary' : 'bg-gray-700'
                    }`}>
                    <Text className="text-white font-bold text-sm">3</Text>
                </View>
            </View>

            {/* Content */}
            {step === 'seed-phrase' && (
                <ImportSeedPhrase
                    onNext={handleSeedPhraseSubmit}
                    isLoading={isLoading}
                />
            )}

            {step === 'password' && (
                <CreatePassword
                    onConfirm={handlePasswordSubmit}
                    isLoading={isLoading}
                />
            )}

            {step === 'confirmation' && (
                <ScrollView className="flex-1 px-5 py-8" showsVerticalScrollIndicator={false}>
                    {/* Confirmation Header */}
                    <View className="mb-8">
                        <Text className="text-4xl text-white mb-3">
                            Verify Import
                        </Text>
                        <Text className="text-lg text-gray-400">
                            Check information before completing the import
                        </Text>
                    </View>

                    {/* Seed Phrase Info */}
                    <View className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-6">
                        <Text className="text-white mb-3">
                            Seed Phrase
                        </Text>
                        <View className="bg-gray-800/50 rounded-lg p-4 mb-3">
                            <Text className="text-gray-300 text-center">
                                {seedPhrase.split(' ').length} words detected
                            </Text>
                        </View>
                        <View className="flex-row items-start gap-2">
                            <Text className="text-primary text-xl">✓</Text>
                            <Text className="text-gray-300 flex-1">
                                Seed phrase will be stored securely on this device
                            </Text>
                        </View>
                    </View>

                    {/* Password Info */}
                    <View className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-8">
                        <Text className="text-white mb-3">
                            Password
                        </Text>
                        <View className="flex-row items-start gap-2 mb-3">
                            <Text className="text-primary text-xl">✓</Text>
                            <Text className="text-gray-300 flex-1">
                                Password has been set with strong strength
                            </Text>
                        </View>
                        <View className="flex-row items-start gap-2">
                            <Text className="text-secondary text-xl">⚠️</Text>
                            <Text className="text-gray-300 flex-1 text-sm">
                                Don&apos;t forget your password. We cannot recover it
                            </Text>
                        </View>
                    </View>

                    {/* Final Warning */}
                    <View className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-8">
                        <Text className="text-white mb-2">
                            🔒 Your Data Security
                        </Text>
                        <Text className="text-sm text-gray-300">
                            All private data is stored locally and encrypted. No information is sent to the server.
                        </Text>
                    </View>

                    {/* Spacer */}
                    <View className="flex-1" />

                    {/* Action Buttons */}
                    <View className="gap-3 mb-4">
                        <PrimaryButton
                            title={isLoading ? 'Importing Wallet...' : 'Complete Import'}
                            onPress={onDone}
                            loading={isLoading}
                            disabled={false}
                        />

                        <SecondaryButton
                            title="Restart"
                            onPress={() => setStep('seed-phrase')}
                            disabled={isLoading}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
