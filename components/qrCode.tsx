import { View } from "react-native";
import PrimaryText from "./primaryText";
import QRCode from "react-native-qrcode-svg";

type QrCodeProps = {
  data: string;
};

export default function QrCode({ data }: QrCodeProps) {
  return (
    <View className="flex flex-row items-center p-2 bg-white rounded-xl">
      <PrimaryText tlw="text-2xl mr-2">Join Code</PrimaryText>
      <QRCode value={data} size={50} />
    </View>
  );
}
