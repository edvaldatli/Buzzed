import AnimateNavigation, {
  AnimateNavigationHandle,
} from "@/components/animateNavigation";
import BackgroundGradient from "@/components/backgroundGradient";
import ErrorButton from "@/components/errorButton";
import PrimaryButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MotiText } from "moti";
import { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

  // Animation trigger ref
  const animateNavRef = useRef<AnimateNavigationHandle>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
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
    console.log("handleNext");
    if (name === "") {
      setError("Lets put in that name");
    } else {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setPrompt(prompts[randomIndex]);
      storeName(name);
      inputRef.current?.blur();

      // Trigger animation programmatically
      if (animateNavRef.current) {
        animateNavRef.current.triggerAnimation();
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundGradient style={styles.background} />
        <View style={{ width: "100%" }}>
          <PrimaryText style={styles.textStyle}>Who's</PrimaryText>
          <PrimaryText style={styles.textStyle}>Buzzin?</PrimaryText>
        </View>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder={error || "Nickname"}
          placeholderTextColor={"#D9D9D9"}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton text="Next" handlePress={handleNext} />
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </KeyboardAvoidingView>

      <AnimateNavigation
        ref={animateNavRef}
        navigateTo={() => navigation.navigate("playerImage", { name, type })}
        timeMs={5000}
      >
        <PrimaryText style={styles.exitNameText}>Eddi The King</PrimaryText>
        <PrimaryText style={styles.exitText}>{prompt}</PrimaryText>
      </AnimateNavigation>
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
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: 65,
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
  exitNameText: {
    width: "100%",
    textAlign: "center",
    fontSize: 80,
    color: "#fff",
    fontFamily: "Rubik-BoldItalic",
    textShadowColor: "gold",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
