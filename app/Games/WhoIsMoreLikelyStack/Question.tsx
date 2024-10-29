import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { useEffect } from "react";
import { View } from "react-native";

export default function QuestionScreen() {
  const { gameState } = useColyseusStore();
  return (
    <View className="h-full w-full justify-center items-center p-12">
      <PrimaryText tlw="text-4xl text-center">
        {gameState.rounds.battling}
      </PrimaryText>
    </View>
  );
}
