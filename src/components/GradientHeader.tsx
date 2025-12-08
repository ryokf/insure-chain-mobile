import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ViewProps } from 'react-native';

export type GradientHeaderProps = ViewProps & Readonly<{
    children: React.ReactNode;
    colors?: readonly [string, string, ...string[]];
}>;

export default function GradientHeader({
    children,
    colors = ['#0f1939', '#26428b'] as const,
    ...rest
}: Readonly<GradientHeaderProps>) {
    return (
        <View className='rounded-b-3xl overflow-hidden'>
            <LinearGradient
                colors={colors as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className='rounded-b-3xl overflow-hidden'
            >
                <View {...rest}>
                    {children}
                </View>
            </LinearGradient>
        </View>
    );
}
