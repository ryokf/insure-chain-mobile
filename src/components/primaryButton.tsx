import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

export type PrimaryButtonProps = Readonly<{
    title: string;
    onPress?: () => void;
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
    className,
    textClassName,
    disabled,
    loading,
    shadow = true,
}: Readonly<PrimaryButtonProps>) {
    const isDisabled = disabled || loading;
    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            className={[
                'rounded-2xl overflow-hidden bg-accent w-fit h-14',
                shadow ? 'shadow-lg' : '',
                isDisabled ? 'opacity-50' : '',
                className || '',
            ].join(' ')}
            // Android elevation via inline style (Tailwind doesn't expose it)
            style={{ elevation: shadow ? 6 : 0 }}
        >
            <Text className={[
                'flex-1 items-center justify-center text-dark text-xl font-semibold tracking-tight',
                textClassName || '',
            ].join(' ')} style={{ textAlignVertical: 'center', textAlign: 'center', lineHeight: 56 }}>
                {loading ? (
                    <ActivityIndicator size="small" color="#0f1939" />
                ) : (
                    title
                )}
            </Text>
        </Pressable>
    );
}