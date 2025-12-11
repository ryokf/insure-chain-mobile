import * as Location from 'expo-location';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useState } from 'react';

export type SensorStatus = 'idle' | 'requesting' | 'active' | 'denied';

export type SensorData = {
    accelerometer: {
        x: number;
        y: number;
        z: number;
    } | null;
    gyroscope: {
        x: number;
        y: number;
        z: number;
    } | null;
    location: {
        latitude: number;
        longitude: number;
        accuracy: number | null;
    } | null;
};

export type SensorPermissions = {
    accelerometerStatus: SensorStatus;
    gyroscopeStatus: SensorStatus;
    locationStatus: SensorStatus;
};

/**
 * Hook untuk mengakses data sensor (Accelerometer, Gyroscope, GPS)
 * dan mengelola permission
 */
export function useSensorMonitoring() {
    const [sensorData, setSensorData] = useState<SensorData>({
        accelerometer: null,
        gyroscope: null,
        location: null,
    });

    const [permissions, setPermissions] = useState<SensorPermissions>({
        accelerometerStatus: 'idle',
        gyroscopeStatus: 'idle',
        locationStatus: 'idle',
    });

    const [isMonitoring, setIsMonitoring] = useState(false);

    // Request dan setup Accelerometer
    const setupAccelerometer = async () => {
        try {
            setPermissions((prev) => ({
                ...prev,
                accelerometerStatus: 'requesting',
            }));

            // Set update interval (default untuk expo-sensors)
            Accelerometer.setUpdateInterval(1000);

            // Subscribe to accelerometer updates
            const subscription = Accelerometer.addListener((data) => {
                setSensorData((prev) => ({
                    ...prev,
                    accelerometer: {
                        x: parseFloat(data.x.toFixed(2)),
                        y: parseFloat(data.y.toFixed(2)),
                        z: parseFloat(data.z.toFixed(2)),
                    },
                }));
            });

            setPermissions((prev) => ({
                ...prev,
                accelerometerStatus: 'active',
            }));

            return subscription;
        } catch (error) {
            console.error('Accelerometer error:', error);
            setPermissions((prev) => ({
                ...prev,
                accelerometerStatus: 'denied',
            }));
            return null;
        }
    };

    // Request dan setup Gyroscope
    const setupGyroscope = async () => {
        try {
            setPermissions((prev) => ({
                ...prev,
                gyroscopeStatus: 'requesting',
            }));

            // Set update interval
            Gyroscope.setUpdateInterval(1000);

            // Subscribe to gyroscope updates
            const subscription = Gyroscope.addListener((data) => {
                setSensorData((prev) => ({
                    ...prev,
                    gyroscope: {
                        x: parseFloat(data.x.toFixed(2)),
                        y: parseFloat(data.y.toFixed(2)),
                        z: parseFloat(data.z.toFixed(2)),
                    },
                }));
            });

            setPermissions((prev) => ({
                ...prev,
                gyroscopeStatus: 'active',
            }));

            return subscription;
        } catch (error) {
            console.error('Gyroscope error:', error);
            setPermissions((prev) => ({
                ...prev,
                gyroscopeStatus: 'denied',
            }));
            return null;
        }
    };

    // Request dan setup Location (GPS)
    const setupLocation = async () => {
        try {
            setPermissions((prev) => ({
                ...prev,
                locationStatus: 'requesting',
            }));

            // Request permission
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setPermissions((prev) => ({
                    ...prev,
                    locationStatus: 'denied',
                }));
                return null;
            }

            // Start watching location updates
            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10, // Update setiap 10 meter
                },
                (location) => {
                    setSensorData((prev) => ({
                        ...prev,
                        location: {
                            latitude: parseFloat(location.coords.latitude.toFixed(6)),
                            longitude: parseFloat(location.coords.longitude.toFixed(6)),
                            accuracy: location.coords.accuracy ? parseFloat(location.coords.accuracy.toFixed(2)) : null,
                        },
                    }));
                }
            );

            setPermissions((prev) => ({
                ...prev,
                locationStatus: 'active',
            }));

            return subscription;
        } catch (error) {
            console.error('Location error:', error);
            setPermissions((prev) => ({
                ...prev,
                locationStatus: 'denied',
            }));
            return null;
        }
    };

    // Start monitoring all sensors
    const startMonitoring = async () => {
        try {
            setIsMonitoring(true);

            const subscriptions = await Promise.all([
                setupAccelerometer(),
                setupGyroscope(),
                setupLocation(),
            ]);

            return subscriptions.filter(Boolean);
        } catch (error) {
            console.error('Monitoring setup error:', error);
            setIsMonitoring(false);
        }
    };

    // Stop monitoring
    const stopMonitoring = (subscriptions: any[]) => {
        subscriptions.forEach((sub) => sub?.remove?.());
        setIsMonitoring(false);
    };

    // Request individual sensor permission
    const requestSensorPermission = async (sensorType: 'accelerometer' | 'gyroscope' | 'location') => {
        if (sensorType === 'accelerometer') {
            await setupAccelerometer();
        } else if (sensorType === 'gyroscope') {
            await setupGyroscope();
        } else if (sensorType === 'location') {
            await setupLocation();
        }
    };

    return {
        sensorData,
        permissions,
        isMonitoring,
        startMonitoring,
        stopMonitoring,
        requestSensorPermission,
    };
}
