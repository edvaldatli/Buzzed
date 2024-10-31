import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";
import Timer from "@/components/timer";
import { useColyseusStore } from "@/context/ColyseusContext";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function VotingScreen() {
  const { rounds, currentRoom, players } = useColyseusStore();

  const latestRound = rounds[rounds.length - 1];
  const [firstPlayer, secondPlayer] = latestRound?.battlingPlayers || [];

  const votePlayer = (playerId: string) => {
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
          <TouchableOpacity onPress={() => votePlayer(firstPlayer.id)}>
            <View className="flex justify-center items-center bg-primaryPink h-24 w-full rounded-lg shadow-lg">
              <PrimaryText tlw="text-4xl text-center text-white">
                {firstPlayer.name}
              </PrimaryText>
            </View>
          </TouchableOpacity>
        )}
        <PrimaryText tlw="text-xl text-white text-center my-2">OR</PrimaryText>
        {secondPlayer && (
          <TouchableOpacity onPress={() => votePlayer(secondPlayer.id)}>
            <View className="flex justify-center items-center bg-primaryPink h-24 w-full rounded-lg shadow-lg">
              <PrimaryText tlw="text-4xl text-center text-white">
                {secondPlayer.name}
              </PrimaryText>
            </View>
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
