import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#00Bfa5', // Green
    text: '#1F2937',
    textSecondary: '#9CA3AF',
    background: '#FFFFFF',
};

interface Props {
    onCreateAccount: () => void;
    onLogin: () => void;
}

export default function WelcomePage({ onCreateAccount, onLogin }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.contentContainer}>
                {/* Main Illustration */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/images/welcome.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.subtitle}>Have a better sharing experience</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {/* Create Account Button */}
                    <TouchableOpacity style={styles.createAccountButton} activeOpacity={0.8} onPress={onCreateAccount}>
                        <Text style={styles.createAccountText}>Create an account</Text>
                    </TouchableOpacity>

                    {/* Log In Button */}
                    <TouchableOpacity style={styles.loginButton} activeOpacity={0.6} onPress={onLogin}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: width * 0.9,
        height: width * 0.8,
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingBottom: 40,
        gap: 16,
    },
    createAccountButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    createAccountText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loginButton: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    loginText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: '600',
    },
});
