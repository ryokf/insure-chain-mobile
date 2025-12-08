import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

export type IconWithLabelProps = ViewProps & Readonly<{
    icon: string;
    label: string;
    description?: string;
    iconColor?: string;
    size?: number;
}>;

/**
 * Reusable icon + label component
 * Digunakan di settings, list items, dll
 */
export default function IconWithLabel({
    icon,
    label,
    description,
    iconColor = '#516ac8',
    size = 20,
    className = '',
    ...rest
}: Readonly<IconWithLabelProps>) {
    return (
        <View className={`flex-row items-center gap-3 flex-1 ${className}`} {...rest}>
            <MaterialCommunityIcons 
                name={icon as any} 
                size={size} 
                color={iconColor} 
            />
            <View className="flex-1">
                <Text className="text-light font-semibold text-sm">
                    {label}
                </Text>
                {description && (
                    <Text className="text-light/50 text-xs mt-1">
                        {description}
                    </Text>
                )}
            </View>
        </View>
    );
}
