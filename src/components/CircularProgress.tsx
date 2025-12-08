import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export type CircularProgressProps = Readonly<{
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    colors?: string[];
    className?: string;
}>;

/**
 * Circular progress indicator dengan gradient
 * Digunakan untuk live protection monitoring
 */
export default function CircularProgress({
    value,
    max = 100,
    size = 200,
    strokeWidth = 8,
    colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'],
    className = '',
}: Readonly<CircularProgressProps>) {
    const percentage = (value / max) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;
    const cx = size / 2;
    const cy = size / 2;

    return (
        <View className={`items-center justify-center ${className}`}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Defs>
                    <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {colors.map((color, i) => (
                            <Stop 
                                key={i}
                                offset={`${(i / (colors.length - 1)) * 100}%`}
                                stopColor={color}
                                stopOpacity={1}
                            />
                        ))}
                    </LinearGradient>
                </Defs>
                
                {/* Background circle */}
                <Circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth={strokeWidth}
                />
                
                {/* Progress circle */}
                <Circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation={-90}
                    origin={`${cx},${cy}`}
                />
            </Svg>
        </View>
    );
}
