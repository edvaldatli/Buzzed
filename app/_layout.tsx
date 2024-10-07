import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { GameProvider } from "@/context/GameContext";
import { SignalRProvider } from "@/context/SignalRContext";

import Index from "@/app/index";
import JoinGameScreen from "@/app/joinGame";
import CreateGameScreen from "@/app/createGame";
import EnterNameScreen from "@/app/enterName";
import LobbyScreen from "@/app/lobby";
import PlayerImage from "@/app/playerImage";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <GameProvider>
      <SignalRProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen
              name="index"
              component={Index}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="joinGame"
              component={JoinGameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="createGame"
              component={CreateGameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="enterName"
              component={EnterNameScreen}
              initialParams={{ type: "createGame" }}
              options={{
                headerShown: false,
                gestureEnabled: false, // Disable swipe gesture
                animationEnabled: true, // Ensure animation still works
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
            />
            <Stack.Screen
              name="lobby"
              component={LobbyScreen}
              options={{
                headerShown: false,
                gestureEnabled: false, // Disable swipe gesture
                animationEnabled: true, // Ensure animation still works
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
            />
            <Stack.Screen
              name="playerImage"
              component={PlayerImage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SignalRProvider>
    </GameProvider>
  );
}
