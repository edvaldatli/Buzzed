import LobbyAvatar from "@/components/lobbyAvatar";
import PrimaryText from "@/components/primaryText";
import Timer from "@/components/timer";
import { useColyseusStore } from "@/context/ColyseusContext";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VotingScreen() {
  const { rounds, currentRoom } = useColyseusStore();

  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];

  const votePlayer = (playerId: string) => {
    currentRoom?.send("votePlayer", playerId);
  };

  return (
    <SafeAreaView className="h-full w-full justify-start items-center p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />

      <Timer />

      <View className="mt-20">
        <PrimaryText tlw="text-3xl text-center">
          Who is more likely to
        </PrimaryText>
        <View className="h-4" />
        <PrimaryText tlw="text-5xl text-white text-center">
          {rounds[rounds.length - 1].question}
        </PrimaryText>
      </View>

      <View className="w-full h-1/2 justify-center">
        {firstPlayer && (
          <TouchableOpacity onPress={() => votePlayer(firstPlayer.id)}>
            <LobbyAvatar player={firstPlayer} />
          </TouchableOpacity>
        )}

        {secondPlayer && (
          <TouchableOpacity onPress={() => votePlayer(secondPlayer.id)}>
            <LobbyAvatar player={secondPlayer} />
          </TouchableOpacity>
        )}
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
