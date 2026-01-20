import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Onboarding from "../../components/onboarding";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Onboarding />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
