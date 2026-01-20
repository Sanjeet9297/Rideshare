import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from '../SideMenu/page';

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB',
    lightGreen: '#E0F7F4',
};

interface Props {
    onMenuClick?: () => void;
    onNavClick?: (page: string) => void;
}

export default function ProfilePage({ onMenuClick, onNavClick }: Props) {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const [email, setEmail] = useState('nate@email.con');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('');

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logout pressed');
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
                <Text style={styles.title}>Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={60} color={COLORS.textSecondary} />
                        </View>
                        <TouchableOpacity style={styles.cameraButton} activeOpacity={0.7}>
                            <View style={styles.cameraIconContainer}>
                                <Ionicons name="camera" size={16} color="#FFFFFF" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Nate Samson</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLORS.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={styles.phoneContainer}>
                        <View style={styles.countryCode}>
                            <Text style={styles.flagEmoji}>🇧🇩</Text>
                            <Text style={styles.countryCodeText}>+880</Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} />
                        </View>
                        <View style={styles.phoneInputWrapper}>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Your mobile number"
                                placeholderTextColor={COLORS.textSecondary}
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>
                    </View>

                    {/* Gender */}
                    <TouchableOpacity style={styles.genderContainer} activeOpacity={0.7}>
                        <Text style={styles.genderText}>{gender}</Text>
                        <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>

                    {/* Address */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            placeholderTextColor={COLORS.textSecondary}
                            value={address}
                            onChangeText={setAddress}
                            multiline
                        />
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
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
                    <Ionicons name="pricetag-outline" size={24} color={COLORS.textSecondary} />
                    <Text style={styles.navText}>Offer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => onNavClick?.('profile')}>
                    <Ionicons name="person" size={24} color={COLORS.primary} />
                    <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
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
        backgroundColor: COLORS.lightGreen,
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
        backgroundColor: COLORS.primary,
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
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    cameraIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    formSection: {
        gap: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        backgroundColor: COLORS.background,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        fontSize: 16,
        color: COLORS.text,
    },
    phoneContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    countryCode: {
        width: 100,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.background,
    },
    flagEmoji: {
        fontSize: 20,
    },
    countryCodeText: {
        fontSize: 16,
        color: COLORS.text,
    },
    phoneInputWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    phoneInput: {
        fontSize: 16,
        color: COLORS.text,
    },
    genderContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        backgroundColor: COLORS.background,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    genderText: {
        fontSize: 16,
        color: COLORS.text,
    },
    logoutButton: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        backgroundColor: COLORS.background,
    },
    logoutButtonText: {
        color: COLORS.primary,
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

