import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Notification = {
    id: string;
    type: 'security' | 'loan' | 'credential' | 'reputation' | 'info';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
};

const DUMMY_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'loan',
        title: 'Loan Request Received',
        message:
            'Your loan request for $500 is being reviewed by potential lenders',
        timestamp: '2 hours ago',
        read: false,
    },
    {
        id: '2',
        type: 'credential',
        title: 'Credential Issued',
        message:
            'Your diploma credential from ITB has been issued and added to your wallet',
        timestamp: '5 hours ago',
        read: false,
    },
    {
        id: '3',
        type: 'reputation',
        title: 'New Badge Earned!',
        message:
            'Congratulations! You earned the "Verified Graduate" NFT badge',
        timestamp: 'Yesterday',
        read: true,
    },
    {
        id: '4',
        type: 'reputation',
        title: 'CZEN Points Earned',
        message: 'You earned +50 CZEN Points for completing identity verification',
        timestamp: '2 days ago',
        read: true,
    },
    {
        id: '5',
        type: 'security',
        title: 'Biometric Enabled',
        message: 'Face ID authentication has been successfully enabled',
        timestamp: '3 days ago',
        read: true,
    },
    {
        id: '6',
        type: 'info',
        title: 'Welcome to CzenID',
        message:
            'Your wallet has been created. Start by requesting your first credential!',
        timestamp: '4 days ago',
        read: true,
    },
];

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const filteredNotifications = showUnreadOnly
        ? notifications.filter((n) => !n.read)
        : notifications;

    const handleMarkAsRead = (id: string) => {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'security':
                return 'shield-checkmark';
            case 'loan':
                return 'cash';
            case 'credential':
                return 'document-text';
            case 'reputation':
                return 'star';
            case 'info':
                return 'information-circle';
            default:
                return 'bell';
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'security':
                return '#EF4444';
            case 'loan':
                return '#516ac8';
            case 'credential':
                return '#10B981';
            case 'reputation':
                return '#EC4899';
            case 'info':
                return '#3B82F6';
            default:
                return '#516ac8';
        }
    };

    return (
        <View className="flex-1 bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-8 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="chevron-back" size={28} color="#516ac8" />
                            </TouchableOpacity>
                            <Text className="text-white text-3xl font-bold">
                                Notifications
                            </Text>
                        </View>
                    </View>
                    {unreadCount > 0 && (
                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-400 text-sm">
                                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                            </Text>
                            {unreadCount > 0 && (
                                <TouchableOpacity onPress={handleMarkAllAsRead}>
                                    <Text className="text-primary text-sm font-semibold">
                                        Mark all as read
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                {/* Filter Tabs */}
                <View className="px-6 pb-4 flex-row gap-3">
                    <TouchableOpacity
                        onPress={() => setShowUnreadOnly(false)}
                        className={`px-4 py-2 rounded-full ${
                            !showUnreadOnly
                                ? 'bg-primary/20 border border-primary'
                                : 'bg-slate-800 border border-slate-700'
                        }`}
                    >
                        <Text
                            className={
                                !showUnreadOnly
                                    ? 'text-primary font-semibold text-sm'
                                    : 'text-gray-400 font-semibold text-sm'
                            }
                        >
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowUnreadOnly(true)}
                        className={`px-4 py-2 rounded-full ${
                            showUnreadOnly
                                ? 'bg-primary/20 border border-primary'
                                : 'bg-slate-800 border border-slate-700'
                        }`}
                    >
                        <Text
                            className={
                                showUnreadOnly
                                    ? 'text-primary font-semibold text-sm'
                                    : 'text-gray-400 font-semibold text-sm'
                            }
                        >
                            Unread ({unreadCount})
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Notifications List */}
                <View className="px-6 pb-8">
                    {filteredNotifications.length > 0 ? (
                        <View className="gap-3">
                            {filteredNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onPress={() => handleMarkAsRead(notification.id)}
                                    iconColor={getNotificationColor(notification.type)}
                                    iconName={getNotificationIcon(notification.type)}
                                />
                            ))}
                        </View>
                    ) : (
                        <View className="items-center justify-center py-12">
                            <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-4">
                                <Ionicons name="notifications" size={40} color="#516ac8" />
                            </View>
                            <Text className="text-white text-lg font-bold text-center mb-2">
                                No Notifications
                            </Text>
                            <Text className="text-gray-400 text-center">
                                {showUnreadOnly
                                    ? 'You&apos;re all caught up!'
                                    : 'No notifications yet'}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Spacer */}
                <View className="h-8" />
            </ScrollView>
        </View>
    );
}

function NotificationCard({
    notification,
    onPress,
    iconColor,
    iconName,
}: Readonly<{
    notification: Notification;
    onPress: () => void;
    iconColor: string;
    iconName: string;
}>) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`rounded-2xl p-4 border flex-row gap-4 ${
                notification.read
                    ? 'bg-slate-800/30 border-slate-700'
                    : 'bg-primary/10 border-primary/30'
            }`}
        >
            {/* Icon */}
            <View className="w-12 h-12 rounded-full items-center justify-center flex-shrink-0" style={{ backgroundColor: `${iconColor}20` }}>
                <Ionicons name={iconName as any} size={24} color={iconColor} />
            </View>

            {/* Content */}
            <View className="flex-1">
                <View className="flex-row items-start justify-between gap-2 mb-1">
                    <Text
                        className={`flex-1 font-semibold text-base ${
                            notification.read ? 'text-gray-300' : 'text-white'
                        }`}
                    >
                        {notification.title}
                    </Text>
                    {!notification.read && (
                        <View className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                    )}
                </View>
                <Text className="text-gray-400 text-sm mb-2">
                    {notification.message}
                </Text>
                <Text className="text-gray-500 text-xs">
                    {notification.timestamp}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
