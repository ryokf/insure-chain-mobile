import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import GradientHeader from '../../components/GradientHeader';
import NavBar from '../../components/NavBar';

export type SettingsPageProps = Readonly<{
    onNavigate?: (page: 'home' | 'protection' | 'credentials' | 'settings') => void;
}>;

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
    const [activeTab, setActiveTab] = React.useState<'home' | 'protection' | 'credentials' | 'settings'>('settings');
    const [notifEnabled, setNotifEnabled] = React.useState(true);
    const [biometricEnabled, setBiometricEnabled] = React.useState(false);

    const handleTabPress = (tab: 'home' | 'protection' | 'credentials' | 'settings') => {
        setActiveTab(tab);
        onNavigate?.(tab);
    };

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <GradientHeader className="px-4 pt-6 pb-8 rounded-b-3xl overflow-hidden">
                    <Text className="text-light text-2xl font-bold">Settings</Text>
                    <Text className="text-light/60 text-sm mt-2">Kelola pengaturan akun Anda</Text>
                </GradientHeader>

                {/* Profile Section */}
                <View className="px-4 mt-6">
                    <Text className="text-light text-lg font-bold mb-4">Akun</Text>
                    <View className="bg-dark/50 border border-secondary/20 rounded-2xl p-4 mb-4">
                        <View className="flex-row items-center gap-4 mb-4">
                            <View className="w-12 h-12 rounded-full bg-secondary/20 items-center justify-center">
                                <MaterialCommunityIcons name="account-circle" size={24} color="#516ac8" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-light font-semibold">Ryo Khrisna Fitriawan</Text>
                                <Text className="text-light/50 text-xs mt-1">A11.2025.0001</Text>
                            </View>
                        </View>
                        <Pressable className="bg-secondary/20 rounded-lg py-2 items-center">
                            <Text className="text-secondary text-xs font-semibold">Edit Profil</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Security Section */}
                <View className="px-4 mt-6">
                    <Text className="text-light text-lg font-bold mb-4">Keamanan</Text>
                    <View className="bg-dark/50 border border-secondary/20 rounded-2xl overflow-hidden">
                        {/* Biometric Toggle */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="fingerprint" size={20} color="#516ac8" />
                                <View>
                                    <Text className="text-light font-semibold text-sm">Biometric</Text>
                                    <Text className="text-light/50 text-xs mt-1">Face ID atau Fingerprint</Text>
                                </View>
                            </View>
                            <Switch
                                value={biometricEnabled}
                                onValueChange={setBiometricEnabled}
                                trackColor={{ false: '#1e293b', true: '#516ac8' }}
                                thumbColor={biometricEnabled ? '#516ac8' : '#64748b'}
                            />
                        </View>
                        
                        <View className="border-t border-secondary/10" />
                        
                        {/* Change Password */}
                        <Pressable className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="lock" size={20} color="#516ac8" />
                                <View>
                                    <Text className="text-light font-semibold text-sm">Ubah Password</Text>
                                    <Text className="text-light/50 text-xs mt-1">Update password wallet Anda</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
                        </Pressable>
                        
                        <View className="border-t border-secondary/10" />
                        
                        {/* View Seed Phrase */}
                        <Pressable className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="eye" size={20} color="#516ac8" />
                                <View>
                                    <Text className="text-light font-semibold text-sm">Lihat Seed Phrase</Text>
                                    <Text className="text-light/50 text-xs mt-1">Backup kode pemulihan Anda</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
                        </Pressable>
                    </View>
                </View>

                {/* Notifications Section */}
                <View className="px-4 mt-6">
                    <Text className="text-light text-lg font-bold mb-4">Notifikasi</Text>
                    <View className="bg-dark/50 border border-secondary/20 rounded-2xl overflow-hidden">
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="bell" size={20} color="#516ac8" />
                                <View>
                                    <Text className="text-light font-semibold text-sm">Notifikasi Push</Text>
                                    <Text className="text-light/50 text-xs mt-1">Terima update penting</Text>
                                </View>
                            </View>
                            <Switch
                                value={notifEnabled}
                                onValueChange={setNotifEnabled}
                                trackColor={{ false: '#1e293b', true: '#516ac8' }}
                                thumbColor={notifEnabled ? '#516ac8' : '#64748b'}
                            />
                        </View>
                    </View>
                </View>

                {/* About Section */}
                <View className="px-4 mt-6 mb-4">
                    <Text className="text-light text-lg font-bold mb-4">Tentang</Text>
                    <View className="bg-dark/50 border border-secondary/20 rounded-2xl overflow-hidden">
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View>
                                <Text className="text-light font-semibold text-sm">Versi App</Text>
                                <Text className="text-light/50 text-xs mt-1">1.0.0 (Beta)</Text>
                            </View>
                        </View>
                        
                        <View className="border-t border-secondary/10" />
                        
                        <Pressable className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="file-document" size={20} color="#516ac8" />
                                <Text className="text-light font-semibold text-sm">Syarat & Ketentuan</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
                        </Pressable>
                        
                        <View className="border-t border-secondary/10" />
                        
                        <Pressable className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center gap-3 flex-1">
                                <MaterialCommunityIcons name="help-circle" size={20} color="#516ac8" />
                                <Text className="text-light font-semibold text-sm">Hubungi Support</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* NavBar */}
            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
    );
}

