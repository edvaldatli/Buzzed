import { View, StyleSheet, Text } from "react-native";

type DividerProps = {
  text: string;
};

export default function Divider({ text }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.lineDivider} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.lineDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 15,
    fontFamily: "Rubik-BoldItalic",
  },
  lineDivider: {
    position: "relative",
    height: 1,
    width: "40%",
    borderTopWidth: 1,
    borderColor: "#FF80C6",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.84,
  },
});
