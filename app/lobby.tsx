import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { useGameContext } from "@/context/GameContext";
import PrimaryText from "@/components/primaryText";
import QRCode from "react-native-qrcode-svg";
import { useSignalR } from "@/hooks/useSignalR";
import { useEffect } from "react";
import ErrorButton from "@/components/errorButton";
import { useSignalRContext } from "@/context/SignalRContext";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";

type LobbyScreenProps = StackScreenProps<RootStackParamList, "lobby">;

export default function LobbyScreen({ route, navigation }: LobbyScreenProps) {
  const { gameId, players, gameStatus, setPlayers } = useGameContext();
  const { leaveGame } = useSignalRContext();

  const handleLeave = () => {
    leaveGame();
    navigation.popToTop();
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
    <View className="flex justify-center items-center w-full h-full">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <View className="flex flex-row items-center self-end p-2 bg-white rounded-xl relative top-10 right-5">
        <PrimaryText tlw="text-2xl mr-2">Join Code</PrimaryText>
        <QRCode value={gameId} size={50} />
      </View>
      <View className="flex justify-around h-full w-full items-center gap-y-20 px-16 pt-10">
        <PrimaryText tlw="text-6xl text-center">The crew</PrimaryText>
        {players.map((player) => (
          <PrimaryText tlw="text-4xl text-center" key={player.id}>
            {player.name}
          </PrimaryText>
        ))}
        <ErrorButton
          text="Leave"
          handlePress={() => handleLeave()}
        ></ErrorButton>
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
