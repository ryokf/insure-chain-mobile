import React from 'react';
import { Text, View } from 'react-native';

export type Step = {
    readonly id: string;
    readonly label: string;
};

export type StepIndicatorProps = {
    readonly currentStep: string;
    readonly steps: readonly Step[];
};

export default function StepIndicator({
    currentStep,
    steps,
}: Readonly<StepIndicatorProps>) {
    const isCompleted = (stepId: string): boolean => {
        const currentIndex = steps.findIndex((s) => s.id === currentStep);
        const stepIndex = steps.findIndex((s) => s.id === stepId);
        return stepIndex < currentIndex;
    };

    const isActive = (stepId: string): boolean => currentStep === stepId;

    return (
        <View className="flex-row items-center justify-between mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <View className="flex-1 items-center">
                        <View
                            className={`h-10 w-10 rounded-full flex-row items-center justify-center mb-2 ${
                                isActive(step.id) || isCompleted(step.id)
                                    ? 'bg-primary'
                                    : 'bg-gray-700'
                            }`}
                        >
                            {isCompleted(step.id) ? (
                                <Text className="text-white text-lg">✓</Text>
                            ) : (
                                <Text className="text-white font-bold text-sm">
                                    {index + 1}
                                </Text>
                            )}
                        </View>
                        <Text
                            className={`text-xs text-center ${
                                isActive(step.id) ? 'text-primary font-semibold' : 'text-gray-400'
                            }`}
                        >
                            {step.label}
                        </Text>
                    </View>

                    {index < steps.length - 1 && (
                        <View
                            className={`h-1 w-8 mb-6 ${
                                isCompleted(steps[index + 1].id) || isActive(steps[index + 1].id)
                                    ? 'bg-primary'
                                    : 'bg-gray-700'
                            }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </View>
    );
}
