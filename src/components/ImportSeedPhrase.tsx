import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { validateSeedPhrase } from '../utils/validators';
import PrimaryButton from './primaryButton';
import { ErrorBox, InfoBox } from './ui';

export type ImportSeedPhraseProps = {
    readonly onNext: (seedPhrase: string) => void;
    readonly isLoading?: boolean;
};

const VALID_WORD_COUNTS = new Set([12, 15, 18, 21, 24]);

export default function ImportSeedPhrase({
    onNext,
    isLoading = false,
}: Readonly<ImportSeedPhraseProps>) {
    const [seedPhrase, setSeedPhrase] = useState('');
    const [error, setError] = useState<string>();

    const wordCount = seedPhrase
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;

    const isValidWordCount = VALID_WORD_COUNTS.has(wordCount);

    const handleNext = () => {
        const validation = validateSeedPhrase(seedPhrase);
        if (validation.isValid) {
            setError(undefined);
            onNext(seedPhrase.trim());
        } else {
            setError(validation.error);
        }
    };

    const errors = error ? [error] : [];

    return (
        <ScrollView
            className="flex-1 bg-dark px-5 py-6"
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View className="mb-8">
                <Text className="text-4xl font-bold text-white mb-3">
                    Import Seed Phrase
                </Text>
                <Text className="text-lg text-gray-400">
                    Enter 12, 15, 18, 21, or 24 words from your seed phrase
                </Text>
            </View>

            {/* Info Box */}
            <InfoBox
                title="💡 Important"
                message="The seed phrase is the key to access your wallet. Store it safely and never share it with anyone."
                variant="info"
            />

            {/* Input Field */}
            <View className="mb-6">
                <View className="mb-3 flex-row justify-between items-center">
                    <Text className="text-white font-semibold">Seed Phrase</Text>
                    <Text
                        className={`text-sm ${wordCount > 0 ? 'text-primary' : 'text-gray-500'
                            }`}
                    >
                        {wordCount} / 12-24 words
                    </Text>
                </View>

                <TextInput
                    multiline
                    numberOfLines={6}
                    value={seedPhrase}
                    onChangeText={setSeedPhrase}
                    placeholder="Type or paste your seed phrase here..."
                    placeholderTextColor="#6B7280"
                    className="bg-gray-900 text-white rounded-lg p-4 border border-gray-700 text-base"
                    editable={!isLoading}
                    style={{
                        paddingVertical: 16,
                        fontFamily: 'IBMPlexSans_400Regular',
                    }}
                />
            </View>

            {/* Error Message */}
            <ErrorBox errors={errors} />

            {/* Tips */}
            <View className="bg-gray-900/50 rounded-lg p-4 mb-8">
                <Text className="text-white mb-3 font-semibold">💬 Tips:</Text>
                <Text className="text-sm text-gray-300 mb-2">
                    • Make sure you separate each word with a space
                </Text>
                <Text className="text-sm text-gray-300 mb-2">
                    • You can paste the seed phrase directly
                </Text>
                <Text className="text-sm text-gray-300">
                    • Uppercase/lowercase letters don&apos;t matter
                </Text>
            </View>

            {/* Spacer */}
            <View className="flex-1" />

            {/* Next Button */}
            <PrimaryButton
                title={isLoading ? 'Verifying...' : 'Continue'}
                onPress={handleNext}
                disabled={!seedPhrase.trim() || !isValidWordCount}
                loading={isLoading}
            />

        </ScrollView>
    );
}
