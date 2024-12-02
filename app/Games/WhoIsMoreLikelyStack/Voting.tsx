import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";
import Timer from "@/components/timer";
import { useColyseusStore } from "@/context/ColyseusContext";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { AnimatePresence, MotiView, useAnimationState } from "moti";
import { Player } from "@/types/GameTypes";
import DisplayAvatar from "@/components/displayAvatar";

export default function VotingScreen() {
  const { rounds, currentRoom, players, currentState, currentRoundIndex } =
    useColyseusStore();
  const [winner, setWinner] = useState<Player | null>(null);

  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];
  const [voted, setVoted] = useState(false);

  const firstPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { scale: 1.2 },
    minimize: { opacity: 0.8, scale: 0.8, transition: { duration: 0.5 } },
    hide: { opacity: 0, scale: 0.8 },
  });
  const secondPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { scale: 1.2 },
    minimize: { opacity: 0.8, scale: 0.8, transition: { duration: 0.5 } },
    hide: { opacity: 0, scale: 0.8 },
  });
  const orTextAnimation = useAnimationState({
    idle: { scale: 1 },
    hide: { opacity: 0, scale: 0.8 },
  });
  const winnerAnimation = useAnimationState({
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, type: "spring" },
    },
  });

  const exitAnimation = useAnimationState({
    from: { scale: 2000 },
    to: { scale: 0 },
  });

  const votePlayer = (playerId: string) => {
    if (voted) return;

    if (playerId === firstPlayer.id) {
      firstPlayerAnimation.transitionTo("clicked");
      secondPlayerAnimation.transitionTo("minimize");
    } else if (playerId === secondPlayer.id) {
      secondPlayerAnimation.transitionTo("clicked");
      firstPlayerAnimation.transitionTo("minimize");
    }
    orTextAnimation.transitionTo("hide");

    currentRoom?.send("votePlayer", playerId);
    setVoted(true);
  };

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
    <>
      <SafeAreaView style={styles.container}>
        <BackgroundGradient style={styles.background} />
        <Timer />
        <View style={styles.questionContainer}>
          <PrimaryText style={styles.defaultText}>
            Who is more likely to
          </PrimaryText>
          <PrimaryText style={styles.questionText}>
            {rounds[rounds.length - 1].question}
          </PrimaryText>
        </View>

        <View style={styles.buttonContainer}>
          {firstPlayer && (
            <TouchableOpacity
              onPress={() => votePlayer(firstPlayer.id)}
              key={firstPlayer.id}
            >
              <MotiView
                state={firstPlayerAnimation}
                style={styles.votePlayerContainer}
              >
                <DisplayAvatar player={firstPlayer} />
                <PrimaryText style={styles.playerText}>
                  {firstPlayer.name}
                </PrimaryText>
              </MotiView>
            </TouchableOpacity>
          )}
          <MotiView
            state={orTextAnimation}
            style={{ justifyContent: "center" }}
          >
            <PrimaryText>OR</PrimaryText>
          </MotiView>
          {secondPlayer && (
            <TouchableOpacity
              onPress={() => votePlayer(secondPlayer.id)}
              key={secondPlayer.id}
            >
              <MotiView
                state={secondPlayerAnimation}
                style={styles.votePlayerContainer}
              >
                <DisplayAvatar player={secondPlayer} />
                <PrimaryText style={styles.playerText}>
                  {secondPlayer.name}
                </PrimaryText>
              </MotiView>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <MotiView
        state={exitAnimation}
        transition={{
          type: "timing",
          duration: 800,
        }}
        style={styles.exitAnimationStyle}
      />
    </>
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
    alignItems: "center",
    padding: 24,
  },
  exitAnimationStyle: {
    position: "absolute",
    backgroundColor: "#FF69B4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: -20,
    width: 2,
    height: 2,
  },
  questionContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 120,
  },
  defaultText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  questionText: {
    color: "#fff",
    fontSize: 42,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  votePlayerContainer: {
    gap: 10,
  },
  playerText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});
