import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import BackgroundGradient from "@/components/backgroundGradient";
import { useEffect, useState } from "react";
import { Player } from "@/types/GameTypes";

export default function VotingResultScreen() {
  const { rounds, players } = useColyseusStore();
  const [winner, setWinner] = useState<Player>();

  useEffect(() => {
    if (!rounds || rounds.length === 0) {
      console.error("Rounds data is missing");
      return;
    }

    const currentRound = rounds[rounds.length - 1];
    const winnerId = currentRound?.winner;

    // tie
    if (!winnerId) {
      setWinner(undefined);
      return;
    }

    const winner = players.find((player) => player.id === winnerId);
    setWinner(winner);
    console.log(winner);
  }, [rounds, players]);

  return (
    <View style={styles.container}>
      <BackgroundGradient style={styles.background} />

      {winner ? (
        <>
          <PrimaryText tlw="text-5xl text-center">
            Smells like a winner
          </PrimaryText>
          <View className="flex justify-center items-center bg-white shadow-lg p-4 rounded-lg">
            <Image
              source={
                winner?.avatar == "default-avatar-url"
                  ? require("../../../assets/images/avatar-placeholder.png")
                  : winner?.avatar
              }
              className="w-20 h-20 rounded-full border-green-500 border-4"
            />
            <PrimaryText>{winner.name}</PrimaryText>
          </View>
        </>
      ) : (
        <>
          <PrimaryText tlw="text-center">It's a tie</PrimaryText>
          <PrimaryText tlw="text-3xl text-center text-white">
            Going to the next round
          </PrimaryText>
        </>
      )}
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
