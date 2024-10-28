import { View, StyleSheet } from "react-native";
import PrimaryText from "@/components/primaryText";
import PositiveButton from "@/components/primaryButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { LinearGradient } from "expo-linear-gradient";

type ErrorScreenProps = StackScreenProps<RootStackParamList, "error">;

export default function ErrorScreen({ route, navigation }: ErrorScreenProps) {
  const { message } = route.params;
  const handleNavigation = () => {
    navigation?.navigate("index");
  };
  return (
    <View className={"h-full w-full justify-center items-center p-12"}>
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <PrimaryText tlw="text-center text-3xl mb-10">{message}</PrimaryText>
      <PositiveButton
        handlePress={() => handleNavigation()}
        text="Back to home"
      ></PositiveButton>
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
