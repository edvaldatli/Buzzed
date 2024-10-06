import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { useGameContext } from "@/context/GameContext";
import PrimaryText from "@/components/primaryText";

export default function LobbyScreen() {
  const { gameId, players, gameStatus } = useGameContext();

  if (!gameId) {
    return (
      <View className="flex justify-center items-center w-full h-full">
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
        <PrimaryText tlw="text-4xl text-center">Loading...</PrimaryText>
      </View>
    );
  }

  return (
    <View className="flex justify-center items-center w-full h-full">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <View className="gap-y-20 px-16">
        <PrimaryText tlw="text-4xl text-center">Game ID: {gameId}</PrimaryText>
        {players.map((player) => (
          <PrimaryText tlw="text-4xl text-center" key={player.id}>
            {player.name}
          </PrimaryText>
        ))}
        <PrimaryText tlw="text-4xl text-center">
          Game Status: {gameStatus}
        </PrimaryText>
      </View>
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
