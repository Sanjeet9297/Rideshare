import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from '../SideMenu/page';
import { BottomNavigation } from '../shared';

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB',
    red: '#EF4444',
};

interface FavouriteLocation {
    id: string;
    type: string;
    address: string;
}

interface Props {
    onMenuClick?: () => void;
    onNavClick?: (page: string) => void;
}

const favouriteLocations: FavouriteLocation[] = [
    { id: '1', type: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '2', type: 'Home', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '3', type: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '4', type: 'House', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '5', type: 'Home', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '6', type: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '7', type: 'House', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
    { id: '8', type: 'House', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486' },
];

export default function FavouritePage({ onMenuClick, onNavClick }: Props) {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    const handleRemove = (id: string) => {
        // Handle remove logic here
        console.log('Remove location:', id);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} onPress={() => setSideMenuVisible(true)}>
                    <View style={styles.menuIconContainer}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>Favourite</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Favourite Locations List */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {favouriteLocations.map((location) => (
                    <View key={location.id} style={styles.locationCard}>
                        <View style={styles.locationIcon}>
                            <Ionicons name="location" size={24} color={COLORS.text} />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.locationType}>{location.type}</Text>
                            <Text style={styles.locationAddress}>{location.address}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            activeOpacity={0.7}
                            onPress={() => handleRemove(location.id)}
                        >
                            <Ionicons name="remove-circle" size={24} color={COLORS.red} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavigation
                activeTab="favourite"
                onTabPress={(tab) => onNavClick?.(tab)}
            />

            {/* Side Menu */}
            <SideMenu
                visible={sideMenuVisible}
                onClose={() => setSideMenuVisible(false)}
                onMenuItemPress={(item) => {
                    console.log('Menu item pressed:', item);
                    if (item === 'logout') {
                        onMenuClick?.();
                    }
                }}
            />
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
    menuButton: {
        padding: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 20,
        height: 16,
        justifyContent: 'space-between',
    },
    menuLine: {
        width: 20,
        height: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
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
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    locationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    locationInfo: {
        flex: 1,
    },
    locationType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    removeButton: {
        padding: 4,
    },
    navTextActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});

