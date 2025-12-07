import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Badge = {
    id: string;
    name: string;
    description: string;
    icon: string;
    emoji: string;
    gradient: string[];
    earned: boolean;
    earnedDate?: string;
    requirement: string;
    contractId?: string;
    isSoulbound: boolean;
};

type Activity = {
    id: string;
    activity: string;
    points: number;
    date: string;
};

const BADGES: Badge[] = [
    {
        id: '1',
        name: 'Verified Graduate',
        description: 'Diploma credential issued',
        icon: 'school',
        emoji: '🎓',
        gradient: ['#F59E0B', '#D97706'],
        earned: true,
        earnedDate: 'Nov 20, 2025',
        requirement: 'Receive diploma credential',
        contractId: '0xABC...123',
        isSoulbound: true,
    },
    {
        id: '2',
        name: 'Silver Scholar',
        description: 'Reached 200+ CZEN points',
        icon: 'star',
        emoji: '🥈',
        gradient: ['#9CA3AF', '#6B7280'],
        earned: true,
        earnedDate: 'Nov 18, 2025',
        requirement: 'Earn 200 CZEN points',
        contractId: '0xDEF...456',
        isSoulbound: true,
    },
    {
        id: '3',
        name: 'Gold Scholar',
        description: 'Reached 500+ CZEN points',
        icon: 'trophy',
        emoji: '🥇',
        gradient: ['#F59E0B', '#EA580C'],
        earned: false,
        requirement: 'Earn 500 CZEN points',
        isSoulbound: true,
    },
    {
        id: '4',
        name: 'Trusted Borrower',
        description: 'Repaid 3+ loans on time',
        icon: 'shield-checkmark',
        emoji: '💎',
        gradient: ['#10B981', '#059669'],
        earned: false,
        requirement: 'Complete 3 successful loan repayments',
        isSoulbound: true,
    },
    {
        id: '5',
        name: 'Community Builder',
        description: 'Verified 10+ credentials',
        icon: 'people',
        emoji: '🤝',
        gradient: ['#818CF8', '#6366F1'],
        earned: false,
        requirement: 'Complete 10 credential verifications',
        isSoulbound: true,
    },
    {
        id: '6',
        name: 'Platinum Elite',
        description: 'Reached 1000+ CZEN points',
        icon: 'medal',
        emoji: '💠',
        gradient: ['#EC4899', '#DB2777'],
        earned: false,
        requirement: 'Earn 1000 CZEN points',
        isSoulbound: true,
    },
];

const ACTIVITIES: Activity[] = [
    { id: '1', activity: 'Diploma credential issued', points: 100, date: 'Nov 20, 2025' },
    { id: '2', activity: 'Profile completed', points: 20, date: 'Nov 18, 2025' },
    { id: '3', activity: 'Biometric enrolled', points: 30, date: 'Nov 15, 2025' },
    { id: '4', activity: 'First credential verified', points: 10, date: 'Nov 14, 2025' },
    { id: '5', activity: 'Wallet created', points: 50, date: 'Nov 14, 2025' },
    { id: '6', activity: 'Account verified', points: 40, date: 'Nov 14, 2025' },
];

export default function ReputationPage() {
    const [czenPoints] = useState(250);
    const [tier] = useState('Silver');
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [showBadgeDetail, setShowBadgeDetail] = useState(false);
    
    const maxScore = 1000;
    const scorePercentage = (czenPoints / maxScore) * 100;
    const nextTierPoints = 500; // Gold tier
    const pointsToNext = nextTierPoints - czenPoints;
    const progressToNext = ((czenPoints - 200) / (nextTierPoints - 200)) * 100;

    const earnedBadges = BADGES.filter(b => b.earned);
    const lockedBadges = BADGES.filter(b => !b.earned);

    const handleViewBadge = (badge: Badge) => {
        setSelectedBadge(badge);
        setShowBadgeDetail(true);
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'Bronze': return '#CD7F32';
            case 'Silver': return '#C0C0C0';
            case 'Gold': return '#FFD700';
            case 'Platinum': return '#E5E4E2';
            default: return '#818CF8';
        }
    };

    const getTierBenefits = (tier: string) => {
        switch (tier) {
            case 'Silver':
                return [
                    'Loan interest discount: 1%',
                    'Priority verification',
                    'Campus perks access',
                ];
            case 'Gold':
                return [
                    'Loan interest discount: 2%',
                    'Fast-track verification',
                    'Premium campus perks',
                    'Governance voting rights',
                ];
            default:
                return ['Standard benefits'];
        }
    };

    const handleRedeemBenefits = () => {
        // TODO: Navigate to benefits page
        console.log('Redeem benefits clicked');
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <Text className="text-white text-3xl font-bold mb-2">
                        Reputation
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        Your CZEN Points & NFT Badges
                    </Text>
                </View>

                {/* CZEN Points Card */}
                <View className="px-6 pb-6">
                    <View className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6"
                        style={{
                            shadowColor: '#818CF8',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            elevation: 10,
                        }}>
                        <Text className="text-white/80 text-sm mb-2">Total CZEN Points</Text>
                        <Text className="text-white text-6xl font-bold mb-2">
                            {czenPoints}
                        </Text>
                        <View className="flex-row items-center gap-2 mb-6">
                            <View className="bg-white/20 rounded-full px-3 py-1">
                                <Text className="text-white font-bold">{tier} Tier</Text>
                            </View>
                            <View className="h-1 w-1 rounded-full bg-white/40" />
                            <Text className="text-white/80 text-sm">
                                {pointsToNext} pts to Gold
                            </Text>
                        </View>

                        {/* Progress Bar */}
                        <View className="w-full">
                            <View className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
                                <View
                                    className="h-full bg-white rounded-full"
                                    style={{ width: `${progressToNext}%` }}
                                />
                            </View>
                            <Text className="text-white/60 text-xs">
                                {progressToNext.toFixed(0)}% progress to next tier
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Detailed Tier Benefits Section */}
                <View className="px-6 pb-6">
                    <Text className="text-white text-xl font-bold mb-4">
                        Your {tier} Benefits
                    </Text>
                    
                    <View className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-orange-500/20">
                        {/* Current Benefits */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-3">
                                <View className="w-10 h-10 rounded-full bg-orange-500/20 items-center justify-center">
                                    <Ionicons name="trophy" size={22} color="#F59E0B" />
                                </View>
                                <Text className="text-white font-bold text-base">Current Benefits</Text>
                            </View>
                            
                            <View className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 gap-3">
                                <View className="flex-row items-start gap-3">
                                    <Ionicons name="trending-down" size={20} color="#10B981" />
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold text-sm mb-1">
                                            {tier === 'Bronze' ? '5% Loan Discount' : 
                                             tier === 'Silver' ? '10% Loan Discount' :
                                             tier === 'Gold' ? '15% Loan Discount' : '20% Loan Discount'}
                                        </Text>
                                        <Text className="text-gray-400 text-xs">
                                            Lower interest rates on all microloans
                                        </Text>
                                    </View>
                                </View>
                                
                                <View className="h-px bg-slate-700" />
                                
                                <View className="flex-row items-start gap-3">
                                    <Ionicons name="flash" size={20} color="#3B82F6" />
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold text-sm mb-1">
                                            {tier === 'Bronze' ? 'Standard Verification' :
                                             tier === 'Silver' ? 'Priority Verification' :
                                             tier === 'Gold' ? 'Express Verification' : 'Instant Verification'}
                                        </Text>
                                        <Text className="text-gray-400 text-xs">
                                            {tier === 'Bronze' ? 'Regular processing speed' :
                                             tier === 'Silver' ? '2x faster credential verification' :
                                             tier === 'Gold' ? '5x faster verification' : 'Real-time verification'}
                                        </Text>
                                    </View>
                                </View>
                                
                                <View className="h-px bg-slate-700" />
                                
                                <View className="flex-row items-start gap-3">
                                    <Ionicons name="gift" size={20} color="#EC4899" />
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold text-sm mb-1">
                                            {tier === 'Bronze' ? '1 Campus Perk' :
                                             tier === 'Silver' ? '2 Campus Perks' :
                                             tier === 'Gold' ? '4 Campus Perks' : 'All Campus Perks'}
                                        </Text>
                                        <Text className="text-gray-400 text-xs">
                                            Access to exclusive university benefits and events
                                        </Text>
                                    </View>
                                </View>

                                {(tier === 'Gold' || tier === 'Platinum') && (
                                    <>
                                        <View className="h-px bg-slate-700" />
                                        <View className="flex-row items-start gap-3">
                                            <Ionicons name="rocket" size={20} color="#F59E0B" />
                                            <View className="flex-1">
                                                <Text className="text-white font-semibold text-sm mb-1">
                                                    Priority Loan Approval
                                                </Text>
                                                <Text className="text-gray-400 text-xs">
                                                    Fast-track loan application processing
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                )}

                                {tier === 'Platinum' && (
                                    <>
                                        <View className="h-px bg-slate-700" />
                                        <View className="flex-row items-start gap-3">
                                            <Ionicons name="diamond" size={20} color="#A855F7" />
                                            <View className="flex-1">
                                                <Text className="text-white font-semibold text-sm mb-1">
                                                    VIP Support
                                                </Text>
                                                <Text className="text-gray-400 text-xs">
                                                    Dedicated support channel with priority response
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>

                        {/* Next Tier Preview */}
                        {tier !== 'Platinum' && (
                            <View className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <Ionicons name="sparkles" size={18} color="#F59E0B" />
                                    <Text className="text-orange-400 font-bold text-sm">
                                        Unlock {tier === 'Bronze' ? 'Silver' : tier === 'Silver' ? 'Gold' : 'Platinum'} Benefits
                                    </Text>
                                </View>
                                <View className="gap-2">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                        <Text className="text-orange-300 text-xs flex-1">
                                            {tier === 'Bronze' ? '10% loan discount (up from 5%)' :
                                             tier === 'Silver' ? '15% loan discount (up from 10%)' : '20% loan discount (up from 15%)'}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                        <Text className="text-orange-300 text-xs flex-1">
                                            {tier === 'Bronze' ? 'Priority verification (2x faster)' :
                                             tier === 'Silver' ? 'Express verification (5x faster)' : 'Instant verification'}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                        <Text className="text-orange-300 text-xs flex-1">
                                            {tier === 'Bronze' ? '2 campus perks (up from 1)' :
                                             tier === 'Silver' ? '4 campus perks (up from 2)' : 'All campus perks unlocked'}
                                        </Text>
                                    </View>
                                    {tier === 'Silver' && (
                                        <View className="flex-row items-center gap-2">
                                            <View className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                            <Text className="text-orange-300 text-xs flex-1">
                                                Priority loan approval
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View className="mt-3 pt-3 border-t border-orange-500/20">
                                    <Text className="text-orange-400 text-xs text-center">
                                        Earn {pointsToNext} more points to unlock {tier === 'Bronze' ? 'Silver' : tier === 'Silver' ? 'Gold' : 'Platinum'} tier
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Max Tier Message */}
                        {tier === 'Platinum' && (
                            <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                                <View className="flex-row items-center justify-center gap-2">
                                    <Ionicons name="diamond" size={20} color="#A855F7" />
                                    <Text className="text-purple-400 font-bold text-sm">
                                        You've reached the highest tier!
                                    </Text>
                                </View>
                                <Text className="text-purple-300 text-xs text-center mt-2">
                                    All benefits unlocked. Keep building your reputation!
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* NFT Badges Section */}
                <View className="px-6 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-white text-xl font-bold">
                            My NFT Badges
                        </Text>
                        <View className="bg-primary/20 rounded-full px-3 py-1">
                            <Text className="text-primary font-semibold text-sm">
                                {earnedBadges.length} Earned
                            </Text>
                        </View>
                    </View>

                    {/* Earned Badges Grid */}
                    <View className="flex-row flex-wrap gap-3 mb-4">
                        {earnedBadges.map((badge) => (
                            <TouchableOpacity
                                key={badge.id}
                                onPress={() => handleViewBadge(badge)}
                                className="w-[48%] bg-slate-800 rounded-2xl p-4 items-center"
                                style={{
                                    shadowColor: badge.gradient[0],
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}>
                                {/* Badge Icon */}
                                <View className="w-20 h-20 rounded-full items-center justify-center mb-3"
                                    style={{
                                        backgroundColor: badge.gradient[0],
                                    }}>
                                    <Text className="text-5xl">{badge.emoji}</Text>
                                </View>

                                {/* Badge Name */}
                                <Text className="text-white font-bold text-center text-sm mb-1">
                                    {badge.name}
                                </Text>
                                <Text className="text-gray-400 text-xs text-center mb-2">
                                    {badge.description}
                                </Text>

                                {/* Soulbound Badge */}
                                <View className="bg-purple-500/20 rounded-full px-2 py-1">
                                    <Text className="text-purple-400 text-xs font-bold">
                                        🔒 Soulbound
                                    </Text>
                                </View>

                                {/* Earned Date */}
                                <Text className="text-gray-500 text-xs mt-2">
                                    {badge.earnedDate}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Locked Badges */}
                    {lockedBadges.length > 0 && (
                        <>
                            <Text className="text-gray-400 text-sm font-semibold mb-3 mt-2">
                                Locked Badges
                            </Text>
                            <View className="flex-row flex-wrap gap-3">
                                {lockedBadges.map((badge) => (
                                    <View
                                        key={badge.id}
                                        className="w-[48%] bg-slate-800/30 rounded-2xl p-4 items-center opacity-60">
                                        <View className="w-20 h-20 rounded-full bg-gray-700 items-center justify-center mb-3">
                                            <Text className="text-4xl opacity-30">🔒</Text>
                                        </View>
                                        <Text className="text-gray-500 font-bold text-center text-sm mb-1">
                                            {badge.name}
                                        </Text>
                                        <Text className="text-gray-600 text-xs text-center mb-2">
                                            {badge.requirement}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>

                {/* Activity Timeline */}
                <View className="px-6 pb-6">
                    <Text className="text-white text-xl font-bold mb-4">
                        Recent Activity
                    </Text>
                    <View className="gap-2">
                        {ACTIVITIES.slice(0, 5).map((activity) => (
                            <View
                                key={activity.id}
                                className="bg-slate-800 rounded-xl p-4 flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-1">
                                        {activity.activity}
                                    </Text>
                                    <Text className="text-gray-500 text-xs">
                                        {activity.date}
                                    </Text>
                                </View>
                                <View className="bg-green-500/20 rounded-full px-3 py-1">
                                    <Text className="text-green-400 font-bold text-sm">
                                        +{activity.points}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Spacer */}
                <View className="h-24" />
            </ScrollView>

            {/* Badge Detail Modal */}
            {selectedBadge && (
                <BadgeDetailModal
                    badge={selectedBadge}
                    visible={showBadgeDetail}
                    onClose={() => setShowBadgeDetail(false)}
                />
            )}
        </View>
    );
}

// Badge Detail Modal Component
function BadgeDetailModal({
    badge,
    visible,
    onClose,
}: {
    badge: Badge;
    visible: boolean;
    onClose: () => void;
}) {
    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View className="flex-1 bg-slate-900">
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-12 pb-6">
                    <Text className="text-white text-2xl font-bold">Badge Details</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center">
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">
                    {/* Large Badge Display */}
                    <View className="items-center mb-8">
                        <View
                            className="w-40 h-40 rounded-full items-center justify-center mb-6"
                            style={{
                                backgroundColor: badge.gradient[0],
                                shadowColor: badge.gradient[0],
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.5,
                                shadowRadius: 20,
                                elevation: 15,
                            }}>
                            <Text className="text-8xl">{badge.emoji}</Text>
                        </View>
                        <Text className="text-white text-3xl font-bold text-center mb-2">
                            {badge.name}
                        </Text>
                        <Text className="text-gray-400 text-center text-base mb-4">
                            {badge.description}
                        </Text>
                        {badge.isSoulbound && (
                            <View className="bg-purple-500/20 rounded-full px-4 py-2">
                                <Text className="text-purple-400 font-bold">
                                    🔒 Soulbound NFT
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Badge Properties */}
                    <View className="bg-slate-800 rounded-3xl p-6 mb-6 gap-4">
                        <PropertyRow label="Type" value="NFT Badge" />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Status" value={badge.earned ? 'EARNED' : 'LOCKED'} valueColor={badge.earned ? '#10B981' : '#6B7280'} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Requirement" value={badge.requirement} />
                        {badge.earned && (
                            <>
                                <View className="h-px bg-slate-700" />
                                <PropertyRow label="Earned On" value={badge.earnedDate || '-'} />
                                <View className="h-px bg-slate-700" />
                                <PropertyRow label="Canton Contract" value={badge.contractId || 'Pending...'} mono />
                            </>
                        )}
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Transferable" value="No (Soulbound)" />
                    </View>

                    {/* Info Box */}
                    <View className="bg-slate-800/50 rounded-2xl p-4 mb-8">
                        <View className="flex-row items-start gap-3">
                            <Ionicons name="information-circle" size={24} color="#818CF8" />
                            <View className="flex-1">
                                <Text className="text-white font-semibold mb-2">
                                    About Soulbound NFTs
                                </Text>
                                <Text className="text-gray-400 text-sm">
                                    This badge is a non-transferable NFT (Soulbound Token) stored on Canton Network.
                                    It represents your verified achievements and cannot be sold or transferred to others.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {badge.earned && (
                        <TouchableOpacity className="bg-primary py-4 rounded-2xl flex-row items-center justify-center gap-2 mb-8">
                            <Ionicons name="share-social-outline" size={20} color="white" />
                            <Text className="text-white font-bold text-base">
                                Share Badge
                            </Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
}

function PropertyRow({
    label,
    value,
    valueColor,
    mono,
}: {
    label: string;
    value: string;
    valueColor?: string;
    mono?: boolean;
}) {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="text-gray-400 text-sm">{label}</Text>
            <Text
                className="text-white text-sm font-semibold max-w-[60%] text-right"
                style={{
                    color: valueColor || 'white',
                    fontFamily: mono ? 'monospace' : undefined,
                }}>
                {value}
            </Text>
        </View>
    );
}
