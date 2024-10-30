import { Text, StyleSheet, TouchableOpacity } from "react-native";

type PositiveButtonProps = {
  text: string;
  handlePress?: () => void;
};

export default function PositiveButton({
  text,
  handlePress,
}: PositiveButtonProps) {
  return (
    <TouchableOpacity
      className="flex justify-center items-center bg-primaryPink w-full h-14 rounded-full shadow-md"
      style={styles.buttonStyle}
      onPress={handlePress}
    >
      <Text
        className="text-white text-2xl text-center w-full"
        style={{ fontFamily: "Rubik-BoldItalic" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
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
