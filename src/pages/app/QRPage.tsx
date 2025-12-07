import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type TabType = 'my-qr' | 'scan';

type CredentialType = {
    id: string;
    name: string;
    type: string;
    institution: string;
};

export default function QRPage() {
    const [activeTab, setActiveTab] = useState<TabType>('my-qr');
    const [selectedCredential, setSelectedCredential] =
        useState<CredentialType | null>(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showScanResult, setShowScanResult] = useState(false);
    const [scanResultData, setScanResultData] = useState<any>(null);

    // Mock data - akan diganti dengan data real dari Canton
    const credentials: CredentialType[] = [
        {
            id: '1',
            name: 'Bachelor of Computer Science',
            type: 'Academic Diploma',
            institution: 'Institut Teknologi Bandung (ITB)',
        },
    ];

    const handleGenerateQR = (credential: CredentialType) => {
        setSelectedCredential(credential);
        setShowQRModal(true);
    };

    const handleScanQR = () => {
        // Simulate scan - akan diganti dengan camera scanner
        setTimeout(() => {
            setScanResultData({
                valid: true,
                credentialName: 'Bachelor of Computer Science',
                holderName: 'Alex Ananda',
                institution: 'Institut Teknologi Bandung (ITB)',
                issueDate: '2024-06-15',
                verifiedOn: 'Canton Network',
                contractId: '0x742d...8f3a',
            });
            setShowScanResult(true);
        }, 1000);
    };

    const handleShare = () => {
        Alert.alert(
            'Share QR Code',
            'Choose sharing method',
            [
                { text: 'Save to Gallery', onPress: () => {} },
                { text: 'Share via Apps', onPress: () => {} },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <Text className="text-white text-3xl font-bold mb-2">
                        QR Code
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Share or verify credentials via QR
                    </Text>
                </View>

                {/* Tab Selector */}
                <View className="px-6 mb-6">
                    <View className="flex-row bg-slate-800 rounded-xl p-1">
                        <TouchableOpacity
                            onPress={() => setActiveTab('my-qr')}
                            className={`flex-1 py-3 rounded-lg ${
                                activeTab === 'my-qr' ? 'bg-indigo-500' : ''
                            }`}
                        >
                            <Text
                                className={`text-center font-semibold ${
                                    activeTab === 'my-qr'
                                        ? 'text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                My QR Code
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('scan')}
                            className={`flex-1 py-3 rounded-lg ${
                                activeTab === 'scan' ? 'bg-indigo-500' : ''
                            }`}
                        >
                            <Text
                                className={`text-center font-semibold ${
                                    activeTab === 'scan'
                                        ? 'text-white'
                                        : 'text-gray-400'
                                }`}
                            >
                                Scan QR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* My QR Tab */}
                {activeTab === 'my-qr' && (
                    <View className="px-6">
                        <Text className="text-white text-lg font-semibold mb-4">
                            Select Credential to Share
                        </Text>

                        {credentials.map((credential) => (
                            <TouchableOpacity
                                key={credential.id}
                                onPress={() => handleGenerateQR(credential)}
                                className="bg-slate-800 rounded-xl p-4 mb-3 border border-slate-700"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-12 h-12 rounded-full bg-green-500/20 items-center justify-center mr-4">
                                        <Ionicons
                                            name="school"
                                            size={24}
                                            color="#10B981"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold text-base mb-1">
                                            {credential.name}
                                        </Text>
                                        <Text className="text-gray-400 text-sm">
                                            {credential.institution}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color="#6B7280"
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}

                        {/* Info Box */}
                        <View className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-4">
                            <View className="flex-row items-start">
                                <Ionicons
                                    name="information-circle"
                                    size={20}
                                    color="#3B82F6"
                                    style={{ marginTop: 2, marginRight: 8 }}
                                />
                                <Text className="text-blue-300 text-sm flex-1">
                                    Your QR code is generated securely and
                                    contains a verification link to Canton
                                    Network. No personal data is exposed in the
                                    QR code itself.
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Scan QR Tab */}
                {activeTab === 'scan' && (
                    <View className="px-6">
                        {/* Scanner Placeholder */}
                        <View className="bg-slate-800 rounded-xl overflow-hidden mb-4">
                            <View className="aspect-square items-center justify-center border-2 border-dashed border-slate-600">
                                <View className="w-48 h-48 border-4 border-indigo-500 rounded-2xl items-center justify-center">
                                    <Ionicons
                                        name="scan"
                                        size={80}
                                        color="#818CF8"
                                    />
                                </View>
                                <Text className="text-gray-400 mt-6 text-center px-6">
                                    Position QR code within the frame
                                </Text>
                            </View>
                        </View>

                        {/* Scan Button */}
                        <TouchableOpacity
                            onPress={handleScanQR}
                            className="bg-indigo-500 rounded-xl py-4 mb-4"
                        >
                            <Text className="text-white text-center font-semibold text-base">
                                Simulate Scan (Demo)
                            </Text>
                        </TouchableOpacity>

                        {/* Instructions */}
                        <View className="bg-slate-800 rounded-xl p-4">
                            <Text className="text-white font-semibold mb-3">
                                How to Verify
                            </Text>
                            <View className="space-y-3">
                                <View className="flex-row items-start">
                                    <View className="w-6 h-6 rounded-full bg-indigo-500 items-center justify-center mr-3 mt-0.5">
                                        <Text className="text-white text-xs font-bold">
                                            1
                                        </Text>
                                    </View>
                                    <Text className="text-gray-300 text-sm flex-1">
                                        Ask the credential holder to show their
                                        QR code
                                    </Text>
                                </View>
                                <View className="flex-row items-start mt-3">
                                    <View className="w-6 h-6 rounded-full bg-indigo-500 items-center justify-center mr-3 mt-0.5">
                                        <Text className="text-white text-xs font-bold">
                                            2
                                        </Text>
                                    </View>
                                    <Text className="text-gray-300 text-sm flex-1">
                                        Position the QR code within the scanner
                                        frame
                                    </Text>
                                </View>
                                <View className="flex-row items-start mt-3">
                                    <View className="w-6 h-6 rounded-full bg-indigo-500 items-center justify-center mr-3 mt-0.5">
                                        <Text className="text-white text-xs font-bold">
                                            3
                                        </Text>
                                    </View>
                                    <Text className="text-gray-300 text-sm flex-1">
                                        View verification result from Canton
                                        Network
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Spacer */}
                <View className="h-32" />
            </ScrollView>

            {/* QR Code Modal */}
            <Modal
                visible={showQRModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowQRModal(false)}
            >
                <View className="flex-1 bg-black/80 justify-center items-center px-6">
                    <View className="bg-slate-800 rounded-2xl w-full max-w-md">
                        {/* Modal Header */}
                        <View className="flex-row items-center justify-between p-6 pb-4">
                            <Text className="text-white text-xl font-bold">
                                Share Credential
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowQRModal(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            className="max-h-[70vh]"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* QR Code Display */}
                            <View className="px-6 pb-6">
                                <View className="bg-white rounded-xl p-6 items-center mb-4">
                                    {/* QR Code Placeholder */}
                                    <View className="w-64 h-64 bg-black items-center justify-center rounded-lg mb-4">
                                        <View className="w-56 h-56 bg-white items-center justify-center">
                                            <Ionicons
                                                name="qr-code"
                                                size={200}
                                                color="#000000"
                                            />
                                        </View>
                                    </View>
                                    <Text className="text-slate-900 font-semibold text-center">
                                        {selectedCredential?.name}
                                    </Text>
                                    <Text className="text-slate-600 text-sm text-center mt-1">
                                        {selectedCredential?.institution}
                                    </Text>
                                </View>

                                {/* Credential Info */}
                                <View className="bg-slate-700/50 rounded-xl p-4 mb-4">
                                    <View className="flex-row items-center mb-3">
                                        <Ionicons
                                            name="shield-checkmark"
                                            size={16}
                                            color="#10B981"
                                        />
                                        <Text className="text-green-400 text-sm font-semibold ml-2">
                                            Verified on Canton Network
                                        </Text>
                                    </View>
                                    <Text className="text-gray-400 text-xs">
                                        This QR code contains a secure
                                        verification link that proves the
                                        authenticity of your credential without
                                        exposing private data.
                                    </Text>
                                </View>

                                {/* Share Button */}
                                <TouchableOpacity
                                    onPress={handleShare}
                                    className="bg-indigo-500 rounded-xl py-4 mb-3"
                                >
                                    <View className="flex-row items-center justify-center">
                                        <Ionicons
                                            name="share-social"
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                        <Text className="text-white font-semibold ml-2">
                                            Share QR Code
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowQRModal(false)}
                                    className="bg-slate-700 rounded-xl py-4"
                                >
                                    <Text className="text-white text-center font-semibold">
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Scan Result Modal */}
            <Modal
                visible={showScanResult}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowScanResult(false)}
            >
                <View className="flex-1 bg-black/80 justify-center items-center px-6">
                    <View className="bg-slate-800 rounded-2xl w-full max-w-md">
                        {/* Success Header */}
                        <LinearGradient
                            colors={['#10B981', '#059669']}
                            className="rounded-t-2xl p-6 items-center"
                        >
                            <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-3">
                                <Ionicons
                                    name="checkmark-circle"
                                    size={40}
                                    color="#FFFFFF"
                                />
                            </View>
                            <Text className="text-white text-2xl font-bold">
                                Verified ✓
                            </Text>
                            <Text className="text-green-100 text-center mt-2">
                                Credential is authentic and valid
                            </Text>
                        </LinearGradient>

                        <ScrollView
                            className="max-h-[60vh]"
                            showsVerticalScrollIndicator={false}
                        >
                            <View className="p-6">
                                {/* Credential Details */}
                                <View className="bg-slate-700/50 rounded-xl p-4 mb-4">
                                    <Text className="text-gray-400 text-xs mb-2">
                                        CREDENTIAL
                                    </Text>
                                    <Text className="text-white text-lg font-semibold mb-4">
                                        {scanResultData?.credentialName}
                                    </Text>

                                    <View className="space-y-3">
                                        <View>
                                            <Text className="text-gray-400 text-xs mb-1">
                                                Holder Name
                                            </Text>
                                            <Text className="text-white">
                                                {scanResultData?.holderName}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="text-gray-400 text-xs mb-1">
                                                Institution
                                            </Text>
                                            <Text className="text-white">
                                                {scanResultData?.institution}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="text-gray-400 text-xs mb-1">
                                                Issue Date
                                            </Text>
                                            <Text className="text-white">
                                                {scanResultData?.issueDate}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Verification Info */}
                                <View className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                                    <View className="flex-row items-center mb-2">
                                        <Ionicons
                                            name="shield-checkmark"
                                            size={16}
                                            color="#3B82F6"
                                        />
                                        <Text className="text-blue-300 text-sm font-semibold ml-2">
                                            Verified on{' '}
                                            {scanResultData?.verifiedOn}
                                        </Text>
                                    </View>
                                    <Text className="text-blue-300/70 text-xs">
                                        Contract ID: {scanResultData?.contractId}
                                    </Text>
                                </View>

                                {/* Action Buttons */}
                                <TouchableOpacity className="bg-indigo-500 rounded-xl py-4 mb-3">
                                    <View className="flex-row items-center justify-center">
                                        <Ionicons
                                            name="open-outline"
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                        <Text className="text-white font-semibold ml-2">
                                            View on Explorer
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowScanResult(false)}
                                    className="bg-slate-700 rounded-xl py-4"
                                >
                                    <Text className="text-white text-center font-semibold">
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
