import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface BottomNavigationProps {
    activeTab: 'home' | 'favourite' | 'wallet' | 'offer' | 'profile';
    onTabPress: (tab: 'home' | 'favourite' | 'wallet' | 'offer' | 'profile') => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const renderHexagon = () => {
        // Pointed top/bottom vertical hexagon based on Figma reference
        return (
            <View style={styles.hexagonWrapper}>
                <Svg height="90" width="78" viewBox="0 0 78 90">
                    <Path
                        d="M39 0L77.105 22.5V67.5L39 90L0.89487 67.5V22.5L39 0Z"
                        fill={theme.primary}
                    />
                </Svg>
                <View style={styles.hexagonIcon}>
                    <MaterialCommunityIcons name="wallet-outline" size={36} color="#FFF" />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {/* Home */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => onTabPress('home')}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={activeTab === 'home' ? "home" : "home-outline"}
                        size={26}
                        color={activeTab === 'home' ? theme.primary : "#9CA3AF"}
                    />
                    <Text style={[styles.navText, activeTab === 'home' && styles.activeText]}>
                        Home
                    </Text>
                </TouchableOpacity>

                {/* Favourite */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => onTabPress('favourite')}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={activeTab === 'favourite' ? "heart" : "heart-outline"}
                        size={26}
                        color={activeTab === 'favourite' ? theme.primary : "#9CA3AF"}
                    />
                    <Text style={[styles.navText, activeTab === 'favourite' && styles.activeText]}>
                        Favourite
                    </Text>
                </TouchableOpacity>

                {/* Wallet (Hexagon) */}
                <TouchableOpacity
                    style={styles.walletItem}
                    onPress={() => onTabPress('wallet')}
                    activeOpacity={0.9}
                >
                    <View style={styles.hexagonContainer}>
                        {renderHexagon()}
                    </View>
                    <Text style={[styles.navText, styles.walletText, activeTab === 'wallet' && styles.activeText]}>
                        Wallet
                    </Text>
                </TouchableOpacity>

                {/* Offer */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => onTabPress('offer')}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name="brightness-percent"
                        size={26}
                        color={activeTab === 'offer' ? theme.primary : "#9CA3AF"}
                    />
                    <Text style={[styles.navText, activeTab === 'offer' && styles.activeText]}>
                        Offer
                    </Text>
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => onTabPress('profile')}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={activeTab === 'profile' ? "person" : "person-outline"}
                        size={26}
                        color={activeTab === 'profile' ? theme.primary : "#9CA3AF"}
                    />
                    <Text style={[styles.navText, activeTab === 'profile' && styles.activeText]}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        zIndex: 100,
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 90,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 25,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeText: {
        color: '#008955',
        fontWeight: '700',
    },
    walletItem: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90, // Match navBar height
    },
    hexagonContainer: {
        position: 'absolute',
        top: -45, // Elevated top half
        alignItems: 'center',
    },
    hexagonWrapper: {
        width: 78,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#008955',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 12,
    },
    hexagonIcon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 4,
        fontWeight: '500',
    },
    walletText: {
        marginTop: 31,
    },
});
