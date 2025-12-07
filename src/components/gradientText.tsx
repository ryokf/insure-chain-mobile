import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

const GradientText = ({ children, className }: { children?: string; className?: string }) => (
    <MaskedView maskElement={
    <Text className={className} style={{ color: '#000' }}>{children}</Text>}>
        <LinearGradient
            colors={["#9F8CF6", "#7EE6D9"]} // purple → aqua
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ alignSelf: 'flex-start' }}
        >
            {/* Ghost text untuk sizing mask */}
            <Text className={className} style={{ opacity: 0 }}>
                {children}
            </Text>
        </LinearGradient>
    </MaskedView>
)

export default GradientText;