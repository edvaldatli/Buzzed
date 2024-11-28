import { Text, StyleSheet, TextStyle } from "react-native";

type PrimaryTextProps = {
  children: string | string[];
  style?: TextStyle | TextStyle[]; // Accept external styles
};

export default function PrimaryText({ children, style }: PrimaryTextProps) {
  return <Text style={[styles.textStyle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  textStyle: {
    flexDirection: "row",
    fontSize: 52,
    color: "#FF80C6",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 0.2,
    width: "100%",
    textAlign: "center",
    fontFamily: "Rubik-BoldItalic",
  },
});
