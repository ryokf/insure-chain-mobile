import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type NavBarProps = Readonly<{
    activeTab?: 'home' | 'protection' | 'credentials' | 'settings';
    onTabPress?: (tab: 'home' | 'protection' | 'credentials' | 'settings') => void;
}>;

const navTabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'protection', label: 'Protections', icon: 'shield' },
    { id: 'credentials', label: 'Credentials', icon: 'file-document' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
] as const;

export default function NavBar({
    activeTab = 'home',
    onTabPress,
}: Readonly<NavBarProps>) {
    return (
        <View className="bg-dark border-t border-secondary/10 p-4 flex-row justify-around items-center">
            {navTabs.map((tab) => (
                <Pressable
                    key={tab.id}
                    onPress={() => onTabPress?.(tab.id as any)}
                    className="flex items-center py-2"
                >
                    <MaterialCommunityIcons
                        name={tab.icon as any}
                        size={24}
                        color={activeTab === tab.id ? '#516ac8' : '#f8f7f5'}
                    />
                    {activeTab === tab.id && (
                        <Text className="text-secondary text-xs mt-1 font-medium">{tab.label}</Text>
                    )}
                </Pressable>
            ))}
        </View>
    );
}
