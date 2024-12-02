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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: "100%",
    textAlign: "center",
    fontFamily: "Rubik-BoldItalic",
  },
});
