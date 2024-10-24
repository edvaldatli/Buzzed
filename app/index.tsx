import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PositiveButton from "@/components/primaryButton";
import PositiveText from "@/components/primaryText";
import Divider from "@/components/divider";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Index() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex justify-around items-center h-full p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 400 }}
      >
        <PositiveText>Buzzed!</PositiveText>
      </MotiView>

      <View className="flex flex-col justify-around h-48 w-full">
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", duration: 400 }}
          className="flex gap-y-4"
        >
          <View>
            <PositiveButton
              text="Join Game"
              handlePress={() =>
                navigation.navigate("enterName", { type: "joinGame" })
              }
            />
          </View>
          <View>
            <Divider text="OR" />
          </View>
          <View>
            <PositiveButton
              text="Create Game"
              handlePress={() =>
                navigation.navigate("enterName", { type: "createGame" })
              }
            />
          </View>
        </MotiView>
      </View>
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
