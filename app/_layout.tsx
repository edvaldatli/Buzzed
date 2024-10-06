import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { GameProvider } from "@/context/GameContext";

import Index from "@/app/index";
import JoinGameScreen from "@/app/joinGame";
import CreateGameScreen from "@/app/createGame";
import EnterNameScreen from "@/app/enterName";
import LobbyScreen from "@/app/lobby";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <GameProvider>
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="lobby"
            component={LobbyScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
