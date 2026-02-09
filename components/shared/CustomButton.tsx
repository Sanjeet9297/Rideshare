import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
}

export default function CustomButton({
    title,
    onPress,
    style,
    textStyle,
    variant = 'primary',
    loading = false,
    disabled = false,
}: CustomButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const getButtonStyle = () => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: theme.secondary };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.primary,
                };
            case 'primary':
            default:
                return { backgroundColor: theme.primary };
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'secondary':
                return { color: '#000' };
            case 'outline':
                return { color: theme.primary };
            case 'primary':
            default:
                return { color: '#FFF' };
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                (disabled || loading) && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? theme.primary : '#FFF'} />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 54,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    disabled: {
        opacity: 0.6,
    },
});
