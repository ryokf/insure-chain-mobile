import React from 'react';
import { View } from 'react-native';

export type DividerProps = Readonly<{
    variant?: 'thin' | 'thick';
    margin?: number;
}>;

/**
 * Divider component - garis pemisah antar item
 */
export default function Divider({
    variant = 'thin',
    margin = 0,
}: Readonly<DividerProps>) {
    const height = variant === 'thin' ? 'h-px' : 'h-1';
    const marginClass = margin > 0 ? `my-${margin}` : '';
    
    return (
        <View className={`border-t border-secondary/10 ${marginClass}`} />
    );
}
