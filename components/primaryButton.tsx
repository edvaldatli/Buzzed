import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

type PositiveButtonProps = {
  text?: string;
  materialIcon?: keyof typeof MaterialIcons.glyphMap;
  handlePress?: () => void;
  style?: any;
  disabled?: boolean;
  iconSize?: number;
  iconColor?: string;
  iconSide?: "left" | "right";
  children?: React.ReactNode;
};

export default function PrimaryButton({
  text,
  materialIcon,
  handlePress,
  style,
  disabled,
  iconSize = 24,
  iconColor = "#fff",
  iconSide = "left",
  children,
}: PositiveButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={
        disabled ? { type: "timing", duration: 2000, loop: true } : {}
      }
      style={{ width: "100%" }}
    >
      <TouchableOpacity
        style={[
          disabled ? styles.disabledButtonStyle : styles.buttonStyle,
          style,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <View
          style={[
            styles.content,
            iconSide === "right" && styles.reverseContent,
          ]}
        >
          {/* Render the icon based on the iconSide prop */}
          {materialIcon && (
            <MaterialIcons
              name={materialIcon}
              size={iconSize}
              color={disabled ? "#C6C6C6" : iconColor}
              style={iconSide === "left" ? styles.iconLeft : styles.iconRight}
            />
          )}
          {text && (
            <Text style={disabled ? styles.disabledMainText : styles.mainText}>
              {text}
            </Text>
          )}
          {children}
        </View>
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
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  reverseContent: {
    flexDirection: "row-reverse",
  },
  mainText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Rubik-MediumItalic",
    marginHorizontal: 10, // Spacing between text and icon
  },
  disabledMainText: {
    color: "#C6C6C6",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Rubik-MediumItalic",
    marginHorizontal: 10,
  },
  iconLeft: {
    marginRight: 8, // Spacing between icon and text when icon is on the left
  },
  iconRight: {
    marginLeft: 8, // Spacing between icon and text when icon is on the right
  },
});
