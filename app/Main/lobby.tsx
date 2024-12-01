import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useColyseusStore } from "@/context/ColyseusContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import LobbyAvatar from "@/components/lobbyAvatar";
import PrimaryButton from "@/components/primaryButton";
import BackgroundGradient from "@/components/backgroundGradient";
import useHaptics from "@/hooks/useHaptics";
import AnimateNavigation, {
  AnimateNavigationHandle,
} from "@/components/animateNavigation";

type LobbyScreenProps = NativeStackScreenProps<RootStackParamList, "lobby">;

export default function LobbyScreen({ route, navigation }: LobbyScreenProps) {
  const { currentRoom, disconnect, players } = useColyseusStore();
  const { notification } = useHaptics();
  const [userId, setUserId] = useState<string>("");

  const animateNavRef = useRef<AnimateNavigationHandle>(null);

  const setNavigation = useColyseusStore((state) => state.setNavigation);

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  useEffect(() => {
    if (!currentRoom) return;
    currentRoom.onMessage("startGame", (data) => {
      if (animateNavRef.current) {
        animateNavRef.current.triggerAnimation();
      }
    });

    setUserId(currentRoom.sessionId);
  }, [currentRoom]);

  useEffect(() => {
    const vibrateOnPlayerJoin = async () => {
      await notification();
    };
    vibrateOnPlayerJoin();
  }, [players]);

  const handleLeave = () => {
    disconnect();
    navigation.popToTop();
  };

  const handleStartGame = () => {
    setTimeout(() => {
      currentRoom?.send("startGame");
    }, 5000);
  };

  if (!currentRoom) {
    return (
      <View style={styles.loadingContainer}>
        <BackgroundGradient style={styles.background} />
        <PrimaryText tlw="text-4xl text-center">Loading...</PrimaryText>
        <ActivityIndicator />
      </View>
    );
  }

  const host = currentRoom.state.host;

  if (!currentRoom) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={40}
          color="#FD841F"
          onPress={() =>
            navigation.navigate("qrCodeModal", { value: currentRoom.id })
          }
          style={styles.openModalButton}
        />
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
          <View style={styles.actionContainer} className="w-full">
            {host?.id === userId ? (
              players.length > 1 ? (
                <>
                  <PrimaryButton
                    text="Start game"
                    handlePress={handleStartGame}
                  />
                  <View style={styles.spacerLarge} />
                </>
              ) : (
                <>
                  <PrimaryButton
                    text="Waiting for players"
                    handlePress={handleStartGame}
                    tlw="bg-gray-400"
                    disabled
                  />
                  <View style={styles.spacerLarge} />
                </>
              )
            ) : (
              <Text style={styles.waitingText}>
                Waiting on the homie with the crown
              </Text>
            )}
            <View className="h-4" />
            <ErrorButton text="Leave" handlePress={handleLeave} />
          </View>
        </View>
      </SafeAreaView>
      <AnimateNavigation ref={animateNavRef} timeMs={5000}>
        <PrimaryText style={styles.exitNameText}>Eddi The King</PrimaryText>
        <PrimaryText style={styles.exitText}>Test</PrimaryText>
      </AnimateNavigation>
    </>
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
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-around",
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
    gap: 5,
  },
  waitingText: {
    textAlign: "center",
    fontSize: 18,
    opacity: 0.5,
  },
  openModalButton: {
    position: "absolute",
    height: 60,
    width: 60,
    right: 0,
    top: 50,
    zIndex: 100,
  },
});
