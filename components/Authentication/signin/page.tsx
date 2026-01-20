import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
    primary: '#00Bfa5',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    inputBg: '#FFFFFF',
    googleRed: '#DB4437',
    facebookBlue: '#4267B2',
    appleBlack: '#000000',
    linkRed: '#EF4444',
};

interface Props {
    onBack: () => void;
    onSignIn: () => void;
    onSignUp: () => void;
    onForgotPassword?: () => void;
}

export default function SigninPage({ onBack, onSignIn, onSignUp, onForgotPassword }: Props) {
    const [emailOrPhone, setEmailOrPhone] = useState('oksanjeetkr124@gmail.com');
    const [password, setPassword] = useState('Admin@123');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = () => {
        // Add validation logic here
        if (emailOrPhone && password) {
            onSignIn();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.text} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Sign in with your email or phone number</Text>

                {/* Form Fields */}
                <View style={styles.form}>
                    {/* Email or Phone Number */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email or Phone Number"
                            placeholderTextColor="#9CA3AF"
                            value={emailOrPhone}
                            onChangeText={setEmailOrPhone}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter Your Password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={COLORS.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forget Password Link */}
                    <TouchableOpacity
                        onPress={onForgotPassword}
                        style={styles.forgotPasswordContainer}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.forgotPasswordText}>Forget password?</Text>
                    </TouchableOpacity>

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} activeOpacity={0.8}>
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    {/* OR Separator */}
                    <View style={styles.orContainer}>
                        <View style={styles.hairline} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.hairline} />
                    </View>

                    {/* Social Logins */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                            <Ionicons name="logo-google" size={20} color={COLORS.googleRed} />
                            <Text style={styles.socialButtonText}>Sign in with Gmail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                            <Ionicons name="logo-facebook" size={20} color={COLORS.facebookBlue} />
                            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                            <Ionicons name="logo-apple" size={20} color={COLORS.appleBlack} />
                            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Link */}
                    <View style={styles.signUpLinkContainer}>
                        <Text style={styles.signUpLinkText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
                            <Text style={styles.signUpLinkHighlight}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    contentContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 20,
        marginBottom: 30,
        lineHeight: 32,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        backgroundColor: COLORS.inputBg,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        fontSize: 16,
        color: COLORS.text,
    },
    passwordContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        backgroundColor: COLORS.inputBg,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    eyeIcon: {
        padding: 4,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: -8,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: COLORS.linkRed,
        fontWeight: '500',
    },
    signInButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    hairline: {
        height: 1,
        backgroundColor: '#E5E7EB',
        flex: 1,
    },
    orText: {
        marginHorizontal: 10,
        color: '#9CA3AF',
        fontSize: 14,
    },
    socialContainer: {
        gap: 12,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        height: 50,
        gap: 10,
        backgroundColor: '#FFFFFF',
    },
    socialButtonText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },
    signUpLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    signUpLinkText: {
        color: COLORS.textSecondary,
        fontSize: 15,
    },
    signUpLinkHighlight: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: '600',
    },
});

