import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';

const BiometricSwitch = () => {

    const [authenticated, setAuthenticated] = useState(false);

    const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        console.log("compatible", compatible);
    };

    const checkForBiometrics = async () => {
        let biometricRecords = await LocalAuthentication.isEnrolledAsync();
        console.log("biometricRecords", biometricRecords);
    };

    const authenticate = async () => {
        let result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            setAuthenticated(true);
        } else {
            Alert.alert("Authentication failed");
        }
    };

    return (
        <View className=" rounded-xl px-2 py-2" >
            <View className="flex-row items-center justify-between mb-4">
                <View>
                    <Text className="text-white font-semibold mb-1">
                        Biometric Security
                    </Text>
                    <Text className="text-gray-400 text-xs">
                        Enable faster access to your wallet
                    </Text>
                </View>
                <Switch
                    value={authenticated}
                    onValueChange={() => {
                    if (authenticated) {
                        setAuthenticated(false);
                        return;
                    }
                    checkDeviceForHardware();
                    checkForBiometrics();
                    authenticate();
                }}
                    trackColor={{ false: '#475569', true: '#516ac8' }}
                    thumbColor={authenticated ? '#516ac8' : '#94A3B8'}
                />
            </View>
        </View>

    )
}

export default BiometricSwitch