import IntroPage from "@/src/pages/onboarding/IntroPage";
import { Image, Text, View } from "react-native";

const introItem: { id: string; mainComponent: React.ReactNode; subComponent?: React.ReactNode }[] = [
    {
        id: '1',
        mainComponent: (
            <View className="items-center ">
                <Image
                    className="w-72 h-72 mb-6"
                    source={require('@/assets/Onboard_Affordable.webp')} 
                    resizeMode="contain"
                    />
            </View>
        ),
        subComponent: (
            <Text className="text-3xl text-center text-white mb-4">
                Buy micro insurance starting from $0.30 for 24 hours. No survey required, activated instantly.
            </Text>
        ),
    },
    {
        id: '2',
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
            <Text className="text-3xl text-center text-white mb-4">
                Smart sensors monitor your journey. Simply submit the vehicle condition, assistance and claims are processed automatically.
            </Text>
        ),
    },
    {
        id: '3',
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
            <Text className="text-3xl text-center text-white mb-4">
                Powered by Lisk Blockchain. Claim history is recorded permanently and transparently.
            </Text>
        ),
    },
    {
        id: '4',
        mainComponent: (
            <Text className="text-7xl font-semibold text-center leading-tight text-accent mb-4">
                Ready for a Safe Ride?
            </Text>
        ),
        subComponent: (
            <Text className="text-3xl text-center text-white mb-4">
                Create your digital wallet, activate the sensor, and enjoy peace of mind on every trip with InsureChain.
            </Text>
        ),
    },
];

export default function Intro() {
    return <IntroPage data={introItem} />
}
