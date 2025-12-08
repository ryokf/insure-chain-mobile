import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ActivityItem from '../../components/ActivityItem';
import GradientHeader from '../../components/GradientHeader';
import NavBar from '../../components/NavBar';
import PolicyCard from '../../components/PolicyCard';
import ProtectionCard from '../../components/ProtectionCard';

const protectionData = [
    {
        title: '24 Hour Protection',
        description: 'Micro Accident Coverage',
        price: '5 LSK',
        priceLabel: 'Rp 5,000',
        badgeText: 'Hemat 15%',
        badgeColor: 'success' as const,
    },
    {
        title: '7 Day Protection',
        description: 'Hemat biaya untuk seminggu penuh',
        price: '30 LSK',
        priceLabel: 'Rp 30,000',
        badgeText: 'Hemat 10%',
        badgeColor: 'warning' as const,
    },
];

export default function HomePage() {
    const [activeTab, setActiveTab] = React.useState<'home' | 'protection' | 'credentials' | 'settings'>('home');

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <GradientHeader className="px-4 pt-6 pb-8 rounded-3xl overflow-hidden">
                    <View className="flex-row justify-between items-start mb-6">
                        <View>
                            <Text className="text-light/60 text-sm">Halo,</Text>
                            <Text className="text-light text-2xl font-bold">InsureChain User</Text>
                        </View>
                        <Pressable className="p-2">
                            <MaterialCommunityIcons name="bell" size={24} color="#f8f7f5" />
                        </Pressable>
                    </View>

                    {/* Active Policy Card */}
                    <View className="bg-white/10 border border-secondary/30 rounded-2xl py-4 px-6">
                        <View className="flex-row justify-between items-start mb-5">
                            <View className="flex-row items-center gap-2">
                                <MaterialCommunityIcons name="briefcase-outline" size={20} color="white" />
                                <Text className="text-light text-sm">Dompet Anda</Text>
                            </View>
                            <View className="bg-emerald-500 px-3 py-1 rounded-full">
                                <Text className="text-light text-xs font-semibold">Connected</Text>
                            </View>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <View>
                                <Text className="text-light text-2xl font-bold mb-1">150.5 LSK</Text>
                                <Text className="text-light/50 text-xs">Rp 150,500</Text>
                            </View>
                            <Pressable
                                className="bg-accent rounded-lg px-4 py-2"
                            >
                                <Text className="text-dark text-sm font-semibold">+ Top Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </GradientHeader>

                {/* Protections Section */}
                <View className="px-4 mt-6">
                    <Text className="text-light text-xl font-bold mb-4">Pilih Proteksi Anda</Text>

                    {protectionData.map((protection, index) => (
                        <ProtectionCard
                            key={index}
                            {...protection}
                            onPressBeli={() => {
                                // Handle purchase
                            }}
                        />
                    ))}
                </View>

                {/* Active Policy Section */}
                <View className="px-4 mt-8">
                    <Text className="text-light text-xl font-bold mb-4">Polis Aktif Anda</Text>
                    <PolicyCard
                        icon="shield"
                        title="Proteksi AASF"
                        policyNumber="ID-POL-2025-001234"
                        timeRemaining="Sisa waktu: 23 jam 15 menit"
                        onMonitoring={() => {
                            // Handle monitoring
                        }}
                    />
                </View>

                {/* Recent Activity Section */}
                <View className="px-4 mt-8 mb-4">
                    <Text className="text-light text-xl font-bold mb-4">Aktivitas Terbaru</Text>
                    <View className="bg-dark/50 border border-secondary/20 rounded-2xl p-4">
                        <ActivityItem
                            icon="check-circle"
                            title="Claim dibayarkan"
                            subtitle="2 hari yang lalu"
                            amount={50}
                            isPositive={true}
                        />
                        <View className="border-t border-secondary/10" />
                        <ActivityItem
                            icon="file-document"
                            title="Pembelian Polis"
                            subtitle="3 hari yang lalu"
                            amount={30}
                            isPositive={false}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* NavBar */}
            <NavBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
    );
}
