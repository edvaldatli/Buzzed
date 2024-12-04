import BackgroundGradient from "@/components/backgroundGradient";
import LobbyAvatar from "@/components/lobbyAvatar";
import PodiumAvatar from "@/components/podiumAvatar";
import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, useAnimationState } from "moti";
import { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { Player } from "@/types/GameTypes";

export default function ResultScreen() {
  const { players, currentRoom } = useColyseusStore();
  const [confetti, setConfetti] = useState(false);
  const [darken, setDarken] = useState(false);
  const [winner, setWinner] = useState<Player>(players[0]);
  const [secondPlace, setSecondPlace] = useState<Player>(players[1]);
  const [thirdPlace, setThirdPlace] = useState<Player | null>();

  const winnerAnimation = useAnimationState({
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  });

  const secondPlaceAnimation = useAnimationState({
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  });

  const thirdPlaceAnimation = useAnimationState({
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  });

  useEffect(() => {
    // Find winners
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setWinner(sortedPlayers[0]);
    setSecondPlace(sortedPlayers[1]);
    setThirdPlace(sortedPlayers[2]);

    winnerAnimation.transitionTo("hidden");
    secondPlaceAnimation.transitionTo("hidden");
    thirdPlaceAnimation.transitionTo("hidden");
    setTimeout(() => {
      thirdPlaceAnimation.transitionTo("show");
    }, 2000);
    setTimeout(() => {
      secondPlaceAnimation.transitionTo("show");
    }, 4000);
    setTimeout(() => {
      setDarken(true);
    }, 6000);
    setTimeout(() => {
      winnerAnimation.transitionTo("show");
      setConfetti(true);
    }, 10000);
  }, []);

  return (
    <>
      <View style={{ flex: 1, paddingTop: 60 }}>
        {confetti && (
          <Image
            source={require("../../../assets/images/confettiAnimated.gif")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 3,
            }}
          />
        )}
        <BackgroundGradient style={styles.background} />
        <View
          style={{
            height: "20%",
          }}
        >
          {!confetti ? (
            <PrimaryText>And the winner is...</PrimaryText>
          ) : (
            <PrimaryText style={{ zIndex: 2 }}>Your winner!</PrimaryText>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <MotiView
              style={styles.followUpContainer}
              state={secondPlaceAnimation}
            >
              <PodiumAvatar player={secondPlace} size="medium" />
              <LinearGradient
                colors={["#FF80C6", "transparent"]}
                locations={[0, 0.9]}
                style={styles.followUpContainer}
              >
                <PrimaryText style={{ color: "#6D6D6D", opacity: 0.5 }}>
                  2nd
                </PrimaryText>
              </LinearGradient>
            </MotiView>
            <MotiView style={styles.winnerContainer} state={winnerAnimation}>
              <PodiumAvatar player={winner} size="large" />
              <LinearGradient
                colors={["#FF80C6", "transparent"]}
                locations={[0, 0.9]}
                style={styles.followUpContainer}
              >
                <PrimaryText style={{ color: "#FFF600", opacity: 0.5 }}>
                  1st
                </PrimaryText>
              </LinearGradient>
            </MotiView>
            {thirdPlace && (
              <MotiView
                style={styles.followUpContainer}
                state={thirdPlaceAnimation}
              >
                <PodiumAvatar player={thirdPlace} size="medium" />
                <LinearGradient
                  colors={["#FF80C6", "transparent"]}
                  locations={[0, 0.9]}
                  style={styles.followUpContainer}
                >
                  <PrimaryText style={{ color: "#883000", opacity: 0.5 }}>
                    3rd
                  </PrimaryText>
                </LinearGradient>
              </MotiView>
            )}
          </View>
        </View>
      </View>
      {darken && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        ></MotiView>
      )}
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
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
  },
  followUpContainer: {
    flex: 1,
    height: "50%",
    borderRadius: 10,
    gap: 20,
    zIndex: 2,
  },
  winnerContainer: {
    height: "80%",
    width: "34%",
    borderRadius: 10,
    gap: 20,
    zIndex: 2,
  },
});
