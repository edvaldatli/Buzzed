import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useCamera from "@/hooks/useCamera";
import QRCodeScanner from "@/components/qrCodeScanner";
import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import { useColyseusStore } from "@/context/ColyseusContext";
import { MotiView } from "moti";
import BackgroundGradient from "@/components/backgroundGradient";
import Toast from "react-native-toast-message";

type JoinGameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "joinGame"
>;

export default function JoinGameScreen({
  route,
  navigation,
}: JoinGameScreenProps) {
  const { name, image } = route.params;
  const { permission, requestPermission } = useCamera();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayCancelButton, setDisplayCancelButton] =
    useState<boolean>(false);
  const { joinRoom, currentRoom } = useColyseusStore();

  const handleScan = async (data: BarcodeScanningResult) => {
    if (disabled) return;
    setDisabled(true);
    try {
      await joinRoom(data.data, name, image!);
      if (currentRoom) {
        navigation.navigate("lobby");
      } else {
        Toast.show({
          type: "error",
          text1: "Error joining game",
          text2: "Room not found",
          text1Style: { fontSize: 20 },
          text2Style: { fontSize: 16 },
        });
        setLoading(false);
        setDisabled(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      setDisabled(false);
    }

    console.log("Current room in joinGame", currentRoom);
  };

  if (!permission) {
    requestPermission();
  }

  if (loading) {
    return (
      <View
        className="flex h-full justify-center items-center p-12"
        style={styles.container}
      >
        <BackgroundGradient style={styles.background} />
        <View />
        <View>
          <ActivityIndicator
            size={"large"}
            color={"white"}
            style={{ alignSelf: "center" }}
          />
        </View>
        {displayCancelButton && (
          <View style={{ gap: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              This is taking longer than usual
            </Text>
            <ErrorButton
              text="Cancel"
              handlePress={() => navigation.navigate("home")}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 400 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <BackgroundGradient style={styles.background} />
      <PrimaryText style={styles.headerText}>
        Scan your friend's QR code
      </PrimaryText>
      <QRCodeScanner onScan={(data) => handleScan(data)} />
      <ErrorButton
        text="Cancel"
        handlePress={() => navigation.navigate("home")}
      />
    </MotiView>
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
  headerText: {
    fontSize: 44,
  },
});
