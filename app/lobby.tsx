import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { useGameContext } from "@/context/GameContext";
import PrimaryText from "@/components/primaryText";
import QRCode from "react-native-qrcode-svg";
import ErrorButton from "@/components/errorButton";
import { useSignalRContext } from "@/context/SignalRContext";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import LobbyAvatar from "@/components/lobbyAvatar";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/primaryButton";
import QrCode from "@/components/qrCode";

type LobbyScreenProps = StackScreenProps<RootStackParamList, "lobby">;

export default function LobbyScreen({ route, navigation }: LobbyScreenProps) {
  const { gameId, players, host, gameStatus, setPlayers } = useGameContext();
  const { connected, connection } = useSignalRContext();
  const { leaveGame } = useSignalRContext();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (connected && connection) {
      setCurrentUserId(connection.connectionId);
    }
  }, [host]);

  const handleLeave = () => {
    leaveGame();
    navigation.popToTop();
  };

  const handleStartGame = () => {
    // Start game
  };

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
    <SafeAreaView className="flex justify-center items-center w-full h-full p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <QrCode data={gameId} />
      <View className="flex w-full h-full pt-5">
        <PrimaryText tlw="text-6xl text-center">The crew</PrimaryText>
        <View className="h-2" />
        <View className="flex flex-col justify-start items-start h-1/2">
          {players.map((player) => (
            <>
              <LobbyAvatar key={player.id} player={player} />
              <View className="h-2" key={`${player.id}${player.name}id}`} />
            </>
          ))}
        </View>
        <View className="flex flex-col justify-end h-1/3">
          {host?.id === currentUserId ? (
            <>
              <PrimaryButton
                text="Start game"
                handlePress={() => handleStartGame()}
              ></PrimaryButton>
              <View className="h-4" />
            </>
          ) : (
            <Text className="text-center text-xl opacity-50">
              Waiting on the homie with the crown
            </Text>
          )}
          <ErrorButton
            text="Leave"
            handlePress={() => handleLeave()}
          ></ErrorButton>
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
});
