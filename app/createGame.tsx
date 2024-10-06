import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";

export default function CreateGameScreen() {
  return (
    <View className="flex h-full justify-center items-center">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <Text>Test</Text>
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
