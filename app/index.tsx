import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PositiveButton from "@/components/primaryButton";
import PositiveText from "@/components/primaryText";
import Divider from "@/components/divider";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Index() {
  const navigation = useNavigation<NavigationProp>();
  const fontsLoaded = useCustomFonts();
  const [appIsReady, setAppIsReady] = useState(false);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Show a blank screen while app is preparing
  if (!appIsReady) {
    return null;
  }
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
        <PositiveButton
          text="Join Game"
          handlePress={() =>
            navigation.navigate("enterName", { type: "joinGame" })
          }
        />
        <Divider text="OR" />
        <PositiveButton
          text="Create Game"
          handlePress={() =>
            navigation.navigate("enterName", { type: "createGame" })
          }
        />
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
