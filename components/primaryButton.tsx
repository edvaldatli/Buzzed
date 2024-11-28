import { MotiView } from "moti";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type PositiveButtonProps = {
  text: string;
  handlePress?: () => void;
  style?: string;
  disabled?: boolean;
};

export default function PrimaryButton({
  text,
  handlePress,
  style,
  disabled,
}: PositiveButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
      style={{ width: "100%" }}
    >
      <TouchableOpacity
        style={disabled ? styles.disabledButtonStyle : styles.buttonStyle}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text style={disabled ? styles.disabledMainText : styles.mainText}>
          {text}
        </Text>
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
    backgroundColor: "#FF80C6",
    borderRadius: 50,
  },
  disabledButtonStyle: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7B7B7B",
    borderRadius: 50,
  },
  mainText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    width: "100%",
    fontFamily: "Rubik-MediumItalic",
  },
  disabledMainText: {
    color: "#C6C6C6",
    textAlign: "center",
    fontSize: 24,
    width: "100%",
    fontFamily: "Rubik-MediumItalic",
  },
});
