import { View, StyleSheet } from "react-native";
import PrimaryText from "@/components/primaryText";
import PositiveButton from "@/components/primaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import BackgroundGradient from "@/components/backgroundGradient";

type ErrorScreenProps = NativeStackScreenProps<RootStackParamList, "error">;

export default function ErrorScreen({ route, navigation }: ErrorScreenProps) {
  const { message } = route.params;
  const handleNavigation = () => {
    navigation?.navigate("home");
  };
  return (
    <View>
      <BackgroundGradient style={styles.background} />
      <PrimaryText>{message}</PrimaryText>
      <PositiveButton
        handlePress={() => handleNavigation()}
        text="Back to home"
      />
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
