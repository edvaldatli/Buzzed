import useCamera from "@/hooks/useCamera";
import { View, Button, Text, StyleSheet } from "react-native";
import { BarcodeScanningResult, CameraView } from "expo-camera";

type QRCodeScannerProps = {
  onScan: (data: BarcodeScanningResult) => void;
};

export default function QRCodeScanner({ onScan }: QRCodeScannerProps) {
  const { permission, requestPermission } = useCamera();

  if (permission?.status !== "granted") {
    return (
      <View>
        <Text>No access to camera</Text>
        <Button title="Request Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View className="shadow-lg">
      <CameraView
        style={styles.camera}
        className="rounded-xl border-white border-2"
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(data) => onScan(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    overflow: "hidden",
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
});
