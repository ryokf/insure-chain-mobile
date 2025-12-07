import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

// Dummy seed phrase
const DUMMY_SEED_PHRASE = [
    'abandon', 'ability', 'able', 'about', 'above', 'abroad',
    'absent', 'absorb', 'abstract', 'absurd', 'access', 'accident'
];

type SeedPhraseGridProps = Readonly<{
    words: string[];
    isBlurred: boolean;
}>;

function SeedPhraseGrid({ words, isBlurred }: SeedPhraseGridProps) {
    const wordItems = words.map((word, index) => ({
        id: `word-${index}`,
        word,
        index,
    }));

    return (
        <FlatList
            data={wordItems}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <View className="w-[30%] bg-slate-800/50 border border-slate-700 rounded-lg p-3 items-center justify-center">
                    {isBlurred ? (
                        <View className="items-center justify-center">
                            <View className="w-12 h-6 bg-slate-700 rounded opacity-60" />
                        </View>
                    ) : (
                        <>
                            <Text className="text-gray-400 text-xs mb-1">
                                #{item.index + 1}
                            </Text>
                            <Text className="text-white font-semibold text-base">
                                {item.word}
                            </Text>
                        </>
                    )}
                </View>
            )}
        />
    );
}

export default function ViewSeedPhrase() {
    const [isBlurred, setIsBlurred] = useState(true);

    const handleReveal = () => {
        setIsBlurred(false);
    };

    const handleNext = () => {
        // Navigate to confirm seed phrase page
        router.push('/(onboarding)/(create-wallet)/confirm-seed-phrase');
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
                        Your Recovery Phrase
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Step 3 of 3
                    </Text>
                </View>

                {/* Content */}
                <View className="flex-1 px-6 py-8">
                    {/* Info Box */}
                    <View className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
                        <View className="flex-row gap-3">
                            <Ionicons name="information-circle" size={20} color="#60A5FA" />
                            <Text className="flex-1 text-blue-300 text-sm">
                                Write down these 12 words in order. Keep them safe and never share with anyone.
                            </Text>
                        </View>
                    </View>

                    {/* Seed Phrase Grid */}
                    <View className="mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                        <SeedPhraseGrid words={DUMMY_SEED_PHRASE} isBlurred={isBlurred} />
                    </View>

                    {/* Reveal Button */}
                    {isBlurred && (
                        <View className="mb-6">
                            <Pressable
                                onPress={handleReveal}
                                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg py-4 flex-row items-center justify-center gap-2"
                            >
                                <Ionicons name="eye" size={20} color="#06B6D4" />
                                <Text className="text-cyan-400 font-semibold text-base">
                                    Tap to Reveal
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Hidden Message */}
                    {isBlurred && (
                        <View className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
                            <Text className="text-gray-400 text-center text-sm">
                                Make sure no one is watching your screen before revealing your phrase.
                            </Text>
                        </View>
                    )}

                    {/* Copy Warning */}
                    {!isBlurred && (
                        <View className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                            <View className="flex-row gap-2 mb-2">
                                <Ionicons name="warning" size={18} color="#FBBF24" />
                                <Text className="flex-1 text-orange-300 font-semibold text-sm">
                                    Safety Reminder
                                </Text>
                            </View>
                            <Text className="text-orange-200 text-xs leading-5">
                                • Use pen and paper to write these words down{"\n"}
                                • Verify each word matches exactly{"\n"}
                                • Store in a secure location{"\n"}
                                • Never save digitally
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Button Container */}
            <View className="px-6 pb-10 gap-3">
                {isBlurred ? (
                    <>
                        <PrimaryButton 
                            title="I Have Written It Down" 
                            disabled={true}
                            onPress={handleNext}
                        />
                        <SecondaryButton 
                            title="Back" 
                            onPress={handleBack}
                        />
                    </>
                ) : (
                    <>
                        <PrimaryButton 
                            title="I Have Written It Down" 
                            onPress={handleNext}
                        />
                        <SecondaryButton 
                            title="Back" 
                            onPress={handleBack}
                        />
                    </>
                )}
            </View>
        </View>
    );
}
