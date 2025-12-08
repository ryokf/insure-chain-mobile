import PrimaryButton from '@/src/components/primaryButton';
import SecondaryButton from '@/src/components/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Dummy seed phrase - sama seperti di ViewSeedPhrase
const DUMMY_SEED_PHRASE = [
    'abandon', 'ability', 'able', 'about', 'above', 'abroad',
    'absent', 'absorb', 'abstract', 'absurd', 'access', 'accident'
];

type QuizQuestion = {
    position: number; // Position ditanya (0-indexed)
    correctAnswer: string;
    options: string[]; // 4 pilihan jawaban
};

function getScoreIndicatorClass(
    index: number,
    score: number,
    currentQuestionIndex: number
): string {
    if (index < score) {
        return 'bg-green-500';
    }
    if (index === currentQuestionIndex) {
        return 'bg-primary';
    }
    return 'bg-gray-700';
}

function getButtonTitle(
    answered: boolean,
    isLastQuestion: boolean,
    allCorrect: boolean
): string {
    if (!answered) {
        return 'Select Answer';
    }
    if (isLastQuestion) {
        return allCorrect ? 'Next' : 'Try Again';
    }
    return 'Next Question';
}

function generateQuestions(seedPhrase: string[]): QuizQuestion[] {
    // Ambil 3 random positions untuk ditanya
    const positions = new Set<number>();
    while (positions.size < 3) {
        positions.add(Math.floor(Math.random() * seedPhrase.length));
    }

    return Array.from(positions).map((position) => {
        const correctAnswer = seedPhrase[position];
        
        // Generate 3 wrong answers dari seed phrase yang lain
        const wrongAnswers = seedPhrase
            .filter((_, index) => index !== position)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        // Shuffle opsi jawaban
        const options = [correctAnswer, ...wrongAnswers]
            .sort(() => Math.random() - 0.5);

        return {
            position,
            correctAnswer,
            options,
        };
    });
}

export default function ConfirmSeedPhrase() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // Generate questions on mount
        setQuestions(generateQuestions(DUMMY_SEED_PHRASE));
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const handleSelectAnswer = (answer: string) => {
        if (answered) return;

        setSelectedAnswer(answer);
        const correct = answer === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setAnswered(true);

        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setAnswered(false);
            setIsCorrect(null);
        } else {
            handleQuizComplete();
        }
    };

    const handleQuizComplete = () => {
        if (score === questions.length) {
            router.push('/(onboarding)/(create-wallet)/setup-password');
        } else {
            // Reset quiz for retry
            setQuestions(generateQuestions(DUMMY_SEED_PHRASE));
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setScore(0);
            setAnswered(false);
            setIsCorrect(null);
        }
    };

    if (!currentQuestion) {
        return (
            <View className="flex-1 bg-dark items-center justify-center">
                <Text className="text-white">Loading...</Text>
            </View>
        );
    }

    const allCorrect = score === questions.length;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header with Back Button */}
                <View className="flex-row items-center px-6 pt-6 pb-4">
                    <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
                        <Text className="text-2xl text-primary">←</Text>
                    </TouchableOpacity>
                </View>

                {/* Progress Indicator */}
                <View className="px-6 pb-4">
                    <View className="flex-row items-center gap-3 mb-2">
                        <View className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-primary"
                                style={{
                                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                                }}
                            />
                        </View>
                        <Text className="text-gray-400 text-sm">
                            {currentQuestionIndex + 1}/{questions.length}
                        </Text>
                    </View>
                </View>

                {/* Header */}
                <View className="px-6 pb-6">
                    <Text className="text-white text-3xl font-bold mb-2">
                        Confirm Seed Phrase
                    </Text>
                    <Text className="text-gray-400 text-base">
                        Verify your recovery phrase by answering the questions
                    </Text>
                </View>

                {/* Content */}
                <View className="flex-1 px-6 pb-8">
                    {/* Question Card */}
                    <View className="bg-dark/50 border border-dark/80 rounded-2xl p-6 mb-8">
                        {/* Question Text */}
                        <Text className="text-gray-400 text-sm mb-4">
                            What is word #{currentQuestion.position + 1}?
                        </Text>

                        {/* Large Question Display */}
                        <View className="items-center py-8 mb-8">
                            <Text className="text-6xl font-bold text-primary mb-2">
                                #{currentQuestion.position + 1}
                            </Text>
                            <View className="w-20 h-1 bg-primary rounded-full" />
                        </View>

                        {/* Score Tracker */}
                        <View className="flex-row items-center justify-center gap-2 py-4 px-4 bg-dark/80 rounded-lg">
                            <View className="flex-row gap-1">
                                {questions.map((question) => {
                                    const questionIndex = questions.indexOf(question);
                                    const indicatorClass = getScoreIndicatorClass(
                                        questionIndex,
                                        score,
                                        currentQuestionIndex
                                    );
                                    return (
                                        <View
                                            key={`pos-${question.position}`}
                                            className={`h-2 w-8 rounded-full ${indicatorClass}`}
                                        />
                                    );
                                })}
                            </View>
                            <Text className="text-gray-400 text-sm ml-2">
                                {score}/{questions.length} correct
                            </Text>
                        </View>
                    </View>

                    {/* Answer Feedback */}
                    {answered && (
                        <View
                            className={`rounded-xl p-4 mb-6 border flex-row items-center gap-3 ${
                                isCorrect
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-red-500/10 border-red-500/30'
                            }`}
                        >
                            <Ionicons
                                name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                                size={20}
                                color={isCorrect ? '#10B981' : '#EF4444'}
                            />
                            <View className="flex-1">
                                <Text
                                    className={`font-semibold text-sm ${
                                        isCorrect ? 'text-green-400' : 'text-red-400'
                                    }`}
                                >
                                    {isCorrect ? 'Correct!' : 'Incorrect'}
                                </Text>
                                {!isCorrect && (
                                    <Text className="text-red-300 text-xs mt-1">
                                        The correct answer is: <Text className="font-semibold">{currentQuestion.correctAnswer}</Text>
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}

                    {/* Answer Options */}
                    <View className="mb-8">
                        <Text className="text-gray-400 text-sm font-semibold mb-3">
                            Choose the correct word:
                        </Text>
                        <View className="gap-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected = selectedAnswer === option;
                                const isAnswerCorrect = option === currentQuestion.correctAnswer;

                                let buttonStyle = 'bg-slate-700/50 border-slate-600';
                                if (answered && isSelected) {
                                    buttonStyle = isAnswerCorrect
                                        ? 'bg-green-500/20 border-green-500'
                                        : 'bg-red-500/20 border-red-500';
                                } else if (answered && isAnswerCorrect) {
                                    buttonStyle = 'bg-green-500/20 border-green-500';
                                }

                                return (
                                    <TouchableOpacity
                                        key={`option-${option}`}
                                        onPress={() => handleSelectAnswer(option)}
                                        disabled={answered}
                                        className={`border rounded-xl p-4 ${buttonStyle} ${
                                            answered ? 'opacity-70' : ''
                                        }`}
                                    >
                                        <Text className="text-white font-semibold text-base">
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Spacer */}
                    <View className="flex-1" />

                    {/* Completion Message */}
                    {isLastQuestion && answered && allCorrect && (
                        <View className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                            <View className="flex-row items-start gap-3">
                                <Ionicons
                                    name="checkmark-circle"
                                    size={20}
                                    color="#10B981"
                                />
                                <View className="flex-1">
                                    <Text className="text-green-400 font-semibold text-sm">
                                        Perfect Score!
                                    </Text>
                                    <Text className="text-green-300 text-xs mt-1">
                                        You&apos;ve successfully verified your seed phrase.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {isLastQuestion && answered && !allCorrect && (
                        <View className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                            <View className="flex-row items-start gap-3">
                                <Ionicons
                                    name="warning"
                                    size={20}
                                    color="#F59E0B"
                                />
                                <View className="flex-1">
                                    <Text className="text-orange-400 font-semibold text-sm">
                                        Try Again
                                    </Text>
                                    <Text className="text-orange-300 text-xs mt-1">
                                        You got {score}/{questions.length} correct. Please try again.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Button Container */}
            <View className="px-6 pb-10 gap-3">
                <PrimaryButton
                    title={getButtonTitle(answered, isLastQuestion, allCorrect)}
                    onPress={handleNext}
                    disabled={answered === false}
                />
                <SecondaryButton
                    title="Back"
                    onPress={() => router.back()}
                />
            </View>
        </View>
    );
}
