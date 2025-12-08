import React from 'react';
import { View, ViewProps } from 'react-native';

export type SectionLayoutProps = ViewProps & Readonly<{
    children: React.ReactNode;
    padding?: number;
    marginTop?: number;
}>;

/**
 * Section wrapper untuk area konten
 * Menangani padding dan spacing konsisten
 */
export default function SectionLayout({
    children,
    padding = 4,
    marginTop = 6,
    className = '',
    ...rest
}: Readonly<SectionLayoutProps>) {
    return (
        <View 
            className={`px-${padding} mt-${marginTop} ${className}`}
            {...rest}
        >
            {children}
        </View>
    );
}
