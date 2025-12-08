import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';

export type PageLayoutProps = ViewProps & Readonly<{
    children: React.ReactNode;
    paddingBottom?: number;
}>;

/**
 * Main page layout wrapper yang handle scroll dan padding
 * Gunakan di setiap halaman untuk konsistensi
 */
export default function PageLayout({
    children,
    paddingBottom = 80,
    ...rest
}: Readonly<PageLayoutProps>) {
    return (
        <View className="flex-1 bg-dark" {...rest}>
            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingBottom }}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </View>
    );
}
