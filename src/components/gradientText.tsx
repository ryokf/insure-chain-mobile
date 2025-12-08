import { Text } from "react-native";

const GradientText = ({ children, className }: { children?: string; className?: string }) => (
    <Text className={['text-accent', className || ''].join(' ')}>
        {children}
    </Text>
)

export default GradientText;