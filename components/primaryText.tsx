import { Text, StyleSheet } from "react-native";

type PositiveTextProps = {
  children: string | string[];
  tlw?: string;
};

export default function PositiveText({ children, tlw }: PositiveTextProps) {
  return (
    <Text
      className={`text-7xl font-extrabold text-primaryPink shadow-lg ${
        tlw || ""
      }`}
      style={{ ...styles.textStyle, fontFamily: "Rubik-BoldItalic" }}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.84,
  },
});
