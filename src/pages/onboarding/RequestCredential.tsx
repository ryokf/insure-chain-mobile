import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type University = {
    id: string;
    name: string;
    shortName: string;
};

const UNIVERSITIES: University[] = [
    { id: '1', name: 'Institut Teknologi Bandung', shortName: 'ITB' },
    { id: '2', name: 'Universitas Indonesia', shortName: 'UI' },
    { id: '3', name: 'Universitas Gadjah Mada', shortName: 'UGM' },
    { id: '4', name: 'Institut Teknologi Sepuluh Nopember', shortName: 'ITS' },
    { id: '5', name: 'Universitas Airlangga', shortName: 'UNAIR' },
];

export default function RequestCredential() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        studentId: '',
        university: '',
        degree: '',
        major: '',
        graduationYear: '',
        gpa: '',
    });
    const [showUniversityPicker, setShowUniversityPicker] = useState(false);
    const [selectedUniversity, setSelectedUniversity] =
        useState<University | null>(null);

    const handleUniversitySelect = (university: University) => {
        setSelectedUniversity(university);
        setFormData({ ...formData, university: university.name });
        setShowUniversityPicker(false);
    };

    const validateStep1 = () => {
        if (!formData.fullName.trim()) {
            Alert.alert('Required', 'Please enter your full name');
            return false;
        }
        if (!formData.studentId.trim()) {
            Alert.alert('Required', 'Please enter your student ID');
            return false;
        }
        if (!formData.university.trim()) {
            Alert.alert('Required', 'Please select your university');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.degree.trim()) {
            Alert.alert('Required', 'Please enter your degree');
            return false;
        }
        if (!formData.major.trim()) {
            Alert.alert('Required', 'Please enter your major');
            return false;
        }
        if (!formData.graduationYear.trim()) {
            Alert.alert('Required', 'Please enter your graduation year');
            return false;
        }
        if (!formData.gpa.trim()) {
            Alert.alert('Required', 'Please enter your GPA');
            return false;
        }

        // Validate GPA format
        const gpaNum = parseFloat(formData.gpa);
        if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
            Alert.alert('Invalid GPA', 'Please enter a valid GPA (0.00 - 4.00)');
            return false;
        }

        return true;
    };

    const handleNext = () => {
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
            }
        } else if (step === 2) {
            if (validateStep2()) {
                setStep(3);
            }
        }
    };

    const handleSubmit = () => {
        Alert.alert(
            'Request Submitted',
            'Your credential request has been sent to the university for verification. You will be notified once it is approved.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to home
                        router.replace('/(app)');
                    },
                },
            ]
        );
    };

    return (
        <View className="flex-1 bg-dark">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View
                    className="bg-primary pt-12 pb-8 px-6"
                >
                    <TouchableOpacity
                        onPress={() =>
                            step === 1 ? router.back() : setStep(step - 1)
                        }
                        className="mb-6"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>

                    <Text className="text-white text-3xl font-bold mb-2">
                        Request Credential
                    </Text>
                    <Text className="text-secondary/80 text-base">
                        Submit your academic credential for verification
                    </Text>

                    {/* Step Indicator */}
                    <View className="flex-row items-center mt-6">
                        <View
                            className={`flex-1 h-1 rounded-full ${
                                step >= 1 ? 'bg-white' : 'bg-white/30'
                            }`}
                        />
                        <View
                            className={`flex-1 h-1 rounded-full ml-2 ${
                                step >= 2 ? 'bg-white' : 'bg-white/30'
                            }`}
                        />
                        <View
                            className={`flex-1 h-1 rounded-full ml-2 ${
                                step >= 3 ? 'bg-white' : 'bg-white/30'
                            }`}
                        />
                    </View>
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-white text-xs font-semibold">
                            Personal
                        </Text>
                        <Text
                            className={`text-xs font-semibold ${
                                step >= 2 ? 'text-white' : 'text-white/50'
                            }`}
                        >
                            Academic
                        </Text>
                        <Text
                            className={`text-xs font-semibold ${
                                step >= 3 ? 'text-white' : 'text-white/50'
                            }`}
                        >
                            Review
                        </Text>
                    </View>
                </View>

                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <View className="px-6 py-6">
                        <Text className="text-white text-xl font-bold mb-6">
                            Personal Information
                        </Text>

                        {/* Full Name */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">
                                Full Name *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="Enter your full name"
                                placeholderTextColor="#6B7280"
                                value={formData.fullName}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, fullName: text })
                                }
                            />
                        </View>

                        {/* Student ID */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">
                                Student ID *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="Enter your student ID"
                                placeholderTextColor="#6B7280"
                                value={formData.studentId}
                                onChangeText={(text) =>
                                    setFormData({
                                        ...formData,
                                        studentId: text,
                                    })
                                }
                            />
                        </View>

                        {/* University */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">
                                University *
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    setShowUniversityPicker(
                                        !showUniversityPicker
                                    )
                                }
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 flex-row items-center justify-between"
                            >
                                <Text
                                    className={
                                        selectedUniversity
                                            ? 'text-white'
                                            : 'text-gray-500'
                                    }
                                >
                                    {selectedUniversity
                                        ? selectedUniversity.name
                                        : 'Select your university'}
                                </Text>
                                <Ionicons
                                    name={
                                        showUniversityPicker
                                            ? 'chevron-up'
                                            : 'chevron-down'
                                    }
                                    size={20}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>

                            {/* University Picker */}
                            {showUniversityPicker && (
                                <View className="mt-2 bg-dark/50 border border-dark/80 rounded-xl overflow-hidden">
                                    {UNIVERSITIES.map((uni, index) => (
                                        <TouchableOpacity
                                            key={uni.id}
                                            onPress={() =>
                                                handleUniversitySelect(uni)
                                            }
                                            className={`px-4 py-3 flex-row items-center justify-between ${
                                                index < UNIVERSITIES.length - 1
                                                    ? 'border-b border-dark/80'
                                                    : ''
                                            }`}
                                        >
                                            <View>
                                                <Text className="text-white font-semibold">
                                                    {uni.shortName}
                                                </Text>
                                                <Text className="text-gray-400 text-xs mt-1">
                                                    {uni.name}
                                                </Text>
                                            </View>
                                            {selectedUniversity?.id ===
                                                uni.id && (
                                                <Ionicons
                                                    name="checkmark-circle"
                                                    size={20}
                                                    color="#10B981"
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Info Box */}
                        <View className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-6">
                            <View className="flex-row items-start">
                                <Ionicons
                                    name="information-circle"
                                    size={20}
                                    color="#516ac8"
                                    style={{ marginTop: 2, marginRight: 8 }}
                                />
                                <Text className="text-secondary/80 text-sm flex-1">
                                    Your information will be sent to the
                                    university for verification. Make sure all
                                    details are accurate.
                                </Text>
                            </View>
                        </View>

                        {/* Next Button */}
                        <TouchableOpacity
                            onPress={handleNext}
                            className="bg-accent rounded-xl py-4"
                        >
                            <Text className="text-dark text-center font-semibold text-base">
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Step 2: Academic Information */}
                {step === 2 && (
                    <View className="px-6 py-6">
                        <Text className="text-white text-xl font-bold mb-6">
                            Academic Information
                        </Text>

                        {/* Degree */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">
                                Degree *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="e.g., Bachelor of Science"
                                placeholderTextColor="#6B7280"
                                value={formData.degree}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, degree: text })
                                }
                            />
                        </View>

                        {/* Major */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">
                                Major / Field of Study *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="e.g., Computer Science"
                                placeholderTextColor="#6B7280"
                                value={formData.major}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, major: text })
                                }
                            />
                        </View>

                        {/* Graduation Year */}
                        <View className="mb-4">
                            <Text className="text-gray-400 text-sm mb-2">
                                Graduation Year *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="e.g., 2024"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                maxLength={4}
                                value={formData.graduationYear}
                                onChangeText={(text) =>
                                    setFormData({
                                        ...formData,
                                        graduationYear: text,
                                    })
                                }
                            />
                        </View>

                        {/* GPA */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-sm mb-2">
                                GPA (4.0 scale) *
                            </Text>
                            <TextInput
                                className="bg-dark/50 border border-dark/80 rounded-xl px-4 py-3 text-white"
                                placeholder="e.g., 3.75"
                                placeholderTextColor="#6B7280"
                                keyboardType="decimal-pad"
                                value={formData.gpa}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, gpa: text })
                                }
                            />
                        </View>

                        {/* Info Box */}
                        <View className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                            <View className="flex-row items-start">
                                <Ionicons
                                    name="warning"
                                    size={20}
                                    color="#F59E0B"
                                    style={{ marginTop: 2, marginRight: 8 }}
                                />
                                <Text className="text-yellow-300 text-sm flex-1">
                                    The university will verify this information
                                    against their records. False information may
                                    result in request rejection.
                                </Text>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setStep(1)}
                                className="flex-1 bg-dark/50 border border-dark/80 rounded-xl py-4"
                            >
                                <Text className="text-white text-center font-semibold">
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleNext}
                                className="flex-1 bg-accent rounded-xl py-4"
                            >
                                <Text className="text-dark text-center font-semibold">
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Step 3: Review & Submit */}
                {step === 3 && (
                    <View className="px-6 py-6">
                        <Text className="text-white text-xl font-bold mb-6">
                            Review Your Request
                        </Text>

                        {/* Personal Information */}
                        <View className="bg-dark/50 border border-dark/80 rounded-xl p-4 mb-4">
                            <Text className="text-gray-400 text-xs font-semibold uppercase mb-3">
                                Personal Information
                            </Text>
                            <ReviewRow
                                label="Full Name"
                                value={formData.fullName}
                            />
                            <ReviewRow
                                label="Student ID"
                                value={formData.studentId}
                            />
                            <ReviewRow
                                label="University"
                                value={formData.university}
                            />
                        </View>

                        {/* Academic Information */}
                        <View className="bg-dark/50 border border-dark/80 rounded-xl p-4 mb-4">
                            <Text className="text-gray-400 text-xs font-semibold uppercase mb-3">
                                Academic Information
                            </Text>
                            <ReviewRow label="Degree" value={formData.degree} />
                            <ReviewRow label="Major" value={formData.major} />
                            <ReviewRow
                                label="Graduation Year"
                                value={formData.graduationYear}
                            />
                            <ReviewRow label="GPA" value={formData.gpa} />
                        </View>

                        {/* Next Steps */}
                        <View className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                            <View className="flex-row items-center mb-3">
                                <Ionicons
                                    name="checkmark-circle"
                                    size={20}
                                    color="#10B981"
                                />
                                <Text className="text-green-300 font-semibold ml-2">
                                    What happens next?
                                </Text>
                            </View>
                            <View className="space-y-2">
                                <View className="flex-row items-start mb-2">
                                    <Text className="text-green-300 text-sm mr-2">
                                        1.
                                    </Text>
                                    <Text className="text-green-300 text-sm flex-1">
                                        Your request will be sent to the
                                        university
                                    </Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <Text className="text-green-300 text-sm mr-2">
                                        2.
                                    </Text>
                                    <Text className="text-green-300 text-sm flex-1">
                                        University admin will verify your
                                        information
                                    </Text>
                                </View>
                                <View className="flex-row items-start">
                                    <Text className="text-green-300 text-sm mr-2">
                                        3.
                                    </Text>
                                    <Text className="text-green-300 text-sm flex-1">
                                        Once approved, your credential will be
                                        issued to your wallet
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setStep(2)}
                                className="flex-1 bg-dark/50 border border-dark/80 rounded-xl py-4"
                            >
                                <Text className="text-white text-center font-semibold">
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="flex-1 bg-accent rounded-xl py-4"
                            >
                                <Text className="text-dark text-center font-semibold">
                                    Submit Request
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Spacer */}
                <View className="h-20" />
            </ScrollView>
        </View>
    );
}

function ReviewRow({
    label,
    value,
}: Readonly<{ label: string; value: string }>) {
    return (
        <View className="flex-row justify-between py-2 border-b border-dark/80 last:border-b-0">
            <Text className="text-gray-400 text-sm">{label}</Text>
            <Text className="text-white text-sm font-semibold">{value}</Text>
        </View>
    );
}
