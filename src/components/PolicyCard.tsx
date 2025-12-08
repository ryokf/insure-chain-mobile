import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from './primaryButton';

export type PolicyCardProps = Readonly<{
    icon?: string;
    title: string;
    policyNumber: string;
    timeRemaining: string;
    onMonitoring?: () => void;
}>;

export default function PolicyCard({
    icon = 'shield',
    title,
    policyNumber,
    timeRemaining,
    onMonitoring,
}: Readonly<PolicyCardProps>) {
    return (
        <View className="bg-secondary/10 border border-secondary/30 rounded-2xl p-4 mb-4">
            <View className="flex-row items-start gap-3 mb-3">
                <View className="w-10 h-10 rounded-lg bg-secondary/20 items-center justify-center">
                    <MaterialCommunityIcons
                        name={icon as any}
                        size={20}
                        color="#516ac8"
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-light font-semibold text-base">{title}</Text>
                    <Text className="text-light/50 text-xs mt-1">Policy ID:{policyNumber}</Text>
                </View>
            </View>

            <View className="flex-row items-center gap-2 mb-4">
                <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color="#f8f7f5"
                />
                <Text className="text-light text-sm">{timeRemaining}</Text>
            </View>

            <PrimaryButton
                title="Lihat Monitoring"
                onPress={onMonitoring}
                className="bg-accent rounded-lg h-10 shadow-none"
                textClassName="text-dark font-semibold"
            />
        </View>
    );
}
