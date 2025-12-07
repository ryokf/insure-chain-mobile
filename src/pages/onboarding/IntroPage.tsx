import { PrimaryButton } from '@/src/components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
const { width, height: screenHeight } = Dimensions.get("window");

type Item = {
    id: string;
    mainComponent: React.ReactNode;
    subComponent?: React.ReactNode;
};
type Props = Readonly<{
    data: Item[];
    autoPlay?: boolean;
    intervalMs?: number;
    height?: number;
    onDone?: () => void;
}>;

export default function IntroPage({
    data,
    autoPlay = false,
    intervalMs = 3000,
    height = screenHeight * 65 / 100,
    onDone,
}: Props) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<Item>>(null);
    const [index, setIndex] = useState(0);

    // Auto-play (opsional)
    useEffect(() => {
        if (!autoPlay || data.length <= 1) return;
        const id = setInterval(() => {
            const next = (index + 1) % data.length;
            (flatListRef.current as any)?.scrollToIndex({ index: next, animated: true });
            setIndex(next);
        }, intervalMs);
        return () => clearInterval(id);
    }, [autoPlay, intervalMs, index, data.length]);

    // Lacak index saat swipe
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems?.[0]?.index != null) setIndex(viewableItems[0].index);
    }).current;

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

    const handlePrevious = () => {
        const previousIndex = index > 0 ? index - 1 : data.length - 1;
        (flatListRef.current as any)?.scrollToIndex({
            index: previousIndex,
            animated: true,
        });
        setIndex(previousIndex);
    };

    const handleNext = () => {
        const nextIndex = index < data.length - 1 ? index + 1 : 0;
        (flatListRef.current as any)?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });
        setIndex(nextIndex);
    };

    const handleSkip = () => {
        (flatListRef.current as any)?.scrollToIndex({
            index: data.length - 1,
            animated: true,
        });
        setIndex(data.length - 1);
    }

    return (
        <View className="flex-1 bg-dark">
            <View className="flex-1">
                <Image 
                    source={require('@/assets/Logo-Insure-Chain.webp')}
                    className="w-14 h-14 rounded-full mx-8 mt-2" 
                    resizeMode="contain"
                />
                <Animated.FlatList
                    // @ts-ignore - Animated.FlatList ref typing issue
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    decelerationRate="fast"
                    snapToInterval={width}
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    className="flex-1"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewConfigRef.current}
                    renderItem={({ item }) => (
                        <View className="flex-row bg-dark" style={{ width, height }}>
                            <View className="flex-1 py-12 justify-between px-6">
                                {/* Small circle */}
                                {item.mainComponent}
                                {/* Headline */}
                                {item.subComponent}
                            </View>
                        </View>
                    )}
                />

                {/* Dots indicator */}
                {data && data.length > 0 && (
                    <View
                        className="absolute left-0 right-0 flex-row justify-center items-center gap-2"
                        style={{ top: "79%", zIndex: 10, elevation: 10 }}
                        pointerEvents="none"
                    >
                        {data.map((item, i) => {
                            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: "clamp",
                            });
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [1, 1.4, 1],
                                extrapolate: "clamp",
                            });
                            return (
                                <Animated.View
                                    key={item.id}
                                    className="aspect-square w-3 rounded-full bg-primary"
                                    style={{ opacity, transform: [{ scale }] }}
                                />
                            );
                        })}
                    </View>
                )}

                {/* Done button on last slide (jika disediakan onDone) */}
                {/* {onDone && data.length > 0 && index === data.length - 1 && ( */}
                {/* <View className="absolute bottom-10 left-0 right-0 items-center px-5"> */}
                <View className="">
                    {
                        index < data.length - 1 && (

                            <View className="flex flex-row justify-between w-full">
                                <TouchableOpacity
                                    onPress={handlePrevious}
                                    className="w-[15%] mx-5 my-12 border border-white rounded-full aspect-square justify-center items-center"
                                >
                                    <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSkip}
                                    className="min-w-[20%] mx-5 my-10 aspect-square justify-center items-center"
                                >
                                    <Text className='text-white font-semibold'>
                                        Skip Now
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleNext}
                                    className="w-[15%] mx-5 my-12 border border-white rounded-full aspect-square justify-center items-center"
                                >
                                    <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
                                </TouchableOpacity>

                                {/* <SecondaryButton
                            title="Import Existing Wallet"
                            className="mb-4"
                            onPress={() => router.push('/(onboarding)/(import-wallet)')}
                            />
                            <PrimaryButton
                            title="Create New Wallet"
                            onPress={() => router.push('/(onboarding)/(create-wallet)')}
                            /> */}
                            </View>
                        )
                    }
                    {
                        index === data.length - 1 && (
                            <View className="px-6 pb-10">
                            <PrimaryButton
                            title="Get Started"
                            className="mb-4"
                            onPress={() => router.push('/(onboarding)/(create-wallet)')}
                            />
                            </View>
                        )
                    }
                </View>
                {/* )} */}
            </View>
        </View>
    );
}
