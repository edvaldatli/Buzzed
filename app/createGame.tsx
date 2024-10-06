import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useGameContext } from "@/context/GameContext"; // Import the context hook
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "@/components/primaryText";

type CreateGameScreen = StackScreenProps<RootStackParamList, "createGame">;

export default function CreateGameScreen({
  route,
  navigation,
}: CreateGameScreen) {
  const { name } = route.params;
  const { gameId, setGameId, players, setPlayers, gameStatus, setGameStatus } =
    useGameContext();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://25a2-157-157-36-239.ngrok-free.app/gameHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Connected");
        connection
          .invoke("CreateGame", name)
          .catch((err) => {
            console.error("Create game failed: ", err);
          })
          .then(() => {
            console.log("Create game success");
            navigation.navigate("lobby");
          });
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    connection.on("GameCreated", (gameState) => {
      console.log("Game state: ", gameState);

      setGameId(gameState.id); // Update game ID
      setPlayers(gameState.players); // Update player list
      setGameStatus(gameState.currentState); // Update game status
    });

    startConnection();

    return () => {
      connection.stop().then(() => {
        console.log("Disconnected");
      });
    };
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
      <View className="gap-y-20 px-16">
        <PrimaryText tlw="text-4xl text-center">
          Hold tight, we are creating a game for you
        </PrimaryText>
        <ActivityIndicator size="large" color="#E33EB0" />
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
