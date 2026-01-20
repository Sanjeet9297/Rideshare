import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#00Bfa5',
  text: '#1F2937',
  textSecondary: '#6B7280',
  background: '#FFFFFF',
};

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function OnboardingPage3({ onNext, onSkip }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        {/* Skip is still there in design 3 */}
        <TouchableOpacity activeOpacity={0.7} onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/onboarding/3.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.textWrapper}>
          <Text style={styles.title}>Book your car</Text>
          <Text style={styles.subtitle}>
            Sell houses easily with the help of Listenoryx and to make this line big I am writing more.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {/* Full Circle */}
          <View style={[styles.progressRing]}>
            <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={onNext}>
              <Text style={styles.goText}>Go</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'System',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: width * 0.8,
    height: width * 0.7,
    marginBottom: 40,
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  footer: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
    borderBottomColor: COLORS.primary,
    borderLeftColor: COLORS.primary, // Full circle
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }]
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }], // Counter rotate back so text is straight
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  goText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
