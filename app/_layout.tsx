import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

// Main screens
import App from "@/app/index";
import Home from "@/app/Main/home";
import JoinGameScreen from "@/app/Main/joinGame";
import CreateGameScreen from "@/app/Main/createGame";
import EnterNameScreen from "@/app/Main/enterName";
import LobbyScreen from "@/app/Main/lobby";
import PlayerImage from "@/app/Main/playerImage";
import ErrorScreen from "@/app/Main/error";

import WhoIsMoreLikelyStack from "./Games/WhoIsMoreLikelyStack/Stack";
import QRCodeModalScreen from "./Main/qrCodeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="app">
      <Stack.Screen
        name="app"
        component={App}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "none",
        }}
      />
      <Stack.Screen
        name="qrCodeModal"
        component={QRCodeModalScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="joinGame"
        component={JoinGameScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="createGame"
        component={CreateGameScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
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
          animation: "none",
        }}
      />
      <Stack.Screen
        name="playerImage"
        component={PlayerImage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "none",
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
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
}
