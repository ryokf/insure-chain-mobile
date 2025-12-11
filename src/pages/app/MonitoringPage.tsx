import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AlertBox from '../../components/AlertBox';
import CircularProgress from '../../components/CircularProgress';
import NavBar from '../../components/NavBar';
import SensorStatus from '../../components/SensorStatus';
import { useSensorMonitoring } from '../../hooks/useSensorMonitoring';

export type MonitoringPageProps = Readonly<{
    onNavigate?: (page: 'home' | 'protection' | 'credentials' | 'settings') => void;
}>;

type SensorStatusType = 'aktif' | 'nonaktif' | 'warning';

export default function MonitoringPage({ onNavigate }: MonitoringPageProps) {
    const [activeTab, setActiveTab] = React.useState<'home' | 'protection' | 'credentials' | 'settings'>('protection');
    const subscriptionsRef = useRef<any[]>([]);

    const {
        sensorData,
        permissions,
        isMonitoring,
        startMonitoring,
        stopMonitoring,
        requestSensorPermission,
    } = useSensorMonitoring();

    const handleTabPress = (tab: 'home' | 'protection' | 'credentials' | 'settings') => {
        setActiveTab(tab);
        onNavigate?.(tab);
    };

    // Auto-start monitoring on component mount
    useEffect(() => {
        const initMonitoring = async () => {
            const subs = await startMonitoring();
            subscriptionsRef.current = subs || [];
        };

        initMonitoring();

        return () => {
            if (subscriptionsRef.current.length > 0) {
                stopMonitoring(subscriptionsRef.current);
            }
        };
    }, []);

    // Format sensor data untuk display
    const formatAccelerometerData = () => {
        if (!sensorData.accelerometer) return null;
        const { x, y, z } = sensorData.accelerometer;
        return `X: ${x}, Y: ${y}, Z: ${z}`;
    };

    const formatGyroscopeData = () => {
        if (!sensorData.gyroscope) return null;
        const { x, y, z } = sensorData.gyroscope;
        return `X: ${x}, Y: ${y}, Z: ${z}`;
    };

    const formatLocationData = () => {
        if (!sensorData.location) return null;
        const { latitude, longitude, accuracy } = sensorData.location;
        return `${latitude}, ${longitude}`;
    };

    // Helper untuk convert permission status ke UI status
    const getStatusFromPermission = (status: string): SensorStatusType => {
        if (status === 'active') return 'aktif';
        if (status === 'denied') return 'nonaktif';
        return 'warning';
    };

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <View className="px-4 pt-6 pb-8 rounded-b-3xl overflow-hidden bg-gradient-to-b from-primary to-dark">
                    <Text className="text-light text-2xl font-bold">Live Protection</Text>
                    <Text className="text-light/60 text-sm mt-2">Monitoring realtime aktif</Text>
                </View>

                {/* Circular Progress Section */}
                <View className="px-4 mt-8 items-center mb-2">
                    <CircularProgress value={95} max={100} size={180} strokeWidth={6} />
                    <Text className="text-secondary text-2xl font-bold mt-6">Berkendara Anda Aman</Text>
                    <Text className="text-light/50 text-xs mt-2">
                        {isMonitoring ? '✓ Semua sensor aktif' : '⚠ Menunggu sensor...'}
                    </Text>
                </View>

                {/* Status Sensor Section */}
                <View className="px-4 mt-8">
                    <Text className="text-light text-lg font-bold mb-4">Status Sensor</Text>

                    {/* Accelerometer */}
                    <SensorStatus
                        name="Accelerometer"
                        status={getStatusFromPermission(permissions.accelerometerStatus)}
                        data={formatAccelerometerData()}
                        showRequestButton={permissions.accelerometerStatus === 'idle' || permissions.accelerometerStatus === 'denied'}
                        onRequestPermission={() => requestSensorPermission('accelerometer')}
                    />

                    {/* Gyroscope */}
                    <SensorStatus
                        name="Gyroscope"
                        status={getStatusFromPermission(permissions.gyroscopeStatus)}
                        data={formatGyroscopeData()}
                        showRequestButton={permissions.gyroscopeStatus === 'idle' || permissions.gyroscopeStatus === 'denied'}
                        onRequestPermission={() => requestSensorPermission('gyroscope')}
                    />

                    {/* GPS Location */}
                    <SensorStatus
                        name="GPS Location"
                        status={getStatusFromPermission(permissions.locationStatus)}
                        data={formatLocationData()}
                        showRequestButton={permissions.locationStatus === 'idle' || permissions.locationStatus === 'denied'}
                        onRequestPermission={() => requestSensorPermission('location')}
                    />
                </View>

                {/* Alert/Warning Section */}
                <View className="px-4 mt-8 mb-4">
                    <AlertBox
                        type="danger"
                        title="Tombol Darurat"
                        description="Tekan jika terjadi kecelakaan"
                        actionLabel="Laporkan Kecelakaan"
                        onAction={() => {
                            // Handle emergency report
                            console.log('Emergency reported!');
                        }}
                    />
                </View>

                {/* Debug Info */}
                {__DEV__ && (
                    <View className="px-4 mt-8 mb-4 bg-dark/50 border border-secondary/20 rounded-lg p-4">
                        <Text className="text-light text-xs font-mono">
                            Debug Info:
                            {'\n'}Accel: {permissions.accelerometerStatus}
                            {'\n'}Gyro: {permissions.gyroscopeStatus}
                            {'\n'}Location: {permissions.locationStatus}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* NavBar */}
            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
    );
}
