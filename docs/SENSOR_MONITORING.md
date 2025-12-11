# Monitoring Page - Real Sensor Integration

## Overview
Monitoring page kini mengakses sensor real dari device:
- **Accelerometer**: Mengdeteksi gerakan/percepatan kendaraan
- **Gyroscope**: Mengdeteksi rotasi/putaran kendaraan
- **GPS (Location)**: Melacak koordinat kendaraan real-time

## Features

### 1. Real-Time Sensor Data
- Menampilkan data live dari setiap sensor
- Update interval: 1 detik
- Data ditampilkan dalam format readable di UI

### 2. Permission Management
- Automatic permission request saat app pertama kali dibuka
- Request permission button jika belum mendapat akses
- Status indicator untuk setiap sensor:
  - ✅ **Aktif**: Sensor berjalan dan data real-time ditampilkan
  - ⚠️ **Warning**: Sensor diminta permissionnya
  - ❌ **Nonaktif**: Permission ditolak, butuh manual request

### 3. Auto-Start Monitoring
- Monitoring otomatis dimulai saat halaman dimuat
- Graceful cleanup saat component unmount
- Handles permission errors dengan baik

## Technical Implementation

### Hook: `useSensorMonitoring`
Located at: `/src/hooks/useSensorMonitoring.ts`

```typescript
const {
    sensorData,      // Current sensor data (accelerometer, gyroscope, location)
    permissions,     // Permission status untuk setiap sensor
    isMonitoring,    // Boolean status monitoring
    startMonitoring, // Function untuk start monitoring semua sensor
    stopMonitoring,  // Function untuk stop monitoring
    requestSensorPermission, // Request permission untuk sensor spesifik
} = useSensorMonitoring();
```

### Sensor Data Types
```typescript
SensorData {
    accelerometer: { x: number, y: number, z: number } | null
    gyroscope: { x: number, y: number, z: number } | null
    location: { latitude: number, longitude: number, accuracy: number | null } | null
}

SensorStatus = 'idle' | 'requesting' | 'active' | 'denied'
```

## Permission Flow

### iOS
Requires entries di `app.json`:
- `NSMotionUsageDescription` - untuk accelerometer/gyroscope
- `NSLocationWhenInUseUsageDescription` - untuk GPS

### Android
Requires manifest permissions:
- `android.permission.ACCESS_FINE_LOCATION`
- `android.permission.ACCESS_COARSE_LOCATION`
- `android.permission.ACCESS_BACKGROUND_LOCATION`

## UI Components Updated

### SensorStatus Component
Enhanced dengan:
- Real-time data display
- Permission request button (saat belum akses)
- Dynamic status indicator
- Responsive layout

Props:
```typescript
{
    name: string;
    status: 'aktif' | 'nonaktif' | 'warning';
    data?: string | null;           // Real sensor data
    showRequestButton?: boolean;     // Tampilkan request button
    onRequestPermission?: () => void; // Callback saat request
}
```

## Usage Example

```tsx
import { useSensorMonitoring } from '@/src/hooks/useSensorMonitoring';

export default function MonitoringPage() {
    const { sensorData, permissions, requestSensorPermission } = useSensorMonitoring();

    return (
        <SensorStatus
            name="Accelerometer"
            status={sensorData.accelerometer ? 'aktif' : 'nonaktif'}
            data={sensorData.accelerometer ? 
                `X: ${sensorData.accelerometer.x}, Y: ${sensorData.accelerometer.y}, Z: ${sensorData.accelerometer.z}` : 
                null
            }
            showRequestButton={!sensorData.accelerometer}
            onRequestPermission={() => requestSensorPermission('accelerometer')}
        />
    );
}
```

## Data Update Intervals

- **Accelerometer**: 1 detik
- **Gyroscope**: 1 detik
- **GPS**: 1 detik (atau setiap 10 meter pergerakan)

## Error Handling

- Graceful fallback jika sensor tidak tersedia
- Status "denied" jika permission ditolak
- Console logging untuk debugging

## Debug Mode

Saat development (`__DEV__`), debug info ditampilkan di bawah emergency button:
- Permission status untuk setiap sensor
- Useful untuk testing permission flow

## Future Enhancements

1. Crash detection algorithm menggunakan accelerometer data
2. Route tracking dengan GPS history
3. Sensor calibration per device
4. Data persistence (local storage)
5. Real-time telemetry upload ke backend
