import React from 'react';
import { Text, View, ViewProps } from 'react-native';

export type ProgressBarProps = ViewProps & Readonly<{
    value: number;
    max?: number;
    label?: string;
    showPercentage?: boolean;
    color?: string;
}>;

/**
 * Progress bar component untuk klaim, coverage, dll
 */
export default function ProgressBar({
    value,
    max = 100,
    label,
    showPercentage = true,
    color = '#e3af64',
    className = '',
    ...rest
}: Readonly<ProgressBarProps>) {
    const percentage = (value / max) * 100;
    
    return (
        <View className={`${className}`} {...rest}>
            {label && (
                <View className="flex-row justify-between mb-2">
                    <Text className="text-light/60 text-xs">{label}</Text>
                    {showPercentage && (
                        <Text className="text-light text-xs font-semibold">
                            {Math.round(percentage)}%
                        </Text>
                    )}
                </View>
            )}
            <View className="w-full h-2 bg-dark/50 rounded-full overflow-hidden">
                <View 
                    className="h-full rounded-full"
                    style={{ 
                        width: `${percentage}%`,
                        backgroundColor: color 
                    }} 
                />
            </View>
        </View>
    );
}
