import { View, StyleSheet, ActivityIndicator } from "react-native";
import PrimaryButton from "@/components/primaryButton";
import PositiveText from "@/components/primaryText";
import Divider from "@/components/divider";
import { MotiView, useAnimationState } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { Image, useImage } from "expo-image";
import BackgroundGradient from "@/components/backgroundGradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "lobby">;

export default function Index() {
  const navigation = useNavigation<NavigationProp>();

  const exitAnimation = useAnimationState({
    from: { scale: 2000 },
    to: { scale: 0 },
  });

  return (
    <>
      <View style={styles.container}>
        <BackgroundGradient style={styles.background} />
        <MotiView
          from={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 400 }}
        >
          <MotiView
            from={{ scale: 0.85 }}
            animate={{ scale: 1.1 }}
            transition={{
              type: "timing",
              duration: 3000,
              loop: true,
              delay: 100,
            }}
          >
            <Image
              source={require("../../assets/images/splash.png")}
              contentFit="contain"
              style={{ width: 200, height: 200 }}
            />
          </MotiView>
        </MotiView>

        <View className="flex flex-col justify-around h-48 w-full">
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 400 }}
            style={{ gap: 10 }}
          >
            <View>
              <PrimaryButton
                text="Join Game"
                handlePress={() =>
                  navigation.navigate("enterName", { type: "joinGame" })
                }
              />
            </View>
            <View style={{ width: "100%" }}>
              <Divider text="OR" />
            </View>
            <View>
              <PrimaryButton
                text="Create Game"
                handlePress={() =>
                  navigation.navigate("enterName", { type: "createGame" })
                }
              />
            </View>
          </MotiView>
        </View>
      </View>
      <MotiView
        state={exitAnimation}
        transition={{
          type: "timing",
          duration: 400,
        }}
        style={styles.exitAnimationStyle}
      />
    </>
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 40,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  exitAnimationStyle: {
    position: "absolute",
    backgroundColor: "#FF69B4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: -20,
    width: 2,
    height: 2,
  },
});
