import React from 'react';
import { View, ViewProps } from 'react-native';
import GradientHeader from './GradientHeader';

export type HeaderLayoutProps = ViewProps & Readonly<{
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}>;

/**
 * Header wrapper dengan gradient background
 * Props: title, subtitle, atau children untuk custom content
 */
export default function HeaderLayout({
    children,
    title,
    subtitle,
    className = '',
    ...rest
}: Readonly<HeaderLayoutProps>) {
    return (
        <GradientHeader 
            className={`px-4 pt-6 pb-8 rounded-b-3xl overflow-hidden ${className}`}
            {...rest}
        >
            {children ? (
                children
            ) : (
                <View>
                    {title && (
                        <View>
                            {typeof title === 'string' ? (
                                <>
                                    {/* Header akan berisi title dan subtitle */}
                                </>
                            ) : null}
                        </View>
                    )}
                </View>
            )}
        </GradientHeader>
    );
}
