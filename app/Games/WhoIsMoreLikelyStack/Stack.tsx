import { RootStackParamList } from "@/navigation/RootStackParams";
import { createStackNavigator } from "@react-navigation/stack";

// Who is more likely screens
import QuestionScreen from "@/app/Games/WhoIsMoreLikelyStack/Question";
import ResultScreen from "@/app/Games/WhoIsMoreLikelyStack/Result";
import VotingResultScreen from "@/app/Games/WhoIsMoreLikelyStack/VotingResult";
import IntroScreen from "@/app/Games/WhoIsMoreLikelyStack/Intro";
import VotingScreen from "@/app/Games/WhoIsMoreLikelyStack/Voting";

const Stack = createStackNavigator<RootStackParamList>();

export default function WhoIsMoreLikelyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="votingResult"
        component={VotingResultScreen}
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
        name="question"
        component={QuestionScreen}
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
        name="result"
        component={ResultScreen}
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
        name="voting"
        component={VotingScreen}
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
        name="intro"
        component={IntroScreen}
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
  );
}
