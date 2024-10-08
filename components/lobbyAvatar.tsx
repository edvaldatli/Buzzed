import { Player } from "@/types/GameTypes";
import { View } from "react-native";
import PrimaryText from "./primaryText";
import { Image } from "expo-image";
import { useEffect } from "react";

type LobbyAvatarProps = {
  player: Player;
};

export default function LobbyAvatar({ player }: LobbyAvatarProps) {
  useEffect(() => {
    console.log("Player: ", player);
  }, [player]);
  return (
    <View className="flex flex-row items-center">
      <Image
        source={player.imageUrl}
        className="w-14 h-14 rounded-full border-green-500 border-4"
      />
      <View className="w-3" />
      <PrimaryText tlw="text-3xl text-white">{player.name}</PrimaryText>
    </View>
  );
}
