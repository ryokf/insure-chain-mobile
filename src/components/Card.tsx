import React from 'react';
import { View, ViewProps } from 'react-native';

export type CardProps = ViewProps & Readonly<{
    children: React.ReactNode;
    variant?: 'default' | 'outlined' | 'filled';
    padding?: number;
    margin?: number;
}>;

const variantStyles = {
    default: 'bg-dark/50 border border-secondary/20',
    outlined: 'border-2 border-secondary/30',
    filled: 'bg-secondary/10 border border-secondary/30',
};

/**
 * Reusable card component untuk consistent styling
 * Digunakan untuk semua card di aplikasi
 */
export default function Card({
    children,
    variant = 'default',
    padding = 4,
    margin = 3,
    className = '',
    ...rest
}: Readonly<CardProps>) {
    return (
        <View 
            className={`rounded-2xl p-${padding} mb-${margin} ${variantStyles[variant]} ${className}`}
            {...rest}
        >
            {children}
        </View>
    );
}
