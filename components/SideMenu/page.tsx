import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB',
    lightBlue: '#E3F2FD',
};

interface MenuItem {
    id: string;
    icon: string;
    label: string;
    onPress?: () => void;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    onMenuItemPress?: (item: string) => void;
}

const menuItems: MenuItem[] = [
    { id: '1', icon: 'document-text-outline', label: 'History' },
    { id: '2', icon: 'alert-circle-outline', label: 'Complain' },
    { id: '3', icon: 'people-outline', label: 'Referral' },
    { id: '4', icon: 'information-circle-outline', label: 'About Us' },
    { id: '5', icon: 'settings-outline', label: 'Settings' },
    { id: '6', icon: 'help-circle-outline', label: 'Help and Support' },
    { id: '7', icon: 'log-out-outline', label: 'Logout' },
];

export default function SideMenu({ visible, onClose, onMenuItemPress }: Props) {
    const slideAnim = React.useRef(new Animated.Value(-width * 0.67)).current;
    const backdropOpacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -width * 0.67,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleMenuItemPress = (item: MenuItem) => {
        if (item.label === 'Logout') {
            onMenuItemPress?.('logout');
        } else {
            onMenuItemPress?.(item.label.toLowerCase().replace(' ', '_'));
        }
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Backdrop */}
                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            opacity: backdropOpacity,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.backdropTouchable}
                        activeOpacity={1}
                        onPress={onClose}
                    />
                </Animated.View>

                {/* Side Menu */}
                <Animated.View
                    style={[
                        styles.menuContainer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    {/* User Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={50} color={COLORS.textSecondary} />
                            </View>
                        </View>
                        <Text style={styles.userName}>Nate Samson</Text>
                        <Text style={styles.userEmail}>nate@email.con</Text>
                    </View>

                    {/* Menu Items */}
                    <View style={styles.menuItems}>
                        {menuItems.map((item, index) => (
                            <View key={item.id}>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    activeOpacity={0.7}
                                    onPress={() => handleMenuItemPress(item)}
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={24}
                                        color={COLORS.text}
                                    />
                                    <Text style={styles.menuItemText}>{item.label}</Text>
                                </TouchableOpacity>
                                {index < menuItems.length - 1 && <View style={styles.separator} />}
                            </View>
                        ))}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
    },
    backdropTouchable: {
        flex: 1,
    },
    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: width * 0.67,
        backgroundColor: COLORS.background,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 4,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.lightBlue,
        borderWidth: 2,
        borderColor: COLORS.lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    menuItems: {
        flex: 1,
        paddingTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    menuItemText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 16,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: 60,
    },
});

