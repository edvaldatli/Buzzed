import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "@/components/primaryText";
import { MotiView } from "moti";
import { useColyseusStore } from "@/context/ColyseusContext"; // Import the Colyseus context

type CreateGameScreen = NativeStackScreenProps<
  RootStackParamList,
  "createGame"
>;

export default function CreateGameScreen({
  route,
  navigation,
}: CreateGameScreen) {
  const { name, image } = route.params;
  const { createRoom } = useColyseusStore();

  useEffect(() => {
    const createNewGame = async () => {
      try {
        await createRoom(name, image!);

        navigation.navigate("lobby");
        console.log("Game room created successfully");
      } catch (error) {
        console.log("Error creating game: ", error);
      }
    };

    createNewGame();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 400 }}
        exit={{ opacity: 0 }}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#E33EB0" />
        </View>
      </MotiView>
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
});
