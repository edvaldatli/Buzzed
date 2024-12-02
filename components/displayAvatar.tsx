import { Player } from "@/types/GameTypes";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import PrimaryText from "@/components/primaryText";

type DisplayAvatarProps = {
  player: Player;
};

export default function DisplayAvatar({ player }: DisplayAvatarProps) {
  return (
    <View style={styles.avatarContainer}>
      <Image
        source={
          player.avatar == "default-avatar-url"
            ? require("../assets/images/avatar-placeholder.png")
            : player.avatar
        }
        style={[styles.avatar, { borderColor: player.color }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 4,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
