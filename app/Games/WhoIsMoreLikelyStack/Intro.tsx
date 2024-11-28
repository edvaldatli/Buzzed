import PrimaryText from "@/components/primaryText";
import { View, StyleSheet, Text } from "react-native";
import AccentText from "@/components/accentText";
import BackgroundGradient from "@/components/backgroundGradient";

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <BackgroundGradient style={styles.background} />
      <View className="mb-20">
        <PrimaryText tlw="text-4xl text-center mb-8">
          Get ready for...
        </PrimaryText>
        <AccentText tlw="text-6xl text-center text-accentPurple">
          Most Likely
        </AccentText>
      </View>
      <View className="flex flex-row justify-center items-center bg-accentPurple bg-opacity-25 rounded-xl p-8 border border-white">
        <PrimaryText tlw="text-2xl text-center text-white">
          Each round, two players will be put head to head. The group will
          decide who is more likely...
        </PrimaryText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
});
