import BackgroundGradient from "@/components/backgroundGradient";
import DisplayAvatar from "@/components/displayAvatar";
import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { MotiText, MotiView, SafeAreaView } from "moti";
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
        <PrimaryText>Loading...</PrimaryText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryText
        style={{
          fontSize: 60,
          color: "white",
        }}
      >
        Round {rounds.length.toString()}
      </PrimaryText>
      {rounds && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <MotiView
            from={{
              translateX: -400,
            }}
            animate={{
              translateX: 0,
            }}
            exit={{
              translateX: 400,
            }}
            transition={{
              type: "spring",
              duration: 3000,
            }}
          >
            <DisplayAvatar
              player={rounds[currentRoundIndex].battlingPlayers[0]}
            />
          </MotiView>
          <MotiText
            from={{
              opacity: 0,
              translateY: 100,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -100,
            }}
            transition={{
              type: "timing",
              duration: 400,
              delay: 250,
            }}
          >
            <PrimaryText
              style={{ fontSize: 100, color: "white", textAlign: "center" }}
            >
              VS
            </PrimaryText>
          </MotiText>
          <MotiView
            from={{
              translateX: 400,
            }}
            animate={{
              translateX: 0,
            }}
            exit={{
              translateX: -400,
            }}
            transition={{
              type: "spring",
              duration: 3000,
              delay: 500,
            }}
          >
            <DisplayAvatar
              player={rounds[currentRoundIndex].battlingPlayers[1]}
            />
          </MotiView>
        </View>
      )}
      <View />

      <View />
    </SafeAreaView>
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
    backgroundColor: "#FF80C6",
  },
});
