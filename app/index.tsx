import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LocationPage from "../components/Authentication/location/page";
import WelcomePage from "../components/Authentication/welcome/page";
import Onboarding from "../components/onboarding";

import SigninPage from "../components/Authentication/signin/page";
import SignupPage from "../components/Authentication/signup/page";
import FavouritePage from "../components/Favourite/page";
import HomePage from "../components/Home/page";
import NotificationPage from "../components/Notification/page";
import OfferPage from "../components/Offer/page";
import ProfilePage from "../components/Profile/page";

export default function Index() {
  const [step, setStep] = useState<'onboarding' | 'location' | 'welcome' | 'signup' | 'login' | 'home' | 'notification' | 'favourite' | 'profile' | 'offer'>('onboarding');

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
          onLogin={() => setStep('login')}
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

  if (step === 'login') {
    return (
      <View style={styles.container}>
        <SigninPage
          onBack={() => setStep('welcome')}
          onSignIn={() => setStep('home')}
          onSignUp={() => setStep('signup')}
          onForgotPassword={() => console.log('Forgot Password Pressed')}
        />
      </View>
    )
  }

  if (step === 'home') {
    return (
      <View style={styles.container}>
        <HomePage 
          onNotificationClick={() => setStep('notification')}
          onNavClick={(page) => setStep(page as any)}
        />
      </View>
    )
  }

  if (step === 'notification') {
    return (
      <View style={styles.container}>
        <NotificationPage onBack={() => setStep('home')} />
      </View>
    )
  }

  if (step === 'favourite') {
    return (
      <View style={styles.container}>
        <FavouritePage 
          onMenuClick={() => setStep('home')}
          onNavClick={(page) => setStep(page as any)}
        />
      </View>
    )
  }

  if (step === 'profile') {
    return (
      <View style={styles.container}>
        <ProfilePage 
          onMenuClick={() => setStep('home')}
          onNavClick={(page) => setStep(page as any)}
        />
      </View>
    )
  }

  if (step === 'offer') {
    return (
      <View style={styles.container}>
        <OfferPage 
          onMenuClick={() => setStep('home')}
          onNavClick={(page) => setStep(page as any)}
        />
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
