import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

export type SecondaryButtonProps = Readonly<{
    title: string;
    onPress?: () => void;
    /** Extra Tailwind classes for the outer container */
    className?: string;
    /** Extra Tailwind classes for the text */
    textClassName?: string;
    disabled?: boolean;
    loading?: boolean;
}>;

export default function SecondaryButton({
    title,
    onPress,
    className,
    textClassName,
    disabled,
    loading,
}: Readonly<SecondaryButtonProps>) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
            className={[
                // base shape & size (pill)
                'w-full h-14 rounded-2xl overflow-hidden',
                // dark surface with subtle border like the mock
                'bg-white/10 border border-white/10',
                // center content
                'items-center justify-center',
                // dim when disabled/loading
                (disabled || loading) ? 'opacity-60' : '',
                className || '',
            ].join(' ')}
            // keep elevation low; this is a flat secondary button
            style={{ elevation: 0 }}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#D1D5DB" />
            ) : (
                <Text
                    className={[
                        // light gray text as in the screenshot
                        'text-gray-300 text-lg font-semibold',
                        textClassName || '',
                    ].join(' ')}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
}