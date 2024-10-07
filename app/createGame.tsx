import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useGameContext } from "@/context/GameContext"; // Import the context hook
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "@/components/primaryText";
import { MotiView } from "moti";
import { useSignalRContext } from "@/context/SignalRContext";

type CreateGameScreen = StackScreenProps<RootStackParamList, "createGame">;

export default function CreateGameScreen({
  route,
  navigation,
}: CreateGameScreen) {
  const { name } = route.params;
  const { gameId, players, gameStatus, setGameId, setPlayers, setGameStatus } =
    useGameContext();

  const { createGame } = useSignalRContext();

  useEffect(() => {
    const createNewGame = async () => {
      try {
        await createGame(name);
        console.log("Game created successfully");
        navigation.navigate("lobby");
      } catch (error) {
        console.log("Error creating game: ", error);
      }
    };

    createNewGame();
  }, []);

  useEffect(() => {
    console.log("Game ID: ", gameId);
    console.log("Players: ", players);
    console.log("Game Status: ", gameStatus);
  }, [gameId, players, gameStatus]);

  return (
    <View className="flex h-full w-full justify-center items-center">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 400 }}
        exit={{ opacity: 0 }}
      >
        <View className="gap-y-20 px-16">
          <PrimaryText tlw="text-4xl text-center">
            Hold tight, we are creating a game for you
          </PrimaryText>
          <ActivityIndicator size="large" color="#E33EB0" />
        </View>
      </MotiView>
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
