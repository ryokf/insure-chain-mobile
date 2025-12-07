import IntroPage from "@/src/pages/onboarding/IntroPage";
import { Image, Text, View } from "react-native";

const introItem: { id: string; mainComponent: React.ReactNode; subComponent?: React.ReactNode }[] = [
    {
        id: '1',
        mainComponent: (
            <Text className="text-7xl font-semibold leading-tight text-light mb-4">
                Your Digital Identity Wallet
            </Text>
        ),
        subComponent: (
            <Text className="text-2xl text-gray-300/70">
                Store verified credentials, request loans, and build reputation — all secured by Canton Network.
            </Text>
        ),
    },
    {
        id: '2',
        mainComponent: (
            <View className="items-center">
                <Image
                    className="w-72 h-72 mb-6"
                    source={require('@/assets/Onboard_Affordable.webp')} 
                    resizeMode="contain"
                />
            </View>
        ),
        subComponent: (
            <Text className="text-5xl text-center text-white mb-4">
                Tokenized Credentials as Real-World Assets
            </Text>
        ),
    },
    {
        id: '3',
        mainComponent: (
            <View className="items-center">
                <Image
                    className="w-72 h-72 mb-6"
                    source={require('@/assets/Onboard_instant.webp')} 
                    resizeMode="contain"
                />
            </View>
        ),
        subComponent: (
            <Text className="text-5xl text-center text-white mb-4">
                Use Your Diploma as Loan Collateral
            </Text>
        ),
    },
    {
        id: '4',
        mainComponent: (
            <View className="items-center">
                <Image
                    className="w-72 h-72 mb-6"
                    source={require('@/assets/Onboard_Transparent.webp')} 
                    resizeMode="contain"
                />
            </View>
        ),
        subComponent: (
            <Text className="text-[2.8rem] text-center text-white mb-4">
                Privacy-Preserving Verification with Zero-Knowledge Proofs
            </Text>
        ),
    },
];

export default function Intro() {
    return <IntroPage data={introItem} />
}
