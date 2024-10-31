import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

// Main screens
import Index from "@/app/Main/index";
import JoinGameScreen from "@/app/Main/joinGame";
import CreateGameScreen from "@/app/Main/createGame";
import EnterNameScreen from "@/app/Main/enterName";
import LobbyScreen from "@/app/Main/lobby";
import PlayerImage from "@/app/Main/playerImage";
import ErrorScreen from "@/app/Main/error";

import WhoIsMoreLikelyStack from "./Games/WhoIsMoreLikelyStack/Stack";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <NavigationContainer independent>
      {/*Main navigation stack*/}
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen
          name="index"
          component={Index}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="joinGame"
          component={JoinGameScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: ({ current, next }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
        <Stack.Screen
          name="createGame"
          component={CreateGameScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: ({ current, next }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
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
            cardStyleInterpolator: ({ current, next }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
        <Stack.Screen
          name="playerImage"
          component={PlayerImage}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="error"
          component={ErrorScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        {/*Who is more likley game stack*/}
        <Stack.Screen
          name="WhoIsMoreLikelyStack"
          component={WhoIsMoreLikelyStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: ({ current, next }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
