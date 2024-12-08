import QrCode from "@/components/qrCode";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import BackgroundGradient from "@/components/backgroundGradient";
import PrimaryText from "@/components/primaryText";

type QRCodeModalProps = NativeStackScreenProps<
  RootStackParamList,
  "qrCodeModal"
>;

export default function QRCodeModalScreen({
  route,
  navigation,
}: QRCodeModalProps) {
  const { value } = route.params;
  return (
    <View style={styles.container}>
      <BackgroundGradient style={styles.background} />
      <PrimaryText>Scan me</PrimaryText>
      <QrCode data={value} />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 40,
  },
});
