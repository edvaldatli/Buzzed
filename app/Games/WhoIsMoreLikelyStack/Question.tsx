import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

export default function QuestionScreen() {
  const { rounds, currentRoundIndex } = useColyseusStore();

  useEffect(() => {
    console.log("rounds", rounds);
    console.log("currentRoundIndex", currentRoundIndex);
  }, []);

  if (!rounds || !rounds[currentRoundIndex]) {
    return (
      <View style={styles.container}>
        <BackgroundGradient style={styles.background} />
        <PrimaryText tlw="text-4xl text-center text-white w-full">
          Loading...
        </PrimaryText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackgroundGradient style={styles.background} />
      {rounds && (
        <View className="shadow-xl w-full rounded-lg p-2 absolute">
          <PrimaryText tlw="text-3xl text-center flex-nowrap">
            Who is more likely to{" "}
          </PrimaryText>
          <View className="h-4" />
          <PrimaryText tlw="text-5xl text-center text-white w-full">
            {rounds[currentRoundIndex].question}
          </PrimaryText>
        </View>
      )}
      <View />
      <PrimaryText tlw="text-4xl text-center text-white w-full">
        Round {rounds.length.toString()}
      </PrimaryText>
      <View />
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
