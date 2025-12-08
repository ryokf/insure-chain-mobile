import React from 'react';
import { Text, View, ViewProps } from 'react-native';

export type SectionTitleProps = ViewProps & Readonly<{
    title: string;
    subtitle?: string;
}>;

/**
 * Section title component - digunakan untuk heading di setiap section
 * Konsisten styling di seluruh aplikasi
 */
export default function SectionTitle({
    title,
    subtitle,
    className = '',
    ...rest
}: Readonly<SectionTitleProps>) {
    return (
        <View className={`mb-4 ${className}`} {...rest}>
            <Text className="text-light text-lg font-bold">
                {title}
            </Text>
            {subtitle && (
                <Text className="text-light/60 text-sm mt-1">
                    {subtitle}
                </Text>
            )}
        </View>
    );
}
