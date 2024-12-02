import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import BackgroundGradient from "@/components/backgroundGradient";
import { useEffect, useState } from "react";
import { Player } from "@/types/GameTypes";
import DisplayAvatar from "@/components/displayAvatar";

export default function VotingResultScreen() {
  const { rounds, players } = useColyseusStore();
  const [winner, setWinner] = useState<Player>();
  const [currentRound, setCurrentRound] = useState<any>();

  useEffect(() => {
    if (!rounds || rounds.length === 0) {
      console.error("Rounds data is missing");
      return;
    }

    const currentRound = rounds[rounds.length - 1];
    setCurrentRound(currentRound);

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
          <PrimaryText>Who is more likely to</PrimaryText>
          <PrimaryText>{currentRound?.question}</PrimaryText>
          <DisplayAvatar player={winner} />
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
