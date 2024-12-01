import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

export function useCustomFonts() {
  const [loaded, error] = useFonts({
    // Rubik fonts
    "Rubik-Black": require("@/assets/fonts/Rubik/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("@/assets/fonts/Rubik/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("@/assets/fonts/Rubik/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("@/assets/fonts/Rubik/Rubik-BoldItalic.ttf"),
    "Rubik-Italic": require("@/assets/fonts/Rubik/Rubik-Italic.ttf"),
    "Rubik-Light": require("@/assets/fonts/Rubik/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("@/assets/fonts/Rubik/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("@/assets/fonts/Rubik/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("@/assets/fonts/Rubik/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("@/assets/fonts/Rubik/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("@/assets/fonts/Rubik/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("@/assets/fonts/Rubik/Rubik-SemiBoldItalic.ttf"),

    // Signika fonts
    "Signika-Bold": require("@/assets/fonts/Signika/SignikaNegative-Bold.ttf"),
    "Signika-Light": require("@/assets/fonts/Signika/SignikaNegative-Light.ttf"),
    "Signika-Regular": require("@/assets/fonts/Signika/SignikaNegative-Regular.ttf"),
    "Signika-SemiBold": require("@/assets/fonts/Signika/SignikaNegative-SemiBold.ttf"),
    "Signika-Medium": require("@/assets/fonts/Signika/SignikaNegative-Medium.ttf"),
  });

  return [loaded, error];
}
