import { Player } from "@/types/GameTypes";
import PrimaryText from "./primaryText";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type LobbyAvatarProps = {
  player: Player;
  host?: boolean;
};

export default function LobbyAvatar({ player, host }: LobbyAvatarProps) {
  return (
    <MotiView
      from={{ translateX: -400 }}
      animate={{ translateX: 0 }}
      transition={{ type: "spring", duration: 1600 }}
      style={styles.container}
    >
      {host && (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: -16,
            left: 30,
            transform: [{ rotate: "30deg" }],
          }}
        >
          <MaterialCommunityIcons name={"crown"} size={24} color="gold" />
        </View>
      )}
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
