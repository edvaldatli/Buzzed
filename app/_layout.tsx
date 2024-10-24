import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

import Index from "@/app/index";
import JoinGameScreen from "@/app/joinGame";
import CreateGameScreen from "@/app/createGame";
import EnterNameScreen from "@/app/enterName";
import LobbyScreen from "@/app/lobby";
import PlayerImage from "@/app/playerImage";
import IntroScreen from "@/app/intro";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const [isNavReady, setNavReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNavReady(true);
    }, 100); // Wait for 100ms to ensure navigation is ready

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Index}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="joinGame"
          component={JoinGameScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="createGame"
          component={CreateGameScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="enterName"
          component={EnterNameScreen}
          initialParams={{ type: "createGame" }}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="lobby"
          component={LobbyScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="playerImage"
          component={PlayerImage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="intro"
          component={IntroScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
