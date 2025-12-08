import React from 'react';
import { View, ViewProps } from 'react-native';

export type SettingItemProps = ViewProps & Readonly<{
    children: React.ReactNode;
    showDivider?: boolean;
    isLast?: boolean;
}>;

/**
 * Wrapper untuk setting item di SettingsPage
 * Handle divider dan spacing
 */
export default function SettingItem({
    children,
    showDivider = true,
    isLast = false,
    className = '',
    ...rest
}: Readonly<SettingItemProps>) {
    return (
        <View {...rest}>
            <View className={`flex-row items-center justify-between px-4 py-4 ${className}`}>
                {children}
            </View>
            {showDivider && !isLast && (
                <View className="border-t border-secondary/10" />
            )}
        </View>
    );
}
