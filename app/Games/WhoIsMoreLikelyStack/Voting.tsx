import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, useAnimationState } from "moti";
import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";
import Timer from "@/components/timer";
import { useColyseusStore } from "@/context/ColyseusContext";
import DisplayAvatar from "@/components/displayAvatar";
import { Player } from "@/types/GameTypes";

export default function VotingScreen() {
  const { rounds, currentRoom, currentRoundIndex } = useColyseusStore();
  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];
  const [voted, setVoted] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const firstPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { scale: 1.05 },
    minimize: { opacity: 0.95, scale: 0.95, transition: { duration: 0.5 } },
    hide: { opacity: 0, scale: 0.8 },
  });

  const secondPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { scale: 1.05 },
    minimize: { opacity: 0.95, scale: 0.95, transition: { duration: 0.5 } },
    hide: { opacity: 0, scale: 0.8 },
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

    setSelectedPlayerId(playerId);
    currentRoom?.send("votePlayer", playerId);
    setVoted(true);
  };

  if (!rounds || !rounds[currentRoundIndex]) {
    return (
      <View style={styles.container}>
        <BackgroundGradient style={styles.background} />
        <PrimaryText>Loading...</PrimaryText>
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
            {latestRound.question}
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
                style={[
                  styles.votePlayerContainer,
                  selectedPlayerId === firstPlayer.id && styles.selectedButton,
                ]}
              >
                <DisplayAvatar player={firstPlayer} />
                <PrimaryText style={styles.playerText}>
                  {firstPlayer.name}
                </PrimaryText>
              </MotiView>
            </TouchableOpacity>
          )}
          {secondPlayer && (
            <TouchableOpacity
              onPress={() => votePlayer(secondPlayer.id)}
              key={secondPlayer.id}
            >
              <MotiView
                state={secondPlayerAnimation}
                style={[
                  styles.votePlayerContainer,
                  selectedPlayerId === secondPlayer.id && styles.selectedButton,
                ]}
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
  questionContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 120,
  },
  defaultText: {
    fontSize: 36,
    textAlign: "center",
  },
  questionText: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  votePlayerContainer: {
    gap: 10,
    backgroundColor: "rgba(137, 47, 48, 0.6)",
    padding: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  selectedButton: {
    backgroundColor: "rgba(56, 255, 56, 0.6)",
  },
  playerText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});
