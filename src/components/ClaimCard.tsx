import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ClaimCardProps = Readonly<{
    claimId: string;
    date: string;
    policyId: string;
    amount: string;
    status: 'completed' | 'pending' | 'rejected';
    steps: Array<{
        label: string;
        time: string;
        completed: boolean;
    }>;
    actionLabel?: string;
    onAction?: () => void;
}>;

const statusConfig = {
    completed: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500',
        label: 'Selesai',
    },
    pending: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500',
        label: 'Pending',
    },
    rejected: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        badge: 'bg-red-500',
        label: 'Ditolak',
    },
};

/**
 * Claim card component untuk menampilkan detail klaim
 */
export default function ClaimCard({
    claimId,
    date,
    policyId,
    amount,
    status,
    steps,
    actionLabel,
    onAction,
}: Readonly<ClaimCardProps>) {
    const config = statusConfig[status];
    const amountValue = amount.includes('-') ? amount : `+${amount}`;
    const amountColor = amount.includes('-') ? 'text-emerald-500' : 'text-emerald-500';

    return (
        <View className={`${config.bg} ${config.border} border rounded-2xl p-4 mb-4`}>
            {/* Header dengan ID dan Status Badge */}
            <View className="flex-row justify-between items-start mb-3">
                <View>
                    <Text className="text-light font-bold text-base">{claimId}</Text>
                    <Text className="text-light/50 text-xs mt-1">{date}</Text>
                    <Text className="text-light/50 text-xs">Policy ID: {policyId}</Text>
                </View>
                <View className={`${config.badge} px-3 py-1 rounded-full`}>
                    <Text className="text-white text-xs font-semibold">{config.label}</Text>
                </View>
            </View>

            {/* Amount */}
            <View className="mb-4">
                <Text className={`${amountColor} text-xl font-bold`}>{amountValue}</Text>
                <Text className="text-light/50 text-xs">Rp {amount.replace('+', '').replace('-', '')}</Text>
            </View>

            {/* Steps */}
            <View className="space-y-2 mb-4">
                {steps.map((step, index) => (
                    <View key={index} className="flex-row items-center gap-2">
                        <View
                            className={`w-5 h-5 rounded-full items-center justify-center ${
                                step.completed ? 'bg-emerald-500' : 'bg-dark/50 border border-light/30'
                            }`}
                        >
                            {step.completed && (
                                <MaterialCommunityIcons name="check" size={12} color="white" />
                            )}
                        </View>
                        <View className="flex-1">
                            <Text className="text-light text-sm">{step.label}</Text>
                            <Text className="text-light/50 text-xs">{step.time}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Action Button */}
            {actionLabel && (
                <View
                    className="bg-accent rounded-lg py-3 items-center"
                >
                    <Text className="text-dark font-semibold text-sm">{actionLabel}</Text>
                </View>
            )}
        </View>
    );
}
