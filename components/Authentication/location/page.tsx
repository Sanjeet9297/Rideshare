import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#00Bfa5', // Green
    text: '#1F2937',
    textSecondary: '#6B7280',
    cardBackground: '#FFFFFF',
};

// Placeholder map image
const MAP_IMAGE_URI = 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg';

interface Props {
    onSkip: () => void;
    onConfirm: () => void;
}

export default function LocationPage({ onSkip, onConfirm }: Props) {
    const [loading, setLoading] = useState(false);

    const handleUseMyLocation = async () => {
        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log('Current Location:', location);
            // Simulate processing or just move next
            onConfirm();
        } catch (error) {
            console.log("Error fetching location", error);
            Alert.alert('Could not fetch location', 'Please try again or skip.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Map Background */}
            <ImageBackground
                source={{ uri: MAP_IMAGE_URI }}
                style={styles.mapBackground}
                resizeMode="cover"
            >
                {/* Overlay to dim map slightly if needed */}
            </ImageBackground>

            {/* Permission Card */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    {/* Location Icon Circle */}
                    <View style={styles.iconCircle}>
                        <View style={styles.innerIconCircle}>
                            <Ionicons name="location-sharp" size={32} color={COLORS.text} />
                        </View>
                    </View>

                    <Text style={styles.title}>Enable your location</Text>
                    <Text style={styles.subtitle}>
                        Choose your location to start find the request around you
                    </Text>

                    {/* Use My Location Button */}
                    <TouchableOpacity
                        style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                        activeOpacity={0.8}
                        onPress={handleUseMyLocation}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Use my location</Text>
                        )}
                    </TouchableOpacity>

                    {/* Skip Button */}
                    <TouchableOpacity style={styles.skipButton} activeOpacity={0.6} onPress={onSkip}>
                        <Text style={styles.skipButtonText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapBackground: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.2)', // Slight overlay on whole screen
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        width: '100%',
        borderRadius: 24,
        paddingVertical: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2F1', // Very light green
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    innerIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#00Bfa5', // Primary Green
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00Bfa5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    skipButton: {
        paddingVertical: 8,
    },
    skipButtonText: {
        color: '#9CA3AF',
        fontSize: 16,
    },
});
