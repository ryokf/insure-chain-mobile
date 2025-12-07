import BiometricSwitch from '@/src/components/BiometricSwitch';
import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import PasswordInput from '@/src/components/ui/PasswordInput';
import StrengthMeter from '@/src/components/ui/StrengthMeter';
import { getPasswordStrength, validatePassword, validatePasswordMatch } from '@/src/utils/validators';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function SetupPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const passwordStrength = getPasswordStrength(password);
    const passwordValidation = validatePassword(password);
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);

    const isPasswordValid = passwordValidation.isValid && touched.password;
    const isConfirmPasswordValid = passwordMatchValidation.isValid && touched.confirmPassword;
    const isFormValid = isPasswordValid && isConfirmPasswordValid;

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setTouched({ ...touched, password: true });
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        setTouched({ ...touched, confirmPassword: true });
    };

    const handleCreateWallet = async () => {
        if (isFormValid === false) return;

        setIsLoading(true);
        try {
            // Store password in secure storage
            // Simulate wallet creation delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/(onboarding)/(create-wallet)/wallet-created-success');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header with Back Button */}
                <View className="flex-row items-center px-6 pt-2 pb-4">
                    <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
                        <Text className="text-2xl text-primary">←</Text>
                    </TouchableOpacity>
                </View>

                {/* Page Header */}
                <View className="px-6 pb-6">
                    <Text className="text-white text-3xl font-bold mb-2">
                        Create Password
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Secure your wallet with a strong password
                    </Text>
                </View>

                {/* Content */}
                <View className="flex-1 px-6 pb-8">
                    {/* Password Input */}
                    <View className="mb-6">
                        <PasswordInput
                            label="Password"
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Enter a strong password"
                        />
                        {touched.password && password.length > 0 && (
                            <StrengthMeter strength={passwordStrength} label="Password strength" />
                        )}
                    </View>

                    {/* Confirm Password Input */}
                    <View className="mb-6">
                        <PasswordInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={handleConfirmPasswordChange}
                            placeholder="Re-enter your password"
                        />
                    </View>

                    {/* Password Requirements */}
                    <View className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-8">
                        <Text className="text-gray-400 text-sm font-semibold mb-3">
                            Password requirements:
                        </Text>
                        <View className="space-y-2">
                            <RequirementItem
                                met={password.length >= 8}
                                text="At least 8 characters"
                            />
                            <RequirementItem
                                met={/[A-Z]/.test(password)}
                                text="At least one uppercase letter"
                            />
                            <RequirementItem
                                met={/[a-z]/.test(password)}
                                text="At least one lowercase letter"
                            />
                            <RequirementItem
                                met={/\d/.test(password)}
                                text="At least one number"
                            />
                        </View>
                    </View>

                    {/* Security Warning */}
                    <View className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
                        <View className="flex-row items-start gap-3">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <View className="flex-1">
                                <Text className="text-blue-400 font-semibold text-sm">
                                    Important
                                </Text>
                                <Text className="text-blue-300 text-xs mt-1">
                                    Never share your password with anyone. You will need it to access your wallet.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <BiometricSwitch/>


                    {/* Spacer */}
                    <View className="flex-1" />
                </View>
            </ScrollView>

            {/* Button Container */}
            <View className="px-6 pb-10 gap-3">
                <PrimaryButton
                    title="Create Wallet"
                    onPress={handleCreateWallet}
                    disabled={!isFormValid}
                    loading={isLoading}
                />
                <SecondaryButton
                    title="Back"
                    onPress={() => router.back()}
                />
            </View>
        </View>
    );
}

function RequirementItem({ met, text }: Readonly<{ met: boolean; text: string }>) {
    return (
        <View className="flex-row items-center gap-2">
            <Ionicons
                name={met ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={met ? '#10B981' : '#6B7280'}
            />
            <Text className={`text-xs ${met ? 'text-green-400' : 'text-gray-400'}`}>
                {text}
            </Text>
        </View>
    );
}
