import { Player } from "@/types/GameTypes";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import PrimaryText from "@/components/primaryText";

type DisplayAvatarProps = {
  player: Player;
  size: "small" | "medium" | "large";
};

export default function PodiumAvatar({ player, size }: DisplayAvatarProps) {
  // Dynamically calculate size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { avatarSize: 40, textSize: 16 };
      case "large":
        return { avatarSize: 120, textSize: 36 };
      case "medium":
      default:
        return { avatarSize: 80, textSize: 28 };
    }
  };

  const { avatarSize, textSize } = getSizeStyles();

  return (
    <View style={styles.avatarContainer}>
      <Image
        source={
          player.avatar === "default-avatar-url"
            ? require("../assets/images/avatar-placeholder.png")
            : player.avatar
        }
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            borderColor: player.color,
          },
        ]}
      />
      <PrimaryText style={[styles.text, { fontSize: textSize }]}>
        {player.name}
      </PrimaryText>
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
    gap: 10,
  },
  avatar: {
    borderWidth: 4,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
