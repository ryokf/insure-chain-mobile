import { authenticateWithBiometric } from '@/src/services/biometric-auth';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Loan = {
    id: string;
    amount: number;
    interestRate: number;
    duration: number; // days
    purpose: string;
    collateral: {
        id: string;
        name: string;
        type: string;
    };
    status: 'pending' | 'active' | 'completed' | 'defaulted';
    requestedAt: string;
    approvedAt?: string;
    dueDate?: string;
    totalDue?: number;
    amountPaid?: number;
};

type Credential = {
    id: string;
    name: string;
    type: string;
    assetValue: number;
};

const DUMMY_LOANS: Loan[] = [
    // Will be populated when user requests loan
];

const AVAILABLE_CREDENTIALS: Credential[] = [
    {
        id: '1',
        name: 'Bachelor of Computer Science',
        type: 'Diploma',
        assetValue: 95,
    },
];

export default function LoansPage() {
    const [loans] = useState<Loan[]>(DUMMY_LOANS);
    const [showRequestModal, setShowRequestModal] = useState(false);

    const activeLoans = loans.filter(l => l.status === 'active');
    const pendingLoans = loans.filter(l => l.status === 'pending');
    const completedLoans = loans.filter(l => l.status === 'completed');

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View>
                            <Text className="text-white text-3xl font-bold">
                                Loans
                            </Text>
                            <Text className="text-gray-400 text-sm mt-1">
                                Borrow with your credentials
                            </Text>
                        </View>
                        <TouchableOpacity 
                            className="w-12 h-12 rounded-full bg-primary items-center justify-center"
                            onPress={() => setShowRequestModal(true)}
                            style={{
                                shadowColor: '#818CF8',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 6,
                            }}>
                            <Ionicons name="add" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {loans.length > 0 ? (
                    <>
                        {/* Active Loans */}
                        {activeLoans.length > 0 && (
                            <View className="px-6 pb-6">
                                <Text className="text-white text-xl font-bold mb-4">
                                    Active Loans
                                </Text>
                                <View className="gap-4">
                                    {activeLoans.map((loan) => (
                                        <ActiveLoanCard key={loan.id} loan={loan} />
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Pending Loans */}
                        {pendingLoans.length > 0 && (
                            <View className="px-6 pb-6">
                                <Text className="text-white text-xl font-bold mb-4">
                                    Pending Approval
                                </Text>
                                <View className="gap-4">
                                    {pendingLoans.map((loan) => (
                                        <PendingLoanCard key={loan.id} loan={loan} />
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Completed Loans */}
                        {completedLoans.length > 0 && (
                            <View className="px-6 pb-6">
                                <Text className="text-white text-xl font-bold mb-4">
                                    Loan History
                                </Text>
                                <View className="gap-3">
                                    {completedLoans.map((loan) => (
                                        <CompletedLoanCard key={loan.id} loan={loan} />
                                    ))}
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <View className="flex-1 items-center justify-center px-6 py-12">
                        <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center mb-6">
                            <Ionicons name="cash-outline" size={48} color="#818CF8" />
                        </View>
                        <Text className="text-white text-2xl font-bold text-center mb-2">
                            No Active Loans
                        </Text>
                        <Text className="text-gray-400 text-center mb-8 max-w-xs">
                            Use your verified credentials as collateral to request a microloan
                        </Text>
                        <TouchableOpacity 
                            className="bg-primary px-8 py-4 rounded-full"
                            onPress={() => setShowRequestModal(true)}>
                            <Text className="text-white font-semibold text-base">
                                Request Your First Loan
                            </Text>
                        </TouchableOpacity>

                        {/* Info Box */}
                        <View className="mt-8 bg-slate-800/50 rounded-2xl p-4 w-full">
                            <View className="flex-row items-start gap-3">
                                <Ionicons name="information-circle" size={24} color="#818CF8" />
                                <View className="flex-1">
                                    <Text className="text-white font-semibold mb-2">
                                        How It Works
                                    </Text>
                                    <Text className="text-gray-400 text-sm mb-2">
                                        1. Select a credential as collateral
                                    </Text>
                                    <Text className="text-gray-400 text-sm mb-2">
                                        2. Choose loan amount and duration
                                    </Text>
                                    <Text className="text-gray-400 text-sm mb-2">
                                        3. Lender verifies your credential
                                    </Text>
                                    <Text className="text-gray-400 text-sm">
                                        4. Get approved and receive funds
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Benefits Box */}
                <View className="mx-6 mb-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-4">
                    <View className="flex-row items-center gap-2 mb-3">
                        <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                        <Text className="text-white font-bold">
                            Credential-Backed Lending
                        </Text>
                    </View>
                    <Text className="text-gray-300 text-sm">
                        Your diploma is tokenized as a Real-World Asset on Canton Network. 
                        Borrow without traditional collateral, repay on time to boost your reputation.
                    </Text>
                </View>

                {/* Spacer */}
                <View className="h-24" />
            </ScrollView>

            {/* Loan Request Modal */}
            <LoanRequestModal
                visible={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                availableCredentials={AVAILABLE_CREDENTIALS}
            />
        </View>
    );
}

// Active Loan Card Component
function ActiveLoanCard({ loan }: { loan: Loan }) {
    const progress = loan.amountPaid ? (loan.amountPaid / (loan.totalDue || loan.amount)) * 100 : 0;
    const daysRemaining = loan.dueDate ? 
        Math.ceil((new Date(loan.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

    return (
        <View className="bg-slate-800 rounded-3xl overflow-hidden"
            style={{
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 6,
            }}>
            {/* Header */}
            <View className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex-row items-center justify-between">
                <View>
                    <Text className="text-white/80 text-xs mb-1">Loan Amount</Text>
                    <Text className="text-white text-3xl font-bold">
                        ${loan.amount}
                    </Text>
                </View>
                <View className="bg-white/20 rounded-full px-4 py-2">
                    <Text className="text-white font-bold">ACTIVE</Text>
                </View>
            </View>

            {/* Content */}
            <View className="p-6">
                {/* Progress */}
                <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-gray-400 text-sm">Repayment Progress</Text>
                        <Text className="text-white font-semibold">{progress.toFixed(0)}%</Text>
                    </View>
                    <View className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <View 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </View>
                </View>

                {/* Details Grid */}
                <View className="flex-row items-center justify-between mb-4">
                    <View>
                        <Text className="text-gray-400 text-xs mb-1">Interest Rate</Text>
                        <Text className="text-white font-semibold">{loan.interestRate}%</Text>
                    </View>
                    <View>
                        <Text className="text-gray-400 text-xs mb-1">Total Due</Text>
                        <Text className="text-white font-semibold">${loan.totalDue || loan.amount}</Text>
                    </View>
                    <View>
                        <Text className="text-gray-400 text-xs mb-1">Days Left</Text>
                        <Text className="text-white font-semibold">{daysRemaining}d</Text>
                    </View>
                </View>

                {/* Collateral */}
                <View className="bg-slate-700/50 rounded-2xl p-3 mb-4">
                    <Text className="text-gray-400 text-xs mb-1">Collateral</Text>
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="document-text" size={16} color="#10B981" />
                        <Text className="text-white font-semibold flex-1">
                            {loan.collateral.name}
                        </Text>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity className="bg-primary py-3 rounded-2xl">
                    <Text className="text-white text-center font-bold">
                        Make Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Pending Loan Card Component
function PendingLoanCard({ loan }: { loan: Loan }) {
    return (
        <View className="bg-slate-800 rounded-2xl p-5">
            <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-2 h-2 rounded-full bg-yellow-500" />
                        <Text className="text-yellow-500 font-semibold text-sm">
                            Pending Approval
                        </Text>
                    </View>
                    <Text className="text-white text-2xl font-bold mb-1">
                        ${loan.amount}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        Requested {loan.requestedAt}
                    </Text>
                </View>
                <Ionicons name="time-outline" size={28} color="#F59E0B" />
            </View>

            <View className="bg-slate-700/50 rounded-xl p-3">
                <Text className="text-gray-400 text-xs mb-1">Purpose</Text>
                <Text className="text-white font-semibold">{loan.purpose}</Text>
            </View>
        </View>
    );
}

// Completed Loan Card Component
function CompletedLoanCard({ loan }: { loan: Loan }) {
    return (
        <View className="bg-slate-800/50 rounded-xl p-4 flex-row items-center gap-4">
            <View className="w-12 h-12 rounded-full bg-green-500/20 items-center justify-center">
                <Ionicons name="checkmark-circle" size={28} color="#10B981" />
            </View>
            <View className="flex-1">
                <Text className="text-white font-semibold mb-1">
                    ${loan.amount} Loan Repaid
                </Text>
                <Text className="text-gray-400 text-xs">
                    Completed • {loan.requestedAt}
                </Text>
            </View>
            <Text className="text-green-400 font-bold">+50 pts</Text>
        </View>
    );
}

// Loan Request Modal Component
function LoanRequestModal({
    visible,
    onClose,
    availableCredentials,
}: {
    visible: boolean;
    onClose: () => void;
    availableCredentials: Credential[];
}) {
    const [step, setStep] = useState(1); // 1: Select Collateral, 2: Loan Details, 3: Review
    const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
    const [loanAmount, setLoanAmount] = useState(500);
    const [duration, setDuration] = useState(30);
    const [purpose, setPurpose] = useState('');

    const interestRate = 8; // Base rate, can be adjusted by CZEN points
    const totalDue = loanAmount * (1 + interestRate / 100);

    const handleSubmit = async () => {
        if (!selectedCredential || !purpose) {
            Alert.alert('Error', 'Please complete all fields');
            return;
        }

        // Request biometric authentication before submitting
        const authenticated = await authenticateWithBiometric(
            'Confirm loan request'
        );

        if (!authenticated) {
            Alert.alert(
                'Authentication Failed',
                'Biometric authentication is required to submit loan request.'
            );
            return;
        }

        // TODO: Submit to Canton Network
        Alert.alert(
            'Success',
            'Loan request submitted! You will be notified when a lender approves.',
            [{ text: 'OK', onPress: () => {
                onClose();
                setStep(1);
                setSelectedCredential(null);
                setPurpose('');
            }}]
        );
    };

    const resetModal = () => {
        setStep(1);
        setSelectedCredential(null);
        setPurpose('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View className="flex-1 bg-slate-900">
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-12 pb-6">
                    <Text className="text-white text-2xl font-bold">
                        Request Loan
                    </Text>
                    <TouchableOpacity
                        onPress={resetModal}
                        className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center">
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Step Indicator */}
                <View className="px-6 pb-6 flex-row items-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <View
                            key={s}
                            className={`flex-1 h-1 rounded-full ${
                                s <= step ? 'bg-primary' : 'bg-slate-700'
                            }`}
                        />
                    ))}
                </View>

                <ScrollView className="flex-1 px-6">
                    {step === 1 && (
                        /* Step 1: Select Collateral */
                        <View>
                            <Text className="text-white text-xl font-bold mb-2">
                                Select Collateral
                            </Text>
                            <Text className="text-gray-400 mb-6">
                                Choose a credential to use as loan collateral
                            </Text>

                            <View className="gap-4">
                                {availableCredentials.map((cred) => (
                                    <TouchableOpacity
                                        key={cred.id}
                                        onPress={() => setSelectedCredential(cred)}
                                        className={`bg-slate-800 rounded-2xl p-5 border-2 ${
                                            selectedCredential?.id === cred.id
                                                ? 'border-primary'
                                                : 'border-transparent'
                                        }`}>
                                        <View className="flex-row items-center gap-3 mb-3">
                                            <View className="w-12 h-12 rounded-full bg-green-500/20 items-center justify-center">
                                                <Ionicons name="school" size={24} color="#10B981" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-white font-bold text-base">
                                                    {cred.name}
                                                </Text>
                                                <Text className="text-gray-400 text-sm">
                                                    {cred.type}
                                                </Text>
                                            </View>
                                            {selectedCredential?.id === cred.id && (
                                                <Ionicons name="checkmark-circle" size={24} color="#818CF8" />
                                            )}
                                        </View>
                                        <View className="bg-slate-700/50 rounded-xl p-3">
                                            <Text className="text-gray-400 text-xs mb-1">Asset Value</Text>
                                            <Text className="text-white font-bold">
                                                {'⭐'.repeat(Math.round(cred.assetValue / 20))}
                                                {' '}
                                                {cred.assetValue}/100
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {step === 2 && selectedCredential && (
                        /* Step 2: Loan Details */
                        <View>
                            <Text className="text-white text-xl font-bold mb-2">
                                Loan Details
                            </Text>
                            <Text className="text-gray-400 mb-6">
                                Configure your loan terms
                            </Text>

                            {/* Loan Amount */}
                            <View className="mb-6">
                                <Text className="text-white font-semibold mb-3">Loan Amount</Text>
                                <View className="flex-row gap-3">
                                    {[100, 250, 500, 750, 1000].map((amount) => (
                                        <TouchableOpacity
                                            key={amount}
                                            onPress={() => setLoanAmount(amount)}
                                            className={`flex-1 py-4 rounded-xl border-2 ${
                                                loanAmount === amount
                                                    ? 'bg-primary/20 border-primary'
                                                    : 'bg-slate-800 border-slate-700'
                                            }`}>
                                            <Text className={`text-center font-bold text-sm ${
                                                loanAmount === amount ? 'text-primary' : 'text-gray-400'
                                            }`}>
                                                ${amount}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Duration */}
                            <View className="mb-6">
                                <Text className="text-white font-semibold mb-3">
                                    Loan Duration
                                </Text>
                                <View className="flex-row gap-3">
                                    {[30, 60, 90].map((d) => (
                                        <TouchableOpacity
                                            key={d}
                                            onPress={() => setDuration(d)}
                                            className={`flex-1 py-3 rounded-xl border-2 ${
                                                duration === d
                                                    ? 'bg-primary/20 border-primary'
                                                    : 'bg-slate-800 border-slate-700'
                                            }`}>
                                            <Text className={`text-center font-bold ${
                                                duration === d ? 'text-primary' : 'text-gray-400'
                                            }`}>
                                                {d} days
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Purpose */}
                            <View className="mb-6">
                                <Text className="text-white font-semibold mb-3">
                                    Loan Purpose
                                </Text>
                                <TextInput
                                    className="bg-slate-800 text-white rounded-2xl px-4 py-4"
                                    placeholder="e.g., Bootcamp enrollment, certification course"
                                    placeholderTextColor="#6B7280"
                                    value={purpose}
                                    onChangeText={setPurpose}
                                    multiline
                                />
                            </View>

                            {/* Summary Box */}
                            <View className="bg-slate-800 rounded-2xl p-5">
                                <Text className="text-white font-bold mb-4">Loan Summary</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Principal</Text>
                                        <Text className="text-white font-semibold">${loanAmount}</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Interest ({interestRate}%)</Text>
                                        <Text className="text-white font-semibold">
                                            ${(loanAmount * interestRate / 100).toFixed(2)}
                                        </Text>
                                    </View>
                                    <View className="h-px bg-slate-700" />
                                    <View className="flex-row justify-between">
                                        <Text className="text-white font-bold">Total Due</Text>
                                        <Text className="text-primary text-xl font-bold">
                                            ${totalDue.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 3 && selectedCredential && (
                        /* Step 3: Review & Submit */
                        <View>
                            <Text className="text-white text-xl font-bold mb-2">
                                Review & Submit
                            </Text>
                            <Text className="text-gray-400 mb-6">
                                Confirm your loan request details
                            </Text>

                            {/* Collateral Info */}
                            <View className="bg-slate-800 rounded-2xl p-5 mb-4">
                                <Text className="text-gray-400 text-sm mb-3">Collateral</Text>
                                <View className="flex-row items-center gap-3">
                                    <View className="w-12 h-12 rounded-full bg-green-500/20 items-center justify-center">
                                        <Ionicons name="school" size={24} color="#10B981" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold">
                                            {selectedCredential.name}
                                        </Text>
                                        <Text className="text-gray-400 text-sm">
                                            Asset Value: {selectedCredential.assetValue}/100
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Loan Terms */}
                            <View className="bg-slate-800 rounded-2xl p-5 mb-4">
                                <Text className="text-gray-400 text-sm mb-3">Loan Terms</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Amount</Text>
                                        <Text className="text-white font-semibold">${loanAmount}</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Duration</Text>
                                        <Text className="text-white font-semibold">{duration} days</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Interest Rate</Text>
                                        <Text className="text-white font-semibold">{interestRate}%</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-white font-bold">Total Due</Text>
                                        <Text className="text-primary font-bold">${totalDue.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Purpose */}
                            <View className="bg-slate-800 rounded-2xl p-5 mb-6">
                                <Text className="text-gray-400 text-sm mb-2">Purpose</Text>
                                <Text className="text-white">{purpose}</Text>
                            </View>

                            {/* Info Box */}
                            <View className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                                <View className="flex-row gap-3">
                                    <Ionicons name="information-circle" size={24} color="#818CF8" />
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold mb-2">
                                            Next Steps
                                        </Text>
                                        <Text className="text-gray-300 text-sm">
                                            After submission, your request will be visible to lenders. 
                                            They will verify your credential and may approve your loan. 
                                            You'll receive a notification when approved.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Action Buttons */}
                <View className="px-6 pb-8 pt-4 bg-slate-900">
                    {step < 3 ? (
                        <View className="flex-row gap-3">
                            {step > 1 && (
                                <TouchableOpacity
                                    onPress={() => setStep(step - 1)}
                                    className="flex-1 bg-slate-800 py-4 rounded-2xl">
                                    <Text className="text-white text-center font-bold">
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                onPress={() => {
                                    if (step === 1 && !selectedCredential) {
                                        Alert.alert('Error', 'Please select a collateral');
                                        return;
                                    }
                                    if (step === 2 && !purpose) {
                                        Alert.alert('Error', 'Please enter loan purpose');
                                        return;
                                    }
                                    setStep(step + 1);
                                }}
                                className="flex-1 bg-primary py-4 rounded-2xl">
                                <Text className="text-white text-center font-bold">
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setStep(step - 1)}
                                className="flex-1 bg-slate-800 py-4 rounded-2xl">
                                <Text className="text-white text-center font-bold">
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="flex-1 bg-primary py-4 rounded-2xl">
                                <Text className="text-white text-center font-bold">
                                    Submit Request
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}
