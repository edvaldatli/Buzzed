import { MotiView } from "moti";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type ErrorButtonProps = {
  text: string;
  handlePress?: () => void;
};

export default function ErrorButton({ text, handlePress }: ErrorButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
      style={{ width: "100%" }}
    >
      <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
        <Text style={styles.mainText}>{text}</Text>
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
    width: "100%",
    height: 55,
    flexDirection: "row",
    shadowOpacity: 0.3,
    shadowRadius: 5.84,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 50,
  },
  mainText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    width: "100%",
    fontFamily: "Rubik-BoldItalic",
  },
});
