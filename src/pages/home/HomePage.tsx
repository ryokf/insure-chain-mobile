import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ActivityItem = {
    id: string;
    title: string;
    date: string;
    description: string;
    icon: string;
    type: 'credential' | 'loan' | 'reputation' | 'verification';
};

const DUMMY_ACTIVITIES: ActivityItem[] = [
    {
        id: '1',
        title: 'Diploma Credential Issued',
        date: 'November 20, 2025',
        description: 'Bachelor of Computer Science credential tokenized',
        icon: 'school',
        type: 'credential',
    },
    {
        id: '2',
        title: 'Gold Tier Achieved',
        date: 'November 18, 2025',
        description: 'Reputation score reached 500 points',
        icon: 'trophy',
        type: 'reputation',
    },
    {
        id: '3',
        title: 'Wallet Created',
        date: 'November 14, 2025',
        description: 'Self-custody wallet successfully created',
        icon: 'wallet',
        type: 'verification',
    },
];

export default function HomePage() {
    const [userName] = useState('Wowo');
    const [totalCredentials] = useState(1); // Diploma
    const [czenPoints] = useState(250);
    const [tier] = useState('Silver');
    const [activeLoans] = useState(0);
    
    // Feature states - DUMMY DATA ENABLED FOR PREVIEW
    const [pendingCredentials] = useState(1); // Pending approval from university (DUMMY: set to 1)
    const [nextPaymentDate] = useState<string | null>('Dec 5, 2025'); // DUMMY: set payment date
    const [nextPaymentAmount] = useState<number | null>(150); // DUMMY: $150 payment

    const handleViewDetails = () => {
        // Navigate to activity details
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header with user info */}
                <View className="flex-row items-center justify-between px-6 pt-8 pb-6">
                    <View className="flex-row items-center gap-4 flex-1">
                        <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                            <Text className="text-white text-xl font-bold">{userName[0]}</Text>
                        </View>
                        <View>
                            <Text className="text-gray-400 text-sm">Welcome back</Text>
                            <Text className="text-white text-xl font-bold">{userName}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/(notification)')}
                        className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center"
                    >
                        <Ionicons name="notifications-outline" size={22} color="#818CF8" />
                    </TouchableOpacity>
                </View>

                {/* Asset Summary Card */}
                <View className="mx-6 mb-6">
                    <View className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6"
                        style={{
                            shadowColor: '#818CF8',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            elevation: 10,
                        }}>
                        <Text className="text-white/80 text-sm mb-2">Your Digital Assets</Text>
                        
                        {/* Stats Grid */}
                        <View className="flex-row items-center justify-between mb-4">
                            <View>
                                <Text className="text-white text-4xl font-bold">{totalCredentials}</Text>
                                <Text className="text-white/60 text-sm">Credentials</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-4xl font-bold">{czenPoints}</Text>
                                <Text className="text-white/60 text-sm">CZEN Points</Text>
                            </View>
                            <View className="items-end">
                                <View className="bg-white/20 rounded-full px-3 py-1 mb-1">
                                    <Text className="text-white font-bold text-sm">{tier}</Text>
                                </View>
                                <Text className="text-white/60 text-sm">Tier</Text>
                            </View>
                        </View>

                        {/* Active Loans */}
                        <View className="bg-white/10 rounded-2xl p-3 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="cash-outline" size={20} color="white" />
                                <Text className="text-white font-semibold">Active Loans</Text>
                            </View>
                            <Text className="text-white text-lg font-bold">{activeLoans}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Reminder (if loan active) */}
                {nextPaymentDate && nextPaymentAmount && (
                    <View className="px-6 mb-6">
                        <View className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="time" size={20} color="#F59E0B" />
                                    <Text className="text-orange-400 font-bold text-sm">Payment Due Soon</Text>
                                </View>
                                <Text className="text-orange-300 text-xs">{nextPaymentDate}</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-white text-2xl font-bold mb-1">${nextPaymentAmount}</Text>
                                    <Text className="text-orange-300/70 text-xs">Next payment amount</Text>
                                </View>
                                <TouchableOpacity 
                                    className="bg-orange-500 px-5 py-2.5 rounded-full"
                                    onPress={() => router.push('/loans')}>
                                    <Text className="text-white font-bold text-sm">Pay Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {/* 🔥 NEW: Pending Credential Status */}
                {pendingCredentials > 0 && (
                    <View className="px-6 mb-6">
                        <View className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                            <View className="flex-row items-center gap-3">
                                <View className="w-12 h-12 rounded-full bg-blue-500/20 items-center justify-center">
                                    <Ionicons name="hourglass" size={24} color="#3B82F6" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-bold text-sm mb-1">
                                        Credential Approval Pending
                                    </Text>
                                    <Text className="text-blue-300 text-xs">
                                        {pendingCredentials} request{pendingCredentials > 1 ? 's' : ''} waiting for university verification
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
                            </View>
                        </View>
                    </View>
                )}

                {/* Earning Opportunities */}
                <View className="px-6 mb-6">
                    <Text className="text-white text-xl font-bold mb-4">Earn More CZEN</Text>
                    <View className="gap-3">
                        <TouchableOpacity 
                            className="bg-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                            onPress={() => router.push('/documents')}>
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-green-500/20 items-center justify-center">
                                    <Ionicons name="add-circle" size={20} color="#10B981" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-0.5">
                                        Request More Credentials
                                    </Text>
                                    <Text className="text-gray-400 text-xs">Earn +100 points per credential</Text>
                                </View>
                            </View>
                            <Text className="text-green-400 font-bold text-sm">+100</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="bg-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                            onPress={() => router.push('/qr')}>
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-blue-500/20 items-center justify-center">
                                    <Ionicons name="checkmark-done" size={20} color="#3B82F6" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-0.5">
                                        Verify 3 Credentials Today
                                    </Text>
                                    <Text className="text-gray-400 text-xs">Daily challenge: 0/3 completed</Text>
                                </View>
                            </View>
                            <Text className="text-blue-400 font-bold text-sm">+30</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="bg-slate-800 rounded-2xl p-4 flex-row items-center justify-between"
                            onPress={() => router.push('/loans')}>
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-indigo-500/20 items-center justify-center">
                                    <Ionicons name="card" size={20} color="#818CF8" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-0.5">
                                        Repay Loan On Time
                                    </Text>
                                    <Text className="text-gray-400 text-xs">Build your reputation score</Text>
                                </View>
                            </View>
                            <Text className="text-indigo-400 font-bold text-sm">+50</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Activity Section */}
                <View className="px-6 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-white text-xl font-bold">
                            Recent Activity
                        </Text>
                        <TouchableOpacity onPress={handleViewDetails}>
                            <Text className="text-primary text-sm font-semibold">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="gap-3">
                        {DUMMY_ACTIVITIES.map((activity) => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </View>
                </View>

                {/* Empty space for bottom navigation */}
                <View className="h-24" />
            </ScrollView>
        </View>
    );
}

function ActivityCard({ activity }: Readonly<{ activity: ActivityItem }>) {
    const getIconColor = (type: string) => {
        switch (type) {
            case 'credential': return '#10B981';
            case 'loan': return '#818CF8';
            case 'reputation': return '#F59E0B';
            case 'verification': return '#EC4899';
            default: return '#818CF8';
        }
    };

    const getIconBg = (type: string) => {
        return getIconColor(type) + '20';
    };

    return (
        <View className="bg-slate-800 rounded-2xl p-4 flex-row items-center gap-4">
            <View 
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: getIconBg(activity.type) }}>
                <Ionicons 
                    name={activity.icon as any} 
                    size={24} 
                    color={getIconColor(activity.type)} 
                />
            </View>
            <View className="flex-1">
                <Text className="text-white font-semibold mb-1">
                    {activity.title}
                </Text>
                <Text className="text-gray-400 text-xs mb-1">
                    {activity.date}
                </Text>
                <Text className="text-gray-500 text-sm">
                    {activity.description}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </View>
    );
}