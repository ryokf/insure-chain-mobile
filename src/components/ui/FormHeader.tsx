import React from 'react';
import { Text, View } from 'react-native';

export type FormHeaderProps = {
    readonly title: string;
    readonly subtitle?: string;
    readonly step?: number;
    readonly totalSteps?: number;
    readonly titleClassName?: string;
    readonly subtitleClassName?: string;
};

export default function FormHeader({
    title,
    subtitle,
    step,
    totalSteps,
    titleClassName = 'text-3xl font-bold text-white mb-2',
    subtitleClassName = 'text-gray-400 text-sm',
}: Readonly<FormHeaderProps>) {
    const showStepIndicator = step !== undefined && totalSteps !== undefined;

    return (
        <View className="mb-8">
            {showStepIndicator && (
                <Text className="text-primary text-sm font-semibold mb-2">
                    Step {step} of {totalSteps}
                </Text>
            )}
            <Text className={titleClassName}>{title}</Text>
            {subtitle && <Text className={subtitleClassName}>{subtitle}</Text>}
        </View>
    );
}
