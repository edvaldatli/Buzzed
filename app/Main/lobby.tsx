import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useColyseusStore } from "@/context/ColyseusContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AnimateNavigation, {
  AnimateNavigationHandle,
} from "@/components/animateNavigation";
import useHaptics from "@/hooks/useHaptics";

import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import LobbyAvatar from "@/components/lobbyAvatar";
import PrimaryButton from "@/components/primaryButton";
import BackgroundGradient from "@/components/backgroundGradient";

type LobbyScreenProps = NativeStackScreenProps<RootStackParamList, "lobby">;

export default function LobbyScreen({ route, navigation }: LobbyScreenProps) {
  const { currentRoom, disconnect, players } = useColyseusStore();
  const { notification } = useHaptics();
  const [userId, setUserId] = useState<string>("");
  const [disabledStartButton, setDisabledStartButton] = useState(false);

  const animateNavRef = useRef<AnimateNavigationHandle>(null);

  const setNavigation = useColyseusStore((state) => state.setNavigation);

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  useEffect(() => {
    setDisabledStartButton(false);
    console.log("StartGame listener");
    if (!currentRoom) return;
    currentRoom.onMessage("startGame", (data) => {
      console.log("StartGame message received", data);
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
    navigation.popTo("home");
  };

  const handleStartGame = () => {
    setDisabledStartButton(true);
    currentRoom?.send("startGame");
  };

  if (!currentRoom) {
    return (
      <View style={styles.loadingContainer}>
        <BackgroundGradient style={styles.background} />
        <PrimaryText>Loading...</PrimaryText>
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
        <BackgroundGradient style={styles.background} />
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={34}
          color="#FD841F"
          onPress={() =>
            navigation.navigate("qrCodeModal", { value: currentRoom.id })
          }
          style={styles.openModalButton}
        />
        <MaterialCommunityIcons
          name="cog-outline"
          size={34}
          color="#FD841F"
          onPress={() => navigation.navigate("gameSettings")}
          style={{ ...styles.openModalButton, right: 50 }}
        />
        <View style={styles.container}>
          <PrimaryText>The crew</PrimaryText>
          <View style={styles.spacer} />
          <View style={styles.playersContainer}>
            {players.map((player) => (
              <View key={player.id} style={styles.playerWrapper}>
                <LobbyAvatar player={player} host={player.id === host.id} />
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
                    disabled={disabledStartButton}
                  />
                  <View style={styles.spacerLarge} />
                </>
              ) : (
                <>
                  <PrimaryButton
                    text="Waiting for players"
                    handlePress={handleStartGame}
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
            <ErrorButton text="Leave" handlePress={handleLeave} />
          </View>
        </View>
      </SafeAreaView>
      <AnimateNavigation
        ref={animateNavRef}
        timeMs={5000}
        navigateTo={() => {
          setTimeout(() => {
            setNavigation(navigation);
          }, 1000);
        }}
      >
        <PrimaryText
          style={{
            fontSize: 60,
            color: "#83E4FF",
            textShadowColor: "#FF0105",
            textShadowOffset: { width: 9, height: -11 },
            textShadowRadius: 1,
          }}
        >
          GET READY
        </PrimaryText>
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
