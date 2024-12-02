import { Text, StyleSheet } from "react-native";

type AccentTextProps = {
  children: string | string[];
  tlw?: string;
};

export default function AccentText({ children, tlw }: AccentTextProps) {
  return (
    <Text style={{ ...styles.textStyle, fontFamily: "Rubik-BoldItalic" }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    shadowColor: "#4E02FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7.6,
  },
});
