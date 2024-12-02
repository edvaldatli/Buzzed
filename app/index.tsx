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
import PrimaryText from "@/components/primaryText";
import BackgroundGradient from "@/components/backgroundGradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const navigation = useNavigation<NavigationProp>();
  const [appIsReady, setAppIsReady] = useState(false);
  const animationRef = useRef<AnimateNavigationHandle>(null);

  useEffect(() => {
    console.log("App started");
    async function prepare() {
      try {
        console.log("Loading fonts and assets");
        await Font.loadAsync({
          Rubik: require("../assets/fonts/Rubik/Rubik-Bold.ttf"),
          "Rubik-Italic": require("../assets/fonts/Rubik/Rubik-Italic.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Assets loaded");
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
      console.log("Triggering animation...");
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
          timeMs={4000}
          navigateTo={() => navigation.navigate("home")}
          ref={animationRef}
        >
          <PrimaryText style={{ color: "white" }}>Welcome</PrimaryText>
        </AnimateNavigation>
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
    fontFamily: "Rubik", // Use the loaded font
    color: "#333",
  },
});
