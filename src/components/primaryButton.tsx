import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

export type PrimaryButtonProps = Readonly<{
    title: string;
    onPress?: () => void;
    /** Gradient colors from left → right */
    colors?: readonly [string, string];
    /** Tailwind classes for the outer container (Pressable). Default: w-full h-14 rounded-full */
    className?: string;
    /** Tailwind classes for the text */
    textClassName?: string;
    /** Disable interactions */
    disabled?: boolean;
    /** Show spinner instead of text */
    loading?: boolean;
    /** Add soft drop shadow */
    shadow?: boolean;
}>;

export default function PrimaryButton({
    title,
    onPress,
    colors = ['#8B85E3', '#85E4DE'] as const, // purple → aqua
    className,
    textClassName,
    disabled,
    loading,
    shadow = true,
}: Readonly<PrimaryButtonProps>) {
    const isDisabled = disabled || loading;
    const gradientColors: readonly [string, string] = isDisabled ? ['#ffffff44', '#ffffff44'] as const : colors; // dark gray when disabled
    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            className={[
                'w-full h-14 rounded-2xl overflow-hidden ',
                shadow ? 'shadow-lg' : '',
                isDisabled ? 'opacity-20' : '',
                className || '',
            ].join(' ')}
            // Android elevation via inline style (Tailwind doesn't expose it)
            style={{ elevation: shadow ? 6 : 0 }}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text className={[
                        'text-white text-xl font-semibold tracking-tight',
                        textClassName || '',
                    ].join(' ')}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </Pressable>
    );
}