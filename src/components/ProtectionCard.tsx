import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type ProtectionCardProps = Readonly<{
    title: string;
    description: string;
    price: string;
    priceLabel: string;
    badgeText?: string;
    badgeColor?: 'success' | 'warning';
    onPressButton?: () => void;
}>;

const badgeColorMap = {
    success: 'bg-emerald-500',
    warning: 'bg-yellow-500',
};

export default function ProtectionCard({
    title,
    description,
    price,
    priceLabel,
    badgeText,
    badgeColor = 'warning',
    onPressButton,
}: Readonly<ProtectionCardProps>) {
    return (
        <View className="bg-white/5 rounded-2xl p-5 mb-3 border border-white/20">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                    <Text className="text-light font-semibold">{title}</Text>
                    <Text className="text-light/60 text-sm mt-1">{description}</Text>
                </View>
                {badgeText && (
                    <View className={`${badgeColorMap[badgeColor]} px-3 py-1 rounded-full ml-2`}>
                        <Text className="text-dark text-xs font-semibold">{badgeText}</Text>
                    </View>
                )}
            </View>

            <View className="flex-row justify-between items-center">
                <View className="mb-3">
                    <Text className="text-accent text-2xl font-bold">{price}</Text>
                    <Text className="text-light/50 text-sm">{priceLabel}</Text>
                </View>

                <Pressable className='bg-accent rounded-lg h-8 shadow-none px-2 py-1 min-w-fit justify-center'>
                    <Text className="text-dark text-sm">Beli Sekarang</Text>
                </Pressable>
            </View>
        </View>
    );
}
