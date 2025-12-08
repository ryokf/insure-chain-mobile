import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import GradientHeader from '../../components/GradientHeader';
import NavBar from '../../components/NavBar';
import ClaimCard from '../../components/ClaimCard';

type FilterTab = 'urutan' | 'filter';

export type ClaimsPageProps = Readonly<{
    onNavigate?: (page: 'home' | 'protection' | 'credentials' | 'settings') => void;
}>;

export default function ClaimsPage({ onNavigate }: ClaimsPageProps) {
    const [activeTab, setActiveTab] = React.useState<'home' | 'protection' | 'credentials' | 'settings'>('credentials');
    const [activeFilter, setActiveFilter] = useState<FilterTab>('urutan');

    const handleTabPress = (tab: 'home' | 'protection' | 'credentials' | 'settings') => {
        setActiveTab(tab);
        onNavigate?.(tab);
    };

    // Mock data untuk claim aktif
    const activeClaims = [
        {
            claimId: 'CLM-2025-001',
            date: '28 November 2025',
            policyId: 'POL-2025-001234',
            amount: '50 LSK',
            status: 'completed' as const,
            steps: [
                { label: 'Terdeteksi', time: '12:00', completed: true },
                { label: 'Terverifikasi', time: '12:16', completed: true },
                { label: 'Klaim diterima', time: '12:30', completed: true },
            ],
            actionLabel: 'Lihat Di Blockchain Explorer',
        },
        {
            claimId: 'CLM-2025-023',
            date: '20 November 2025',
            policyId: 'POL-2025-001897',
            amount: '50 LSK',
            status: 'pending' as const,
            steps: [
                { label: 'Terdeteksi', time: '12:00', completed: true },
                { label: 'Menunggu verifikasi kejadian', time: '12:16', completed: false },
                { label: 'Klaim ditolak', time: '13:30', completed: false },
            ],
            actionLabel: 'Rekam Kondisi kendaraan anda',
        },
    ];

    // History claims
    const historyClaims = [
        {
            claimId: 'CLM-2025-001',
            date: '28 November 2025',
            policyId: 'POL-2025-001234',
            amount: '50 LSK',
            status: 'completed' as const,
        },
        {
            claimId: 'CLM-2025-023',
            date: '20 November 2025',
            policyId: 'POL-2025-001897',
            amount: '50 LSK',
            status: 'rejected' as const,
        },
    ];

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <GradientHeader className="px-4 pt-6 pb-8 rounded-b-3xl overflow-hidden">
                    <Text className="text-light text-2xl font-bold">Riwayat Klaim</Text>
                    <Text className="text-light/60 text-sm mt-2">Event log dan status klaim Anda</Text>
                </GradientHeader>

                {/* Filter Buttons */}
                <View className="px-4 mt-6">
                    <View className="flex-row gap-2 mb-6">
                        <Pressable
                            onPress={() => setActiveFilter('urutan')}
                            className={`px-4 py-2 rounded-lg ${
                                activeFilter === 'urutan'
                                    ? 'bg-secondary'
                                    : 'bg-dark/50 border border-light/20'
                            }`}
                        >
                            <Text
                                className={`text-sm font-semibold ${
                                    activeFilter === 'urutan' ? 'text-light' : 'text-light/50'
                                }`}
                            >
                                Urutan
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setActiveFilter('filter')}
                            className={`px-4 py-2 rounded-lg ${
                                activeFilter === 'filter'
                                    ? 'bg-secondary'
                                    : 'bg-dark/50 border border-light/20'
                            }`}
                        >
                            <Text
                                className={`text-sm font-semibold ${
                                    activeFilter === 'filter' ? 'text-light' : 'text-light/50'
                                }`}
                            >
                                Filter
                            </Text>
                        </Pressable>
                    </View>

                    {/* Active Claims Section */}
                    <Text className="text-light text-base font-bold mb-4">Klaim Aktif</Text>
                    {activeClaims.map((claim) => (
                        <ClaimCard
                            key={claim.claimId}
                            claimId={claim.claimId}
                            date={claim.date}
                            policyId={claim.policyId}
                            amount={claim.amount}
                            status={claim.status}
                            steps={claim.steps}
                            actionLabel={claim.actionLabel}
                            onAction={() => console.log('Action pressed for', claim.claimId)}
                        />
                    ))}

                    {/* Riwayat Pengajuan Section */}
                    <Text className="text-light text-base font-bold mb-4 mt-8">Riwayat Pengajuan</Text>
                    {historyClaims.map((claim) => (
                        <View
                            key={claim.claimId}
                            className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-3"
                        >
                            <View className="flex-row justify-between items-start mb-2">
                                <View>
                                    <Text className="text-light font-semibold">{claim.claimId}</Text>
                                    <Text className="text-light/50 text-xs mt-1">{claim.date}</Text>
                                    <Text className="text-light/50 text-xs">Policy ID: {claim.policyId}</Text>
                                </View>
                                <View
                                    className={`px-3 py-1 rounded-full ${
                                        claim.status === 'completed'
                                            ? 'bg-emerald-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    <Text className="text-white text-xs font-semibold">
                                        {claim.status === 'completed' ? 'Selesai' : 'Ditolak'}
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-emerald-500 text-base font-bold mt-2">+{claim.amount}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* NavBar */}
            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
    );
}
