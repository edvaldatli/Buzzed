import { View, StyleSheet, Text } from "react-native";

type DividerProps = {
  text: string;
};

export default function Divider({ text }: DividerProps) {
  return (
    <View className="flex flex-row justify-center items-center">
      <View
        className="border-t-4 border-primaryPink w-2/5 shadow-lg "
        style={styles.buttonStyle}
      />
      <Text
        className="w-1/5 text-center self-center text-white"
        style={{ fontFamily: "Rubik-BoldItalic" }}
      >
        {text}
      </Text>
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
});
