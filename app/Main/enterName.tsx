import ErrorButton from "@/components/errorButton";
import PrimaryButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type EnterNameScreenProps = StackScreenProps<RootStackParamList, "enterName">;

export default function EnterNameScreen({
  route,
  navigation,
}: EnterNameScreenProps) {
  const { getData, storeData } = useAsyncStorage();
  const { type } = route.params;
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    if (name === "") {
      setError("Lets put in that name");
    } else {
      storeName(name);
      navigation.navigate("playerImage", { name, type });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex h-full w-full justify-around items-center p-12"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <PrimaryText tlw="text-center text-5xl">Who's Buzzin?</PrimaryText>
      <TextInput
        className="bg-white w-full h-16 rounded-full text-center text-3xl font-bold text-black shadow-md"
        value={name}
        onChangeText={(name) => setName(name)}
        placeholder={error || "Enter your name"}
        placeholderTextColor={"#E33EB0"}
      ></TextInput>
      <View className="w-full">
        <PrimaryButton
          text="Next"
          handlePress={() => handleNext()}
        ></PrimaryButton>
        <View className="h-4"></View>
        <ErrorButton
          text="Cancel"
          handlePress={() => navigation.goBack()}
        ></ErrorButton>
      </View>
    </KeyboardAvoidingView>
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
});
