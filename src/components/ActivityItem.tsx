import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export type ActivityItemProps = Readonly<{
    icon?: string;
    title: string;
    subtitle: string;
    amount: number;
    isPositive?: boolean;
}>;

export default function ActivityItem({
    icon = 'account-circle',
    title,
    subtitle,
    amount,
    isPositive = true,
}: Readonly<ActivityItemProps>) {
    return (
        <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-secondary/10 items-center justify-center">
                    <MaterialCommunityIcons
                        name={icon as any}
                        size={24}
                        color="#516ac8"
                    />
                </View>
                <View>
                    <Text className="text-light font-medium">{title}</Text>
                    <Text className="text-light/50 text-xs">{subtitle}</Text>
                </View>
            </View>
            <Text className={`font-bold text-base ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositive ? '+' : '-'}{amount} LSK
            </Text>
        </View>
    );
}
