import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import SideMenu from '../SideMenu/page';
import { BottomNavigation } from '../shared';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#00BFA5',
    primaryDark: '#008B75',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    lightGreen: '#E6FAF7',
};

// Placeholder map image
const MAP_IMAGE_URI =
    'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg';

export default function HomePage({ onNotificationClick, onNavClick }) {
    const [selectedService, setSelectedService] = useState<'transport' | 'delivery'>(
        'transport'
    );
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* MAP */}
            <View style={styles.mapContainer}>
                <ImageBackground source={{ uri: MAP_IMAGE_URI }} style={styles.map}>
                    {/* Marker */}
                    <View style={styles.markerWrapper}>
                        <View style={styles.circleLarge} />
                        <View style={styles.circleMedium} />
                        <View style={styles.circleSmall} />
                        <View style={styles.pin}>
                            <Ionicons name="location" size={18} color="#fff" />
                        </View>
                    </View>
                </ImageBackground>

                {/* TOP BAR */}
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.menuBtn}
                        onPress={() => setSideMenuVisible(true)}
                    >
                        <Ionicons name="menu" size={22} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.notifyBtn}
                        onPress={onNotificationClick}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* FLOATING CONTROLS */}
            <View style={styles.controlsRow}>
                <TouchableOpacity style={styles.rentalBtn}>
                    <Text style={styles.rentalText}>Rental</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.locateBtn}>
                    <Ionicons name="locate" size={22} color={COLORS.primaryDark} />
                </TouchableOpacity>
            </View>

            {/* BOTTOM CARD */}
            <View style={styles.bottomCard}>
                {/* SEARCH */}
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color={COLORS.textSecondary} />
                    <Text style={styles.searchText}>Where would you go?</Text>
                    <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
                </View>

                {/* TABS */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedService === 'transport' && styles.tabActive,
                        ]}
                        onPress={() => setSelectedService('transport')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedService === 'transport' && styles.tabTextActive,
                            ]}
                        >
                            Transport
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedService === 'delivery' && styles.tabActive,
                        ]}
                        onPress={() => setSelectedService('delivery')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedService === 'delivery' && styles.tabTextActive,
                            ]}
                        >
                            Delivery
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* BOTTOM NAV */}
            <BottomNavigation
                activeTab="home"
                onTabPress={(tab) => onNavClick?.(tab)}
            />

            {/* SIDE MENU */}
            <SideMenu
                visible={sideMenuVisible}
                onClose={() => setSideMenuVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    /* MAP */
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: '100%',
        height: '100%',
    },

    /* TOP BAR */
    topBar: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    menuBtn: {
        width: 42,
        height: 42,
        backgroundColor: COLORS.primaryDark,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifyBtn: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },

    /* MARKER */
    markerWrapper: {
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleLarge: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.primary,
        opacity: 0.1,
    },
    circleMedium: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        opacity: 0.15,
    },
    circleSmall: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
    },
    pin: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },

    /* FLOATING BUTTONS */
    controlsRow: {
        position: 'absolute',
        bottom: 220,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    rentalBtn: {
        backgroundColor: COLORS.primaryDark,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 14,
        elevation: 6,
    },
    rentalText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    locateBtn: {
        width: 48,
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },

    /* BOTTOM CARD */
    bottomCard: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        backgroundColor: COLORS.lightGreen,
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 30,
    },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        elevation: 3,
    },
    searchText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.textSecondary,
    },

    tabs: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 12,
        padding: 5,
        elevation: 3,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: COLORS.primaryDark,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.primaryDark,
    },
    tabTextActive: {
        color: '#fff',
    },
});
