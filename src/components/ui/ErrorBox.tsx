import React from 'react';
import { Text, View } from 'react-native';

export type ErrorBoxProps = {
    readonly errors: string[];
    readonly icon?: string;
    readonly backgroundColor?: string;
    readonly borderColor?: string;
    readonly textColor?: string;
};

export default function ErrorBox({
    errors,
    icon = '⚠️',
    backgroundColor = 'bg-red-500/10',
    borderColor = 'border-red-500/30',
    textColor = 'text-red-400',
}: Readonly<ErrorBoxProps>) {
    if (errors.length === 0) return null;

    return (
        <View className={`${backgroundColor} ${borderColor} rounded-lg p-4 mb-6 border`}>
            {errors.map((error) => (
                <Text key={`error-${error}`} className={`${textColor} text-sm mb-1`}>
                    • {error}
                </Text>
            ))}
        </View>
    );
}
