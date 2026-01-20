import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from '../SideMenu/page';

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB',
    lightGreen: '#E0F7F4',
    orange: '#F97316',
};

interface Offer {
    id: string;
    discount: string;
    description: string;
}

interface Props {
    onMenuClick?: () => void;
    onNavClick?: (page: string) => void;
}

const offers: Offer[] = [
    { id: '1', discount: '15% off', description: 'Black Friday' },
    { id: '2', discount: '5% off', description: 'Crismus' },
    { id: '3', discount: '15% off', description: 'Happy New Year' },
    { id: '4', discount: '15% off', description: 'Black Friday' },
    { id: '5', discount: '5% off', description: 'Crismus' },
    { id: '6', discount: '15% off', description: 'Happy New Year' },
    { id: '7', discount: '15% off', description: 'Black Friday' },
    { id: '8', discount: '5% off', description: 'Crismus' },
];

export default function OfferPage({ onMenuClick, onNavClick }: Props) {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    const handleCollect = (id: string) => {
        // Handle collect logic here
        console.log('Collect offer:', id);
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
                <Text style={styles.title}>Offer</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Offers List */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {offers.map((offer) => (
                    <View key={offer.id} style={styles.offerCard}>
                        <View style={styles.offerLeft}>
                            <Text style={styles.discountText}>{offer.discount}</Text>
                            <Text style={styles.descriptionText}>{offer.description}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.collectButton}
                            activeOpacity={0.8}
                            onPress={() => handleCollect(offer.id)}
                        >
                            <Text style={styles.collectButtonText}>Collect</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('home')}>
                    <Ionicons name="home-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('favourite')}>
                    <Ionicons name="heart-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Favourite</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.walletNavItem} activeOpacity={0.7} onPress={() => onNavClick?.('wallet')}>
                    <View style={styles.walletButton}>
                        <View style={styles.walletIconContainer}>
                            <Ionicons name="wallet" size={24} color="#FFFFFF" />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('offer')}>
                    <Ionicons name="pricetag" size={24} color={COLORS.primary} />
                    <Text style={[styles.navText, styles.navTextActive]}>Offer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('profile')}>
                    <Ionicons name="person-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>

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
    offerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.lightGreen,
    },
    offerLeft: {
        flex: 1,
    },
    discountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.orange,
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    collectButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    collectButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    walletNavItem: {
        alignItems: 'center',
        marginTop: -20,
    },
    walletButton: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        transform: [{ rotate: '45deg' }],
    },
    walletIconContainer: {
        transform: [{ rotate: '-45deg' }],
    },
    navText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    navTextActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});

