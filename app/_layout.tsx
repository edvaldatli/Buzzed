import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

import Index from "@/app/index";
import JoinGameScreen from "@/app/joinGame";
import CreateGameScreen from "@/app/createGame";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
