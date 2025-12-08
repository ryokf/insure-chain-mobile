import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type AlertBoxProps = Readonly<{
    type: 'warning' | 'danger' | 'success' | 'info';
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}>;

const typeConfig = {
    warning: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        icon: 'alert',
        iconColor: '#fbbf24',
        titleColor: 'text-amber-400',
    },
    danger: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        icon: 'alert-circle',
        iconColor: '#ef4444',
        titleColor: 'text-red-400',
    },
    success: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        icon: 'check-circle',
        iconColor: '#10b981',
        titleColor: 'text-emerald-400',
    },
    info: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        icon: 'information',
        iconColor: '#3b82f6',
        titleColor: 'text-blue-400',
    },
};

/**
 * Alert/Alert box component untuk warning, danger, success, info
 */
export default function AlertBox({
    type,
    title,
    description,
    actionLabel,
    onAction,
    className = '',
}: Readonly<AlertBoxProps>) {
    const config = typeConfig[type];

    return (
        <View 
            className={`${config.bg} ${config.border} border rounded-2xl p-4 ${className}`}
        >
            <View className="flex-row gap-3 mb-3">
                <MaterialCommunityIcons 
                    name={config.icon as any} 
                    size={28} 
                    color={config.iconColor} 
                />
                <View className="flex-1 justify-center">
                    <Text className={`${config.titleColor} font-bold text-base`}>
                        {title}
                    </Text>
                </View>
            </View>

            <Text className="text-light/70 text-sm mb-4">
                {description}
            </Text>

            {actionLabel && (
                <Pressable 
                    onPress={onAction}
                    className="bg-red-500 rounded-lg py-3 items-center"
                >
                    <Text className="text-white font-semibold text-sm">
                        {actionLabel}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}
