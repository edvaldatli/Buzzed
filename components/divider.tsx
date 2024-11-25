import { View, StyleSheet, Text } from "react-native";

type DividerProps = {
  text: string;
};

export default function Divider({ text }: DividerProps) {
  return (
    <View style={styles.container}>
      <View
        className="border-t-4 border-primaryPink w-2/5 shadow-lg "
        style={styles.buttonStyle}
      />
      <Text style={styles.text}>{text}</Text>
      <View
        className="border-t-4 border-primaryPink w-2/5 shadow-lg "
        style={styles.buttonStyle}
      />
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
    width: "100%",
    fontFamily: "Rubik-BoldItalic",
  },
});
