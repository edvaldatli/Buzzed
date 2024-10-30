import { MotiView } from "moti";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type PositiveButtonProps = {
  text: string;
  handlePress?: () => void;
  tlw?: string;
  disabled?: boolean;
};

export default function PositiveButton({
  text,
  handlePress,
  tlw,
  disabled,
}: PositiveButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
      className="w-full"
    >
      <TouchableOpacity
        style={[styles.buttonStyle]}
        className={`flex justify-center items-center bg-primaryPink w-full h-14 rounded-full shadow-md ${tlw}`}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          className="text-white text-2xl text-center w-full"
          style={{ fontFamily: "Rubik-BoldItalic" }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.84,
  },
});
