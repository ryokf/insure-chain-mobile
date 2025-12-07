import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native';

type Credential = {
    id: string;
    type: 'diploma' | 'certificate' | 'license';
    name: string;
    issuer: string;
    issuedDate: string;
    expiryDate?: string;
    assetValue: number; // 0-100
    status: 'active' | 'expired' | 'revoked';
    contractId: string;
    metadata: {
        degree?: string;
        major?: string;
        year?: number;
        gpa?: string;
    };
};

const DUMMY_CREDENTIALS: Credential[] = [
    {
        id: '1',
        type: 'diploma',
        name: 'Bachelor of Computer Science',
        issuer: 'Institut Teknologi Bandung',
        issuedDate: 'November 20, 2025',
        assetValue: 95,
        status: 'active',
        contractId: '0xABC123...DEF456',
        metadata: {
            degree: 'Bachelor of Computer Science',
            major: 'Software Engineering',
            year: 2025,
            gpa: '3.85',
        },
    },
];

export default function DocumentsPage() {
    const [credentials] = useState<Credential[]>(DUMMY_CREDENTIALS);
    const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleViewDetail = (credential: Credential) => {
        setSelectedCredential(credential);
        setShowDetailModal(true);
    };

    const handleUseAsCollateral = (credential: Credential) => {
        setShowDetailModal(false);
        // TODO: Navigate to loan request with selected credential
        // Will be implemented after creating loans page
        console.log('Use credential as collateral:', credential.id);
    };

    const getAssetValueStars = (value: number) => {
        const stars = Math.round(value / 20); // 0-100 to 0-5 stars
        return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View>
                            <Text className="text-white text-3xl font-bold">
                                My Credentials
                            </Text>
                            <Text className="text-gray-400 text-sm mt-1">
                                Your tokenized identity assets
                            </Text>
                        </View>
                        <TouchableOpacity 
                            className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center"
                            onPress={() => router.push('/(app)/qr')}>
                            <Ionicons name="qr-code-outline" size={22} color="#818CF8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {credentials.length > 0 ? (
                    <>
                        {/* Credentials List */}
                        <View className="px-6 pb-6 gap-4">
                            {credentials.map((credential) => (
                                <TouchableOpacity
                                    key={credential.id}
                                    onPress={() => handleViewDetail(credential)}
                                    className="bg-slate-800 rounded-3xl overflow-hidden"
                                    style={{
                                        shadowColor: '#10B981',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}>
                                    {/* Top Banner */}
                                    <View className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <Ionicons name="school" size={20} color="white" />
                                            <Text className="text-white font-semibold">
                                                {credential.type.toUpperCase()}
                                            </Text>
                                        </View>
                                        <View className="bg-white/20 rounded-full px-3 py-1">
                                            <Text className="text-white text-xs font-bold">
                                                TOKENIZED
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Content */}
                                    <View className="p-6">
                                        <Text className="text-white text-xl font-bold mb-2">
                                            {credential.name}
                                        </Text>
                                        
                                        <View className="flex-row items-center gap-2 mb-4">
                                            <Ionicons name="business" size={16} color="#9CA3AF" />
                                            <Text className="text-gray-400 text-sm">
                                                {credential.issuer}
                                            </Text>
                                        </View>

                                        {/* Asset Value */}
                                        <View className="bg-slate-700/50 rounded-2xl p-4 mb-4">
                                            <Text className="text-gray-400 text-xs mb-1">Asset Value</Text>
                                            <Text className="text-2xl mb-1">
                                                {getAssetValueStars(credential.assetValue)}
                                            </Text>
                                            <Text className="text-gray-400 text-xs">
                                                Trust Score: {credential.assetValue}/100
                                            </Text>
                                        </View>

                                        {/* Meta Info */}
                                        <View className="flex-row items-center justify-between">
                                            <View>
                                                <Text className="text-gray-500 text-xs">Issued</Text>
                                                <Text className="text-gray-300 text-sm font-semibold">
                                                    {credential.issuedDate}
                                                </Text>
                                            </View>
                                            <View className="bg-green-500/20 rounded-full px-3 py-1">
                                                <Text className="text-green-400 text-xs font-bold">
                                                    ✓ {credential.status.toUpperCase()}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Action Buttons */}
                                    <View className="border-t border-slate-700 flex-row">
                                        <TouchableOpacity 
                                            className="flex-1 py-4 items-center flex-row justify-center gap-2"
                                            onPress={() => handleViewDetail(credential)}>
                                            <Ionicons name="eye-outline" size={18} color="#818CF8" />
                                            <Text className="text-primary font-semibold">View Details</Text>
                                        </TouchableOpacity>
                                        <View className="w-px bg-slate-700" />
                                        <TouchableOpacity 
                                            className="flex-1 py-4 items-center flex-row justify-center gap-2"
                                            onPress={() => handleUseAsCollateral(credential)}>
                                            <Ionicons name="cash-outline" size={18} color="#10B981" />
                                            <Text className="text-green-400 font-semibold">Use as Collateral</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Canton Network Badge */}
                        <View className="mx-6 mb-6 bg-slate-800/50 rounded-2xl p-4 flex-row items-center gap-3">
                            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                                <Ionicons name="shield-checkmark" size={20} color="#818CF8" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-semibold mb-1">
                                    Secured by Canton Network
                                </Text>
                                <Text className="text-gray-400 text-xs">
                                    Your credentials are tokenized as Real-World Assets with privacy-preserving verification
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    /* Empty State */
                    <View className="flex-1 items-center justify-center px-6 py-12">
                        <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center mb-6">
                            <Ionicons name="document-text" size={48} color="#818CF8" />
                        </View>
                        <Text className="text-white text-2xl font-bold text-center mb-2">
                            No Credentials Yet
                        </Text>
                        <Text className="text-gray-400 text-center mb-8 max-w-xs">
                            Request your first credential from your institution to get started
                        </Text>
                        <TouchableOpacity className="bg-primary px-8 py-4 rounded-full">
                            <Text className="text-white font-semibold text-base">
                                Request Credential
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Spacer */}
                <View className="h-24" />
            </ScrollView>

            {/* Credential Detail Modal */}
            {selectedCredential && (
                <CredentialDetailModal
                    credential={selectedCredential}
                    visible={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    onUseAsCollateral={() => handleUseAsCollateral(selectedCredential)}
                />
            )}
        </View>
    );
}

// Credential Detail Modal Component
function CredentialDetailModal({
    credential,
    visible,
    onClose,
    onUseAsCollateral,
}: {
    credential: Credential;
    visible: boolean;
    onClose: () => void;
    onUseAsCollateral: () => void;
}) {
    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View className="flex-1 bg-slate-900">
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-12 pb-6">
                    <Text className="text-white text-2xl font-bold">Credential Details</Text>
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center">
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">
                    {/* Large Icon */}
                    <View className="items-center mb-8">
                        <View className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 items-center justify-center mb-4"
                            style={{
                                shadowColor: '#10B981',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.4,
                                shadowRadius: 16,
                                elevation: 10,
                            }}>
                            <Ionicons name="school" size={64} color="white" />
                        </View>
                        <Text className="text-white text-2xl font-bold text-center mb-2">
                            {credential.name}
                        </Text>
                        <Text className="text-gray-400 text-center">
                            {credential.issuer}
                        </Text>
                    </View>

                    {/* Properties */}
                    <View className="bg-slate-800 rounded-3xl p-6 mb-6 gap-4">
                        <PropertyRow label="Type" value={credential.type.toUpperCase()} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Degree" value={credential.metadata.degree || '-'} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Major" value={credential.metadata.major || '-'} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Year" value={credential.metadata.year?.toString() || '-'} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="GPA" value={credential.metadata.gpa || '-'} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Asset Value" value={`${credential.assetValue}/100`} />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow label="Status" value={credential.status.toUpperCase()} valueColor="#10B981" />
                        <View className="h-px bg-slate-700" />
                        <PropertyRow 
                            label="Canton Contract" 
                            value={credential.contractId} 
                            mono 
                        />
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-8">
                        <TouchableOpacity 
                            className="bg-primary py-4 rounded-2xl"
                            onPress={onUseAsCollateral}>
                            <Text className="text-white text-center font-bold text-base">
                                Use as Loan Collateral
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity className="bg-slate-800 py-4 rounded-2xl flex-row items-center justify-center gap-2">
                            <Ionicons name="share-outline" size={20} color="white" />
                            <Text className="text-white text-center font-semibold text-base">
                                Share Credential (QR)
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity className="bg-slate-800 py-4 rounded-2xl flex-row items-center justify-center gap-2">
                            <Ionicons name="eye-outline" size={20} color="white" />
                            <Text className="text-white text-center font-semibold text-base">
                                View on Canton Explorer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

function PropertyRow({ 
    label, 
    value, 
    valueColor, 
    mono 
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
