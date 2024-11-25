import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

type BackgroundGradientProps = {
  style: StyleProp<ViewStyle>;
};

export default function BackgroundGradient({ style }: BackgroundGradientProps) {
  return (
    <LinearGradient
      colors={["#E33EB0", "#FD841F"]}
      locations={[0, 1]}
      style={style}
    />
  );
}
