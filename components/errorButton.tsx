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
    width: "100%",
    height: 55,
    flexDirection: "row",
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FE3639",
    borderRadius: 50,
  },
  mainText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    width: "100%",
    fontFamily: "Rubik-MediumItalic",
  },
});
