import { Player } from "@/types/GameTypes";
import { View } from "react-native";
import PrimaryText from "./primaryText";
import { Image } from "expo-image";
import { useEffect } from "react";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";

type LobbyAvatarProps = {
  player: Player;
};

export default function LobbyAvatar({ player }: LobbyAvatarProps) {
  return (
    <MotiView
      from={{ translateX: -400 }}
      animate={{ translateX: 0 }}
      transition={{ type: "spring", duration: 1600 }}
      style={styles.container}
    >
      <Image
        source={
          player.avatar == "default-avatar-url"
            ? require("../assets/images/avatar-placeholder.png")
            : player.avatar
        }
        style={[styles.avatar, { borderColor: player.color }]}
        transition={{ duration: 800, effect: "cross-dissolve" }}
      />
      <PrimaryText style={styles.text}>{player.name}</PrimaryText>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    gap: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
  },
  text: {
    textAlign: "left",
    fontSize: 32,
    alignSelf: "center",
    padding: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    color: "#fff",
  },
});
