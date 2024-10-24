import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useCamera from "@/hooks/useCamera";
import QRCodeScanner from "@/components/qrCodeScanner";
import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { BarcodeScanningResult } from "expo-camera";
import { useEffect, useState } from "react";
import { useColyseusStore } from "@/context/ColyseusContext";

type JoinGameScreenProps = StackScreenProps<RootStackParamList, "joinGame">;

export default function JoinGameScreen({
  route,
  navigation,
}: JoinGameScreenProps) {
  const { name, image } = route.params;
  const { permission, requestPermission } = useCamera();
  const [disabled, setDisabled] = useState(false);
  const [scanData, setScanData] = useState<string | null>(null);
  const { joinRoom, currentRoom, setNavigation } = useColyseusStore();

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  const handleScan = async (data: BarcodeScanningResult) => {
    if (disabled) return;
    setDisabled(true);
    setScanData(data.data);
    try {
      joinRoom(data.data, name, image);
    } catch (e) {
      console.log(e);
      setDisabled(false);
    }

    console.log("Current room in joinGame", currentRoom);
  };

  useEffect(() => {
    if (currentRoom) {
      console.log("Navigating to the lobby...");
      navigation.navigate("lobby");
    }
  }, [currentRoom]); // Trigger navigation when currentRoom is updated

  if (!permission) {
    requestPermission();
  }

  return (
    <View className="flex h-full justify-around items-center p-12">
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <PrimaryText tlw="text-3xl text-center">
        Scan your friend's QR code
      </PrimaryText>
      <QRCodeScanner onScan={(data) => handleScan(data)} disabled={disabled} />
      <ErrorButton
        text="Cancel"
        handlePress={() => navigation.navigate("index")}
      />
    </View>
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
