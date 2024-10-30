import { Player } from "@/types/GameTypes";
import { View } from "react-native";
import PrimaryText from "./primaryText";
import { Image } from "expo-image";
import { useEffect } from "react";
import { MotiView } from "moti";

type LobbyAvatarProps = {
  player: Player;
};

export default function LobbyAvatar({ player }: LobbyAvatarProps) {
  useEffect(() => {
    console.log("Player: ", player);
  }, [player]);
  return (
    <MotiView
      className="flex flex-row items-center"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
    >
      <Image
        source={
          player.avatar == "default-avatar-url"
            ? require("../assets/images/avatar-placeholder.png")
            : player.avatar
        }
        className="w-14 h-14 rounded-full border-green-500 border-4"
      />
      <View className="w-3" />
      <PrimaryText tlw="text-3xl text-white">{player.name}</PrimaryText>
    </MotiView>
  );
}
