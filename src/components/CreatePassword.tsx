import BiometricSwitch from '@/src/components/BiometricSwitch';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
    getPasswordStrength,
    validatePassword,
    validatePasswordMatch,
} from '../utils/validators';
import PrimaryButton from './primaryButton';
import { ErrorBox, PasswordInput, StrengthMeter } from './ui';

export type CreatePasswordProps = {
    readonly onConfirm: (password: string) => void;
    readonly isLoading?: boolean;
};

const getRequirementsMet = (password: string) => ({
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
});

export default function CreatePassword({
    onConfirm,
    isLoading = false,
}: Readonly<CreatePasswordProps>) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const strength = getPasswordStrength(password);
    const requirements = getRequirementsMet(password);
    const isValid =
        password.length >= 8 &&
        password === confirmPassword &&
        errors.length === 0;

    const handleConfirm = () => {
        const newErrors: string[] = [];

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            newErrors.push(...passwordValidation.errors);
        }

        const matchValidation = validatePasswordMatch(password, confirmPassword);
        if (!matchValidation.isValid && matchValidation.error) {
            newErrors.push(matchValidation.error);
        }

        setErrors(newErrors);
        if (newErrors.length === 0) {
            onConfirm(password);
        }
    };

    return (
        <ScrollView
            className="flex-1 bg-dark px-5 py-6"
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View className="mb-8">
                <Text className="text-4xl font-bold text-white mb-3">
                    Create Password
                </Text>
                <Text className="text-lg text-gray-400">
                    Password will be used to protect your wallet
                </Text>
            </View>

            {/* Security Info */}
            <View className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
                <Text className="text-white mb-2">🔒 Security</Text>
                <Text className="text-sm text-gray-300">
                    Use a strong password with uppercase, lowercase, numbers, and special
                    characters.
                </Text>
            </View>

            {/* Password Input */}
            <PasswordInput
                value={password}
                onChangeText={setPassword}
                label="Password"
                placeholder="Enter password..."
                testID="password-input"
                containerClassName="mb-4"
            />

            {/* Strength Meter */}
            {password.length > 0 && <StrengthMeter strength={strength} />}

            {/* Confirm Password Input */}
            <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                label="Confirm Password"
                placeholder="Repeat password..."
                testID="confirm-password-input"
                containerClassName="mb-4"
            />

            {/* Match Indicator */}
            {confirmPassword.length > 0 && (
                <View className="mb-6">
                    <Text
                        className={`text-sm ${
                            password === confirmPassword
                                ? 'text-green-500'
                                : 'text-red-500'
                        }`}
                    >
                        {password === confirmPassword
                            ? '✓ Passwords match'
                            : '✗ Passwords do not match'}
                    </Text>
                </View>
            )}

            {/* Error Messages */}
            <ErrorBox errors={errors} />

            <View className='mt-4'>
                <BiometricSwitch></BiometricSwitch>
            </View>

            {/* Requirements Checklist */}
            {password.length > 0 && (
                <View className="bg-gray-900/50 rounded-lg px-2 mt-2">
                    <Text className="text-white mb-3">✓ Password Requirements:</Text>
                    <RequirementItem
                        met={requirements.minLength}
                        text="Minimum 8 characters"
                    />
                    <RequirementItem
                        met={requirements.uppercase}
                        text="Uppercase letter (A-Z)"
                    />
                    <RequirementItem
                        met={requirements.lowercase}
                        text="Lowercase letter (a-z)"
                    />
                    <RequirementItem met={requirements.number} text="Number (0-9)" />
                </View>
            )}


            {/* Spacer */}
            <View className="flex-1 my-2" />

            {/* Confirm Button */}
            <PrimaryButton
                title={isLoading ? 'Processing...' : 'Set Password'}
                onPress={handleConfirm}
                disabled={!isValid}
                loading={isLoading}
            />
            <View className="flex-1 mb-10" />
        </ScrollView>
    );
}

function RequirementItem({
    met,
    text,
}: Readonly<{
    met: boolean;
    text: string;
}>) {
    return (
        <Text
            className={`text-sm mb-2 ${
                met ? 'text-green-400' : 'text-gray-400'
            }`}
        >
            {met ? '✓' : '○'} {text}
        </Text>
    );
}
