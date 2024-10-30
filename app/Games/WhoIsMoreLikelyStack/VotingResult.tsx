import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function VotingResultScreen() {
  const { rounds, players } = useColyseusStore();

  const winnerid = rounds[rounds.length - 1].winner;

  const winner = players.find((player) => player.id === winnerid);

  return (
    <View className="h-full w-full justify-around items-center p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <PrimaryText tlw="text-5xl text-center">Smells like a winner</PrimaryText>
      <View className="flex justify-center items-center bg-white shadow-lg p-4 rounded-lg">
        <Image
          source={
            winner.avatar == "default-avatar-url"
              ? require("../../../assets/images/avatar-placeholder.png")
              : winner.avatar
          }
          className="w-20 h-20 rounded-full border-green-500 border-4"
        />
        <PrimaryText>{winner.name}</PrimaryText>
      </View>
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
});
