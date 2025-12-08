import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AlertBox from '../../components/AlertBox';
import CircularProgress from '../../components/CircularProgress';
import GradientHeader from '../../components/GradientHeader';
import NavBar from '../../components/NavBar';
import SensorStatus from '../../components/SensorStatus';

export type MonitoringPageProps = Readonly<{
    onNavigate?: (page: 'home' | 'protection' | 'credentials' | 'settings') => void;
}>;

export default function MonitoringPage({ onNavigate }: MonitoringPageProps) {
    const [activeTab, setActiveTab] = React.useState<'home' | 'protection' | 'credentials' | 'settings'>('protection');

    const handleTabPress = (tab: 'home' | 'protection' | 'credentials' | 'settings') => {
        setActiveTab(tab);
        onNavigate?.(tab);
    };

    return (
        <View className="flex-1 bg-dark">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <GradientHeader className="px-4 pt-6 pb-8 rounded-b-3xl overflow-hidden">
                    <Text className="text-light text-2xl font-bold">Live Protection</Text>
                    <Text className="text-light/60 text-sm mt-2">Monitoring realtime aktif</Text>
                </GradientHeader>

                {/* Circular Progress Section */}
                <View className="px-4 mt-8 items-center mb-2">
                    <CircularProgress value={95} max={100} size={180} strokeWidth={6} />
                    <Text className="text-secondary text-2xl font-bold mt-6">Berkendara Anda Aman</Text>
                </View>

                {/* Status Sensor Section */}
                <View className="px-4 mt-8">
                    <Text className="text-light text-lg font-bold mb-4">Status Sensor</Text>
                    <SensorStatus 
                        name="Accelerometer" 
                        status="aktif"
                    />
                    <SensorStatus 
                        name="Gyroscope" 
                        status="aktif"
                    />
                    <SensorStatus 
                        name="GPS Location" 
                        status="aktif"
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
                        }}
                    />
                </View>
            </ScrollView>

            {/* NavBar */}
            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
    );
}
