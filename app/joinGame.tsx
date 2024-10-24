import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
import { MotiView } from "moti";

type JoinGameScreenProps = StackScreenProps<RootStackParamList, "joinGame">;

export default function JoinGameScreen({
  route,
  navigation,
}: JoinGameScreenProps) {
  const { name, image } = route.params;
  const { permission, requestPermission } = useCamera();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { joinRoom, currentRoom, setNavigation } = useColyseusStore();

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  const handleScan = async (data: BarcodeScanningResult) => {
    if (disabled) return;
    setDisabled(true);
    setLoading(true);
    try {
      joinRoom(data.data, name, image);
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
      <View className="flex h-full justify-center items-center p-12">
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
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
    >
      <View className="flex h-full justify-around items-center p-12">
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
        <PrimaryText tlw="text-3xl text-center">
          Scan your friend's QR code
        </PrimaryText>
        <QRCodeScanner
          onScan={(data) => handleScan(data)}
          disabled={disabled}
        />
        <ErrorButton
          text="Cancel"
          handlePress={() => navigation.navigate("index")}
        />
      </View>
    </MotiView>
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
