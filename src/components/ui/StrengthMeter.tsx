import React from 'react';
import { Text, View } from 'react-native';

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export type StrengthMeterProps = {
    readonly strength: PasswordStrength;
    readonly label?: string;
};

export default function StrengthMeter({
    strength,
    label = 'Password strength',
}: Readonly<StrengthMeterProps>) {
    const strengthConfig = {
        weak: { color: 'bg-red-500', label: 'Weak', segments: 1 },
        fair: { color: 'bg-yellow-500', label: 'Fair', segments: 2 },
        good: { color: 'bg-blue-500', label: 'Good', segments: 3 },
        strong: { color: 'bg-green-500', label: 'Strong', segments: 4 },
    };

    const config = strengthConfig[strength];

    return (
        <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-400 text-sm">{label}</Text>
                <Text className={`text-sm font-semibold ${config.color.replace('bg-', 'text-')}`}>
                    {config.label}
                </Text>
            </View>
            <View className="flex-row gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                    <View
                        key={`strength-segment-${strength}-${index}`}
                        className={`flex-1 h-2 rounded ${
                            index < config.segments ? config.color : 'bg-gray-700'
                        }`}
                    />
                ))}
            </View>
        </View>
    );
}
