import { Pressable, Text, StyleSheet } from "react-native";

type ErrorButtonProps = {
  text: string;
  handlePress?: () => void;
};

export default function ErrorButton({ text, handlePress }: ErrorButtonProps) {
  return (
    <Pressable
      className="flex justify-center items-center bg-error w-full h-14 rounded-full"
      style={styles.buttonStyle}
      onPress={handlePress}
    >
      <Text
        className="text-white text-2xl"
        style={{ fontFamily: "Rubik-BoldItalic" }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.84,
  },
});
