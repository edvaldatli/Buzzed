import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

export default function QuestionScreen() {
  const { rounds } = useColyseusStore();

  return (
    <View className="h-full w-full justify-around items-center p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      {rounds && (
        <View className="shadow-xl w-full rounded-lg p-2 absolute">
          <PrimaryText tlw="text-3xl text-center flex-nowrap">
            Who is more likely to{" "}
          </PrimaryText>
          <View className="h-4" />
          <PrimaryText tlw="text-5xl text-center text-white w-full">
            {rounds[rounds.length - 1].question}
          </PrimaryText>
        </View>
      )}
      <View />
      <PrimaryText tlw="text-4xl text-center text-white w-full">
        Round {rounds.length.toString()}
      </PrimaryText>
      <View />
    </View>
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
});
