import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    lightGreen: '#E0F7F4',
    border: '#E5E7EB',
};

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
}

interface Props {
    onBack: () => void;
}

const notifications: { [key: string]: NotificationItem[] } = {
    Today: [
        {
            id: '1',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '15 min ago.',
            isRead: true,
        },
        {
            id: '2',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '25 min ago.',
            isRead: false,
        },
    ],
    Yesterday: [
        {
            id: '3',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '15 min ago.',
            isRead: true,
        },
        {
            id: '4',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '25 min ago.',
            isRead: false,
        },
        {
            id: '5',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '25 min ago.',
            isRead: false,
        },
        {
            id: '6',
            title: 'Payment confirm',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
            timestamp: '15 min ago.',
            isRead: true,
        },
    ],
};

export default function NotificationPage({ onBack }: Props) {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => {
                        
                        onBack();
                    }} 
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={24} color={COLORS.text} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Notification</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Notification List */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {Object.entries(notifications).map(([sectionTitle, items]) => (
                    <View key={sectionTitle} style={styles.section}>
                        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                        {items.map((item) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.notificationCard,
                                    item.isRead && styles.notificationCardRead
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.notificationTitle,
                                        item.isRead && styles.notificationTitleRead
                                    ]}
                                >
                                    {item.title}
                                </Text>
                                <Text style={styles.notificationDescription}>
                                    {item.description}
                                </Text>
                                <Text
                                    style={[
                                        styles.notificationTimestamp,
                                        item.isRead && styles.notificationTimestampRead
                                    ]}
                                >
                                    {item.timestamp}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        paddingVertical: 8,
        paddingRight: 8,
    },
    backText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        pointerEvents: 'none',
    },
    placeholder: {
        width: 60,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },
    notificationCard: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    notificationCardRead: {
        backgroundColor: COLORS.lightGreen,
        borderColor: 'transparent',
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    notificationTitleRead: {
        color: COLORS.primary,
    },
    notificationDescription: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationTimestamp: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    notificationTimestampRead: {
        color: COLORS.primary,
    },
});

