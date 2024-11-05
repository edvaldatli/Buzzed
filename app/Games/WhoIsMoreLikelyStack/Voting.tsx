import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";
import Timer from "@/components/timer";
import { useColyseusStore } from "@/context/ColyseusContext";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRef } from "react";
import { MotiView, useAnimationState } from "moti";

export default function VotingScreen() {
  const { rounds, currentRoom, players } = useColyseusStore();

  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];

  const firstPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { translateY: 50, scale: 1.2 },
    hide: {
      translateY: 50,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 },
    },
  });
  const secondPlayerAnimation = useAnimationState({
    idle: { scale: 1 },
    clicked: { translateY: -50, scale: 1.2 },
    hide: {
      translateY: -50,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 },
    },
  });
  const orTextAnimation = useAnimationState({
    idle: { scale: 1 },
    hide: { opacity: 0, scale: 0.8 },
  });

  const votePlayer = (playerId: string) => {
    if (playerId === firstPlayer.id) {
      firstPlayerAnimation.transitionTo("clicked");
      secondPlayerAnimation.transitionTo("hide");
    } else if (playerId === secondPlayer.id) {
      secondPlayerAnimation.transitionTo("clicked");
      firstPlayerAnimation.transitionTo("hide");
    }

    orTextAnimation.transitionTo("hide");

    currentRoom?.send("votePlayer", playerId);
  };

  return (
    <SafeAreaView className="h-full w-full justify-start items-center p-12">
      <BackgroundGradient style={styles.background} />
      <Timer />
      <View className="mt-20">
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
      </View>
      <View className="flex flex-row justify-around w-full h-full">
        {players.map((player) => {
          return (
            <Image
              source={
                player.avatar == "default-avatar-url"
                  ? require("../../../assets/images/avatar-placeholder.png")
                  : player.avatar
              }
              className="w-16 h-16 rounded-full border-green-500 border-4"
            />
          );
        })}
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
});
