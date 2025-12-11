import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type SensorStatusProps = Readonly<{
    name: string;
    status: 'aktif' | 'nonaktif' | 'warning';
    onPress?: () => void;
    onRequestPermission?: () => void;
    data?: string | null;
    showRequestButton?: boolean;
    className?: string;
}>;

const statusConfig = {
    aktif: {
        color: '#22c55e',
        icon: 'check-circle',
        label: 'Aktif',
    },
    nonaktif: {
        color: '#ef4444',
        icon: 'close-circle',
        label: 'Nonaktif',
    },
    warning: {
        color: '#eab308',
        icon: 'alert-circle',
        label: 'Peringatan',
    },
};

/**
 * Sensor status card untuk menampilkan status sensor
 */
export default function SensorStatus({
    name,
    status,
    onPress,
    onRequestPermission,
    data,
    showRequestButton = false,
    className = '',
}: Readonly<SensorStatusProps>) {
    const config = statusConfig[status];

    return (
        <Pressable 
            onPress={onPress}
            className={`bg-dark/50 border border-secondary/20 rounded-2xl px-4 py-4 flex-row items-center justify-between mb-3 ${className}`}
        >
            <View className="flex-row items-center gap-3 flex-1">
                <View className="w-12 h-12 rounded-full bg-secondary/10 items-center justify-center">
                    <MaterialCommunityIcons 
                        name={name.toLowerCase().includes('accelerometer') ? 'motion-sensor' : 
                               name.toLowerCase().includes('gyroscope') ? 'rotate-3d' : 
                               'map-marker'} 
                        size={24} 
                        color="#516ac8" 
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-light font-semibold text-sm">{name}</Text>
                    {data && (
                        <Text className="text-light/50 text-xs mt-1">{data}</Text>
                    )}
                </View>
            </View>
            
            <View className="flex-row items-center gap-2">
                {showRequestButton ? (
                    <Pressable
                        onPress={onRequestPermission}
                        className="bg-secondary/30 px-3 py-1 rounded"
                    >
                        <Text className="text-secondary text-xs font-semibold">Akses</Text>
                    </Pressable>
                ) : (
                    <>
                        <MaterialCommunityIcons 
                            name={config.icon as any} 
                            size={18} 
                            color={config.color} 
                        />
                        <Text className="text-xs font-semibold" style={{ color: config.color }}>
                            {config.label}
                        </Text>
                    </>
                )}
            </View>
        </Pressable>
    );
}
