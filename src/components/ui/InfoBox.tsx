import React from 'react';
import { Text, View } from 'react-native';

export type InfoBoxProps = {
    readonly title: string;
    readonly message: string;
    readonly icon?: string;
    readonly variant?: 'info' | 'warning' | 'success';
    readonly backgroundColor?: string;
    readonly borderColor?: string;
    readonly titleColor?: string;
    readonly textColor?: string;
};

export default function InfoBox({
    title,
    message,
    icon,
    variant = 'info',
    backgroundColor,
    borderColor,
    titleColor,
    textColor,
}: Readonly<InfoBoxProps>) {
    const variantStyles = {
        info: {
            backgroundColor: backgroundColor ?? 'bg-primary/10',
            borderColor: borderColor ?? 'border-primary/30',
            titleColor: titleColor ?? 'text-primary',
            textColor: textColor ?? 'text-primary/80',
        },
        warning: {
            backgroundColor: backgroundColor ?? 'bg-yellow-500/10',
            borderColor: borderColor ?? 'border-yellow-500/30',
            titleColor: titleColor ?? 'text-yellow-600',
            textColor: textColor ?? 'text-yellow-600/80',
        },
        success: {
            backgroundColor: backgroundColor ?? 'bg-green-500/10',
            borderColor: borderColor ?? 'border-green-500/30',
            titleColor: titleColor ?? 'text-green-600',
            textColor: textColor ?? 'text-green-600/80',
        },
    };

    const styles = variantStyles[variant];

    return (
        <View className={`${styles.backgroundColor} ${styles.borderColor} rounded-xl p-4 mb-6 border`}>
            {icon && <Text className="text-xl mb-2">{icon}</Text>}
            <Text className={`font-semibold text-sm mb-2 ${styles.titleColor}`}>{title}</Text>
            <Text className={`text-sm ${styles.textColor}`}>{message}</Text>
        </View>
    );
}
