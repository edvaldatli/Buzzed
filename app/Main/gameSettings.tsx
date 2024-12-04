import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import { useColyseusStore } from "@/context/ColyseusContext";
import { MotiView, SafeAreaView } from "moti";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";

type GameSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "gameSettings"
>;

export default function GameSettingsScreen({
  navigation,
}: GameSettingsScreenProps) {
  const { currentRoom } = useColyseusStore();
  const [maxRounds, setMaxRounds] = useState<number>(
    currentRoom?.state.maxRounds
  );

  useEffect(() => {
    console.log("Current room in game settings", currentRoom?.state);
  }, []);

  const changeMaxRounds = (value: number) => {
    currentRoom?.send("changedMaxRounds", value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackgroundGradient style={styles.background} />
      <MotiView style={styles.innerContainer}>
        <PrimaryText>Game Settings</PrimaryText>
        <View style={{ padding: 20 }}>
          <PrimaryText style={styles.contentText}>Max Rounds</PrimaryText>
          <Picker
            style={{ width: 100, height: 20, alignSelf: "center" }}
            itemStyle={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 20,
              fontSize: 30,
            }}
            selectedValue={maxRounds}
            mode="dropdown"
            prompt="Max Rounds"
            onValueChange={(itemValue) => {
              changeMaxRounds(itemValue);
              setMaxRounds(itemValue);
            }}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="11" value={11} />
            <Picker.Item label="12" value={12} />
            <Picker.Item label="13" value={13} />
            <Picker.Item label="14" value={14} />
          </Picker>
        </View>

        <View>
          <PrimaryButton text="Save" handlePress={() => navigation.pop()} />
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingVertical: 60,
  },
  contentText: {
    fontSize: 24,
    textAlign: "center",
  },
});
