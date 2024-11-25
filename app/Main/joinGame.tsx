import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useCamera from "@/hooks/useCamera";
import QRCodeScanner from "@/components/qrCodeScanner";
import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarcodeScanningResult } from "expo-camera";
import { useEffect, useState } from "react";
import { useColyseusStore } from "@/context/ColyseusContext";
import { MotiView } from "moti";
import BackgroundGradient from "@/components/backgroundGradient";

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
  const { joinRoom, currentRoom } = useColyseusStore();

  useEffect(() => {}, [currentRoom]);

  const handleScan = async (data: BarcodeScanningResult) => {
    if (disabled) return;
    setDisabled(true);
    setLoading(true);
    try {
      await joinRoom(data.data, name, image!);
      navigation.navigate("lobby");
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
        <PrimaryText tlw="text-3xl text-center">Loading...</PrimaryText>
        <ActivityIndicator />
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
      <PrimaryText tlw="text-3xl text-center">
        Scan your friend's QR code
      </PrimaryText>
      <QRCodeScanner onScan={(data) => handleScan(data)} />
      <ErrorButton
        text="Cancel"
        handlePress={() => navigation.navigate("index")}
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
});
