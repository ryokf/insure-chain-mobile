import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

type SettingItem = {
    id: string;
    title: string;
    subtitle?: string;
    type: 'toggle' | 'link';
    value?: boolean;
    icon?: string;
};

export default function SettingsPage() {
    const [toggles, setToggles] = useState({
        biometric: false,
    });

    const [userProfile] = useState({
        name: 'Ryo Khrisna Fitriawan',
        studentId: 'A11.2025.0001',
        university: 'Institut Teknologi Bandung',
    });

    const [cantonNetwork] = useState({
        status: 'Connected',
        contractAddress: '0xABC123...DEF456',
        networkType: 'Canton DevNet',
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles({
            ...toggles,
            [key]: !toggles[key],
        });
    };

    const handleNavigate = (destination: string) => {
        // TODO: Navigate to destination
        console.log('Navigate to:', destination);
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <Text className="text-white text-3xl font-bold">
                        Settings
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                        Manage your account and preferences
                    </Text>
                </View>

                {/* Section 1 — Profile */}
                <SettingsSection title="Profile">
                    <SettingInfo
                        title="Name"
                        value={userProfile.name}
                        icon="person"
                    />
                    <SettingInfo
                        title="Student ID"
                        value={userProfile.studentId}
                        icon="card"
                    />
                    <SettingInfo
                        title="University"
                        value={userProfile.university}
                        icon="school"
                    />
                </SettingsSection>

                {/* Section 2 — Security */}
                <SettingsSection title="Security">
                    <SettingLink
                        title="Change Password"
                        subtitle="Update your wallet password"
                        icon="lock-closed"
                        onPress={() => handleNavigate('password')}
                    />
                    <SettingToggle
                        title="Biometric Settings"
                        subtitle="Use Face ID or fingerprint to unlock"
                        icon="fingerprint"
                        value={toggles.biometric}
                        onToggle={() => handleToggle('biometric')}
                    />
                    <SettingLink
                        title="View Seed Phrase"
                        subtitle="Backup your recovery phrase"
                        icon="eye"
                        onPress={() => handleNavigate('seed-phrase')}
                    />
                    <SettingLink
                        title="Backup Wallet"
                        subtitle="Export wallet backup file"
                        icon="download"
                        onPress={() => handleNavigate('backup')}
                    />
                </SettingsSection>

                {/* Section 3 — Canton Network */}
                <SettingsSection title="Canton Network">
                    <SettingInfo
                        title="Network Status"
                        value={cantonNetwork.status}
                        icon="wifi"
                        valueColor={cantonNetwork.status === 'Connected' ? '#10B981' : '#EF4444'}
                    />
                    <SettingInfo
                        title="Contract Address"
                        value={cantonNetwork.contractAddress}
                        icon="code"
                    />
                    <SettingLink
                        title="Transaction History"
                        subtitle="View all blockchain transactions"
                        icon="time"
                        onPress={() => handleNavigate('transactions')}
                    />
                </SettingsSection>

                {/* Section 4 — About */}
                <SettingsSection title="About">
                    <SettingInfo
                        title="Version"
                        value="1.0.0 (Beta)"
                        icon="information-circle"
                    />
                    <SettingLink
                        title="Terms & Privacy"
                        subtitle="Read our terms and privacy policy"
                        icon="document-text"
                        onPress={() => handleNavigate('terms')}
                    />
                    <SettingLink
                        title="Contact Support"
                        subtitle="Get help from our support team"
                        icon="mail"
                        onPress={() => handleNavigate('support')}
                    />
                </SettingsSection>

                {/* Spacer */}
                <View className="h-20" />
            </ScrollView>
        </View>
    );
}

function SettingsSection({
    title,
    children,
}: Readonly<{
    title: string;
    children: React.ReactNode;
}>) {
    return (
        <View className="px-6 pb-6">
            <Text className="text-gray-400 text-xs font-semibold uppercase mb-3 px-2">
                {title}
            </Text>
            <View className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                {children}
            </View>
        </View>
    );
}

function SettingToggle({
    title,
    subtitle,
    icon,
    value,
    onToggle,
}: Readonly<{
    title: string;
    subtitle: string;
    icon: string;
    value: boolean;
    onToggle: () => void;
}>) {
    return (
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-700 last:border-b-0">
            <View className="flex-row items-center flex-1 gap-4">
                <Ionicons name={icon as any} size={20} color="#818CF8" />
                <View className="flex-1">
                    <Text className="text-white font-semibold text-sm">
                        {title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                        {subtitle}
                    </Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#475569', true: '#818CF8' }}
                thumbColor={value ? '#E0E7FF' : '#94A3B8'}
            />
        </View>
    );
}

function SettingInfo({
    title,
    value,
    icon,
    valueColor,
}: Readonly<{
    title: string;
    value: string;
    icon: string;
    valueColor?: string;
}>) {
    return (
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-700 last:border-b-0">
            <View className="flex-row items-center flex-1 gap-4">
                <Ionicons name={icon as any} size={20} color="#818CF8" />
                <View className="flex-1">
                    <Text className="text-gray-400 text-xs mb-1">
                        {title}
                    </Text>
                    <Text 
                        className="font-semibold text-sm"
                        style={{ color: valueColor || '#FFFFFF' }}
                    >
                        {value}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function SettingLink({
    title,
    subtitle,
    icon,
    onPress,
    isDestructive,
}: Readonly<{
    title: string;
    subtitle: string;
    icon: string;
    onPress: () => void;
    isDestructive?: boolean;
}>) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between px-4 py-4 border-b border-slate-700 last:border-b-0"
        >
            <View className="flex-row items-center flex-1 gap-4">
                <Ionicons
                    name={icon as any}
                    size={20}
                    color={isDestructive ? '#FCA5A5' : '#818CF8'}
                />
                <View className="flex-1">
                    <Text
                        className={`font-semibold text-sm ${
                            isDestructive ? 'text-red-400' : 'text-white'
                        }`}
                    >
                        {title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                        {subtitle}
                    </Text>
                </View>
            </View>
            <Ionicons
                name="chevron-forward"
                size={20}
                color={isDestructive ? '#FCA5A5' : '#64748B'}
            />
        </TouchableOpacity>
    );
}
