import BackgroundGradient from "@/components/backgroundGradient";
import ErrorButton from "@/components/errorButton";
import PrimaryButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MotiText, MotiView, useAnimationState } from "moti";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";

type EnterNameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "enterName"
>;

const prompts = [
  "Hold on, that name just set off all our coolness alarms!",
  "You're not just a name, you're a vibe!",
  "If names were gold, you'd be a treasure chest!",
  "Your name has been saved in the Hall of Fame... or at least in our app.",
];

export default function EnterNameScreen({
  route,
  navigation,
}: EnterNameScreenProps) {
  const { getData, storeData } = useAsyncStorage();
  const { type } = route.params;
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    exitAnimation.transitionTo("start");
    enterTextAnimation.transitionTo("start");
    enterTextAnimation2.transitionTo("start");
    async function getName() {
      const storedName = await getData("name");
      if (storedName) {
        setName(storedName);
      }
    }
    getName();
  }, []);

  const storeName = async (name: string) => {
    await storeData("name", name);
  };

  const handleNext = () => {
    if (name === "") {
      setError("Lets put in that name");
    } else {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setPrompt(prompts[randomIndex]);
      storeName(name);
      exitAnimation.transitionTo("then");
      setTimeout(() => {
        enterTextAnimation.transitionTo("then");
      }, 200);
      setTimeout(() => {
        enterTextAnimation2.transitionTo("then");
      }, 400);
      setTimeout(() => {
        navigation.navigate("playerImage", { name, type });
        exitAnimation.transitionTo("start");
        enterTextAnimation.transitionTo("start");
        enterTextAnimation2.transitionTo("start");
      }, 4000);
    }
  };

  const exitAnimation = useAnimationState({
    start: { scale: 0 },
    then: { scale: 2000 },
  });

  const enterTextAnimation = useAnimationState({
    start: { opacity: 0, translateY: 100 },
    then: { opacity: 1, translateY: 0 },
  });

  const enterTextAnimation2 = useAnimationState({
    start: { opacity: 0, translateY: 200 },
    then: { opacity: 1, translateY: 100 },
  });

  return (
    <>
      <KeyboardAvoidingView
        className="flex h-full w-full justify-around items-center p-12"
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundGradient style={styles.background} />
        <PrimaryText style={styles.textStyle}>Who's Buzzin?</PrimaryText>
        <TextInput
          className="bg-white w-full h-16 rounded-full text-center text-3xl font-bold text-black shadow-md"
          style={styles.textInput}
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder={error || "Enter your name"}
          placeholderTextColor={"#E33EB0"}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            text="Next"
            handlePress={() => handleNext()}
          ></PrimaryButton>
          <ErrorButton
            text="Cancel"
            handlePress={() => navigation.goBack()}
          ></ErrorButton>
        </View>
      </KeyboardAvoidingView>
      <MotiView
        state={exitAnimation}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={styles.exitAnimationStyle}
      />
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotiText style={styles.exitNameText} state={enterTextAnimation}>
          {name}
        </MotiText>
        <MotiText
          style={styles.exitText}
          state={enterTextAnimation2}
          transition={{
            type: "timing",
            duration: 500,
          }}
        >
          {prompt}
        </MotiText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 24,
  },
  textStyle: {
    flexDirection: "row",
    fontSize: 52,
    color: "#FF80C6",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 5,
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    fontSize: 34,
    fontFamily: "Rubik-BoldItalic",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
  },
  exitAnimationStyle: {
    position: "absolute",
    backgroundColor: "#FF69B4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: -20,
    width: 2,
    height: 2,
  },
  exitNameText: {
    width: "100%",
    textAlign: "center",
    fontSize: 100,
    color: "#fff",
    fontFamily: "Rubik-BoldItalic",
    textShadowColor: "gold",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 5,
    paddingHorizontal: 40,
  },
  exitText: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontFamily: "Rubik-BoldItalic",
    paddingHorizontal: 40,
  },
});
