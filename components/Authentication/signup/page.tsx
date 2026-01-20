import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
};

interface Props {
    onBack: () => void;
    onSignIn: () => void;
    onSignUp: () => void;
}

export default function SignupPage({ onBack, onSignIn, onSignUp }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');

    // Just a visual toggle for gender dropdown
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);

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
                <Text style={styles.title}>Sign up with your email or phone number</Text>

                {/* Form Fields */}
                <View style={styles.form}>
                    {/* Name */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={styles.phoneContainer}>
                        <View style={styles.countryCode}>
                            {/* India Flag */}
                            <View style={styles.flagPlaceholder}>
                                <Image
                                    source={require('../../../assets/images/india-flag.png')}
                                    style={{ width: 24, height: 16 }}
                                    resizeMode="cover"
                                />
                            </View>
                            <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} />
                        </View>
                        <View style={styles.phoneInputWrapper}>
                            <Text style={styles.phonePrefix}>+91</Text>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Your mobile number"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>
                    </View>

                    {/* Gender Dropdown */}
                    <TouchableOpacity
                        style={styles.genderContainer}
                        onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                        activeOpacity={1}
                    >
                        <Text style={[styles.genderText, !gender && { color: '#9CA3AF' }]}>
                            {gender || "Gender"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>

                    {showGenderDropdown && (
                        <View style={styles.dropdownList}>
                            {['Male', 'Female', 'Other'].map((g) => (
                                <TouchableOpacity
                                    key={g}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setGender(g);
                                        setShowGenderDropdown(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{g}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Terms */}
                    <View style={styles.termsContainer}>
                        <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.primary} />
                        <Text style={styles.termsText}>
                            By signing up. you agree to the <Text style={styles.linkText}>Terms of service</Text> and <Text style={styles.linkText}>Privacy policy.</Text>
                        </Text>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* OR Separator */}
                    <View style={styles.orContainer}>
                        <View style={styles.hairline} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.hairline} />
                    </View>

                    {/* Social Logins */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color={COLORS.googleRed} />
                            <Text style={styles.socialButtonText}>Sign up with Gmail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={20} color={COLORS.facebookBlue} />
                            <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={20} color={COLORS.appleBlack} />
                            <Text style={styles.socialButtonText}>Sign up with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Link */}
                    <View style={styles.loginLinkContainer}>
                        <Text style={styles.loginLinkText}>Already have an account? </Text>
                        <TouchableOpacity onPress={onSignIn}>
                            <Text style={styles.loginLinkHighlight}>Sign in</Text>
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
    phoneContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    countryCode: {
        width: 80,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    flagPlaceholder: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneInputWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 50,
    },
    phonePrefix: {
        fontSize: 16,
        color: COLORS.text,
        marginRight: 8,
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    genderContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        backgroundColor: COLORS.inputBg,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    genderText: {
        fontSize: 16,
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        marginTop: -10, // Overlap slightly or just below
        backgroundColor: '#FFF',
        paddingVertical: 4,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dropdownItemText: {
        fontSize: 16,
        color: COLORS.text,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
        gap: 10,
        paddingRight: 10,
    },
    termsText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
        flex: 1,
    },
    linkText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    signUpButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
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
    },
    socialButtonText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    loginLinkText: {
        color: COLORS.textSecondary,
        fontSize: 15,
    },
    loginLinkHighlight: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: '600',
    },
});
