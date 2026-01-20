import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import OnboardingPage1 from "./page1";
import OnboardingPage2 from "./page2";
import OnboardingPage3 from "./page3";

const pages = [OnboardingPage1, OnboardingPage2, OnboardingPage3];

interface Props {
  onFinish?: () => void;
}

export default function Onboarding({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const Page = pages[index];

  const handleNext = () => {
    if (index < pages.length - 1) {
      setIndex(index + 1);
    } else {
      // Final step
      if (onFinish) onFinish();
    }
  };

  const handleSkip = () => {
    // For now, let's say skipping also finishes onboarding,
    // or typically it might skip to the last step?
    // The user said "remove slice option when i click arrow then go to next page"
    // "all three remove slice option" - maybe they meant slider/pagination dots?
    // Let's assume Skip means Finish for now or go to last page.
    // If we go to last page:
    setIndex(pages.length - 1);
  };

  return (
    <View style={styles.container}>
      {/* Pass navigation props to current page */}
      {/* @ts-ignore - we know our pages accept these props now */}
      <Page onNext={handleNext} onSkip={handleSkip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  page: { flex: 1 },
  footer: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#eee",
  },
  button: { fontSize: 18, color: "#007aff" },
  disabled: { color: "#aaa" },
  dots: { flexDirection: "row", alignItems: "center" },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 6,
  },
  activeDot: { backgroundColor: "#007aff" },
});
