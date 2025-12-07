import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export type PasswordInputProps = {
    readonly value: string;
    readonly onChangeText: (text: string) => void;
    readonly placeholder?: string;
    readonly label?: string;
    readonly testID?: string;
    readonly containerClassName?: string;
};

export default function PasswordInput({
    value,
    onChangeText,
    placeholder = 'Enter password',
    label,
    testID,
    containerClassName = 'mb-4',
}: Readonly<PasswordInputProps>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={containerClassName}>
            {label && <Text className="text-white font-semibold mb-3">{label}</Text>}
            <View className="relative">
                <TextInput
                    testID={testID}
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    className="bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 border border-gray-700"
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-6 w-6 justify-center items-center"
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
