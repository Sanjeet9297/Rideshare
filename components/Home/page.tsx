import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SideMenu from '../SideMenu/page';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#00Bfa5',
    primaryDark: '#008B75',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    lightGreen: '#E0F7F4',
    border: '#E5E7EB',
};

// Placeholder map image
const MAP_IMAGE_URI = 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg';

interface Props {
    onNotificationClick?: () => void;
    onNavClick?: (page: string) => void;
}

export default function HomePage({ onNotificationClick, onNavClick }: Props) {
    const [selectedService, setSelectedService] = useState<'transport' | 'delivery'>('transport');
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Map View - Full Page */}
            <View style={styles.mapContainer}>
                <ImageBackground
                    source={{ uri: MAP_IMAGE_URI }}
                    style={styles.mapBackground}
                    resizeMode="cover"
                >
                    {/* Location Pin with Concentric Circles */}
                    <View style={styles.locationMarkerContainer}>
                        <View style={styles.circle3} />
                        <View style={styles.circle2} />
                        <View style={styles.circle1} />
                        <View style={styles.locationPin}>
                            <Ionicons name="location" size={24} color={COLORS.text} />
                        </View>
                    </View>

                    {/* Water/River Line */}
                    <View style={styles.waterLine} />
                </ImageBackground>

                {/* Top Bar - Overlay on Map */}
                <View style={styles.topBar}>
                    <TouchableOpacity 
                        style={styles.menuButton} 
                        activeOpacity={0.7}
                        onPress={() => setSideMenuVisible(true)}
                    >
                        <View style={styles.menuIconContainer}>
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.bellButton} 
                        activeOpacity={0.7}
                        onPress={onNotificationClick}
                    >
                        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

            </View>

            {/* Bottom Section - Search, Service Tabs, Map Controls, and Navigation */}
            <View style={styles.bottomSection}>
                {/* Rental Button and Recenter Button */}
                <View style={styles.mapControls}>
                    <TouchableOpacity style={styles.rentalButton} activeOpacity={0.8}>
                        <Text style={styles.rentalButtonText}>Rental</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.recenterButton} activeOpacity={0.8}>
                        <Ionicons name="locate" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar and Service Selection */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                        <Text style={styles.searchPlaceholder}>Where would you go?</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Service Selection Tabs */}
                    <View style={styles.serviceTabs}>
                        <TouchableOpacity
                            style={[
                                styles.serviceTab,
                                selectedService === 'transport' && styles.serviceTabActive
                            ]}
                            onPress={() => setSelectedService('transport')}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.serviceTabText,
                                    selectedService === 'transport' && styles.serviceTabTextActive
                                ]}
                            >
                                Transport
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.serviceTab,
                                selectedService === 'delivery' && styles.serviceTabActive
                            ]}
                            onPress={() => setSelectedService('delivery')}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.serviceTabText,
                                    selectedService === 'delivery' && styles.serviceTabTextActive
                                ]}
                            >
                                Delivery
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Navigation Bar */}
                <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('home')}>
                    <Ionicons name="home" size={24} color={COLORS.primary} />
                    <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
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
                    <Ionicons name="pricetag-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Offer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('profile')}>
                    <Ionicons name="person-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/* Side Menu */}
            <SideMenu
                visible={sideMenuVisible}
                onClose={() => setSideMenuVisible(false)}
                onMenuItemPress={(item) => {
                    console.log('Menu item pressed:', item);
                    // Handle menu item actions here
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 12,
        zIndex: 10,
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
    bellButton: {
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    mapContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    mapBackground: {
        width: '100%',
        height: '100%',
    },
    locationMarkerContainer: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        marginLeft: -15,
        marginTop: -15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle1: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
    },
    circle2: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        opacity: 0.15,
    },
    circle3: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.primary,
        opacity: 0.1,
    },
    locationPin: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.text,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    waterLine: {
        position: 'absolute',
        bottom: '30%',
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: '#81D4FA',
        opacity: 0.6,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    mapControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    rentalButton: {
        backgroundColor: COLORS.primaryDark,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    rentalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    recenterButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    searchContainer: {
        backgroundColor: COLORS.lightGreen,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        gap: 12,
    },
    searchIcon: {
        marginRight: 4,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    serviceTabs: {
        flexDirection: 'row',
        gap: 12,
    },
    serviceTab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: COLORS.lightGreen,
        alignItems: 'center',
    },
    serviceTabActive: {
        backgroundColor: COLORS.primaryDark,
    },
    serviceTabText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.primaryDark,
    },
    serviceTabTextActive: {
        color: '#FFFFFF',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 20,
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
        backgroundColor: COLORS.primaryDark,
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

