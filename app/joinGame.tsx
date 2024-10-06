import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useCamera from "@/hooks/useCamera";
import QRCodeScanner from "@/components/qrCodeScanner";
import PrimaryText from "@/components/primaryText";
import ErrorButton from "@/components/errorButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import { useSignalR } from "@/hooks/useSignalR";
import { useGameContext } from "@/context/GameContext";
import { useSignalRContext } from "@/context/SignalRContext";

type JoinGameScreenProps = StackScreenProps<RootStackParamList, "joinGame">;

export default function JoinGameScreen({
  route,
  navigation,
}: JoinGameScreenProps) {
  const { name } = route.params;
  const { permission, requestPermission } = useCamera();
  const [disabled, setDisabled] = useState(false);
  const [scanData, setScanData] = useState<string | null>(null);
  const { joinGame, connected, connection } = useSignalRContext();
  const { gameId } = useGameContext();

  const handleScan = (data: BarcodeScanningResult) => {
    if (disabled) return;
    if (connected && connection) {
      setDisabled(true);
      setScanData(data.data);
      joinGame(data.data, name).then(() => {
        navigation.navigate("lobby");
      });
    }
  };

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
