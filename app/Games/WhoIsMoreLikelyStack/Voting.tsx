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

export default function VotingScreen() {
  const { rounds, currentRoom, players, currentState, currentRoundIndex } =
    useColyseusStore();
  const [winner, setWinner] = useState<Player | null>(null);

  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];

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

  const votePlayer = (playerId: string) => {
    if (playerId === firstPlayer.id) {
      firstPlayerAnimation.transitionTo("clicked");
      secondPlayerAnimation.transitionTo("minimize");
    } else if (playerId === secondPlayer.id) {
      secondPlayerAnimation.transitionTo("clicked");
      firstPlayerAnimation.transitionTo("minimize");
    }
    orTextAnimation.transitionTo("hide");

    currentRoom?.send("votePlayer", playerId);
  };

  const handlePlayerVoted = (message: any) => {
    console.log("Player voted", message);
  };

  useEffect(() => {
    if (currentState === "displaying_results") {
      firstPlayerAnimation.transitionTo("hide");
      secondPlayerAnimation.transitionTo("hide");
      orTextAnimation.transitionTo("hide");

      const winnerId = rounds[rounds.length - 1].winner;
      const winningPlayer = players.find((player) => player.id === winnerId);
      setWinner(winningPlayer);

      setTimeout(() => {
        winnerAnimation.transitionTo("visible");
      }, 500);
    } else {
      setWinner(null);
      winnerAnimation.transitionTo("hidden");
    }

    currentRoom?.onMessage("playerVoted", (message) => {
      handlePlayerVoted(message);
    });
  }, [currentState]);

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
    <SafeAreaView style={styles.container}>
      <BackgroundGradient style={styles.background} />
      <Timer />
      <View>
        <PrimaryText tlw="text-2xl text-center">
          Who is more likely to
        </PrimaryText>
        <View className="h-4" />
        <PrimaryText tlw="text-4xl text-white text-center">
          {rounds[rounds.length - 1].question}
        </PrimaryText>
      </View>

      <View className="w-full h-1/2 justify-center">
        {firstPlayer && (
          <TouchableOpacity
            onPress={() => votePlayer(firstPlayer.id)}
            key={firstPlayer.id}
          >
            <MotiView
              className="flex justify-center items-center bg-primaryPink h-24 w-full rounded-lg shadow-lg"
              state={firstPlayerAnimation}
            >
              <PrimaryText tlw="text-4xl text-center text-white">
                {firstPlayer.name}
              </PrimaryText>
            </MotiView>
          </TouchableOpacity>
        )}
        <MotiView state={orTextAnimation}>
          <PrimaryText tlw="text-xl text-white text-center my-2">
            OR
          </PrimaryText>
        </MotiView>
        {secondPlayer && (
          <TouchableOpacity
            onPress={() => votePlayer(secondPlayer.id)}
            key={secondPlayer.id}
          >
            <MotiView
              className="flex justify-center items-center bg-primaryPink h-24 w-full rounded-lg shadow-lg"
              state={secondPlayerAnimation}
            >
              <PrimaryText tlw="text-4xl text-center text-white">
                {secondPlayer.name}
              </PrimaryText>
            </MotiView>
          </TouchableOpacity>
        )}
        <AnimatePresence>
          {winner && (
            <MotiView
              key={winner.id}
              className="flex justify-center items-center bg-primaryPink shadow-lg w-full p-4 rounded-lg absolute"
              state={winnerAnimation}
            >
              <Image
                source={
                  winner.avatar === "default-avatar-url"
                    ? require("../../../assets/images/avatar-placeholder.png")
                    : winner.avatar
                }
                className="w-20 h-20 rounded-full border-green-500 border-4"
              />
              <PrimaryText tlw="text-white text-2xl">{winner.name}</PrimaryText>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
      <View className="flex flex-row justify-around w-full h-full">
        {players.map((player) => (
          <Image
            key={player.id}
            source={
              player.avatar === "default-avatar-url"
                ? require("../../../assets/images/avatar-placeholder.png")
                : player.avatar
            }
            className="w-16 h-16 rounded-full border-green-500 border-4"
          />
        ))}
      </View>
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
    paddingVertical: 48,
  },
});
