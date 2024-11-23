import { View } from "react-native";
import PrimaryText from "./primaryText";
import QRCode from "react-native-qrcode-svg";

type QrCodeProps = {
  data: string;
};

export default function QrCode({ data }: QrCodeProps) {
  return (
    <View className="flex flex-row justify-center items-center p-2 rounded-xl w-48">
      <QRCode
        value={data}
        size={200}
        backgroundColor="transparent"
        color="black"
      />
    </View>
  );
}
