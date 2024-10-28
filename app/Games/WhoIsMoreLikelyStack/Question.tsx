import PrimaryText from "@/components/primaryText";
import { View } from "react-native";

export default function QuestionScreen() {
  return (
    <View className="h-full w-full justify-center items-center p-12">
      <PrimaryText tlw="text-4xl text-center">
        A question shown here
      </PrimaryText>
    </View>
  );
}
