import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";

import { useColyseusStore } from "@/context/ColyseusContext";
import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import LobbyAvatar from "@/components/lobbyAvatar";
import PrimaryButton from "@/components/primaryButton";
import QrCode from "@/components/qrCode";

import { RootStackParamList } from "@/navigation/RootStackParams";
import { useNavigation } from "expo-router";

type LobbyScreenProps = StackScreenProps<RootStackParamList, "lobby">;

export default function LobbyScreen({ route, navigation }: LobbyScreenProps) {
  const { currentRoom, disconnect, players } = useColyseusStore();
  const [userId, setUserId] = useState<string>("");

  const nav = useNavigation();
  const setNavigation = useColyseusStore((state) => state.setNavigation);

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  useEffect(() => {
    if (currentRoom) {
      setUserId(currentRoom.sessionId);
    }
  }, [currentRoom]);

  useEffect(() => {
    console.log("LobbyScreen players:", players);
  }, [players]);

  const handleLeave = () => {
    disconnect();
    navigation.popToTop();
  };

  const handleStartGame = () => {
    // Emit start game event or logic
    currentRoom?.send("startGame");
  };

  if (!currentRoom) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
        <PrimaryText tlw="text-4xl text-center">Loading...</PrimaryText>
      </View>
    );
  }

  const host = currentRoom.state.host; // Assuming host is part of the state

  if (!currentRoom) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <QrCode data={currentRoom.roomId} />
      <View style={styles.container}>
        <PrimaryText tlw="text-6xl text-center">The crew</PrimaryText>
        <View style={styles.spacer} />
        <View style={styles.playersContainer}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerWrapper}>
              <LobbyAvatar player={player} />
              <View style={styles.spacer} />
            </View>
          ))}
        </View>
        <View style={styles.actionContainer}>
          {host?.id === userId ? (
            <>
              <PrimaryButton text="Start game" handlePress={handleStartGame} />
              <View style={styles.spacerLarge} />
            </>
          ) : (
            <Text style={styles.waitingText}>
              Waiting on the homie with the crown
            </Text>
          )}
          <ErrorButton text="Leave" handlePress={handleLeave} />
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 5,
  },
  spacer: {
    height: 2,
  },
  spacerLarge: {
    height: 4,
  },
  playersContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  playerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  actionContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  waitingText: {
    textAlign: "center",
    fontSize: 18,
    opacity: 0.5,
  },
});
