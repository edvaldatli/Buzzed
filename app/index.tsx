import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AnimateNavigation, {
  AnimateNavigationHandle,
} from "@/components/animateNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useNavigation } from "expo-router";
import BackgroundGradient from "@/components/backgroundGradient";
import { useCustomFonts } from "@/hooks/useCustomFonts";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const navigation = useNavigation<NavigationProp>();
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useCustomFonts();
  const animationRef = useRef<AnimateNavigationHandle>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Rubik: require("../assets/fonts/Rubik/Rubik-Bold.ttf"),
          "Rubik-Italic": require("../assets/fonts/Rubik/Rubik-Italic.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        console.log("App is ready");
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
      animationRef.current?.triggerAnimation();
    }
  }, [appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("Splash screen hidden");
    }
  }, [appIsReady]);

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <BackgroundGradient style={styles.background} />
        <AnimateNavigation
          timeMs={500}
          navigateTo={() => navigation.navigate("home")}
          ref={animationRef}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Rubik",
    color: "#333",
  },
  splashContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
  },
  madeByContainer: {},
  madeByImage: {},
});
