import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LocationPage from "../components/Authentication/location/page";
import WelcomePage from "../components/Authentication/welcome/page";
import Onboarding from "../components/onboarding";

import SignupPage from "../components/Authentication/signup/page";

export default function Index() {
  const [step, setStep] = useState<'onboarding' | 'location' | 'welcome' | 'signup' | 'login'>('onboarding');

  if (step === 'location') {
    return (
      <View style={styles.container}>
        <LocationPage
          onSkip={() => setStep('welcome')}
          onConfirm={() => setStep('welcome')}
        />
      </View>
    )
  }

  if (step === 'welcome') {
    return (
      <View style={styles.container}>
        <WelcomePage
          onCreateAccount={() => setStep('signup')}
          onLogin={() => setStep('login')} // Placeholder for now
        />
      </View>
    )
  }

  if (step === 'signup') {
    return (
      <View style={styles.container}>
        <SignupPage
          onBack={() => setStep('welcome')}
          onSignIn={() => setStep('login')}
          onSignUp={() => console.log('Sign Up Pressed')}
        />
      </View>
    )
  }

  // Placeholder for login until page created
  if (step === 'login') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Login Page Coming Soon</Text>
        <Text onPress={() => setStep('welcome')} style={{ color: 'blue', marginTop: 20 }}>Back</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding onFinish={() => setStep('location')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
