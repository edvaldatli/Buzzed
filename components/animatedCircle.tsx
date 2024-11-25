import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Svg, Defs, RadialGradient, Circle, Stop } from "react-native-svg";
import { MotiView } from "moti";

const { width, height } = Dimensions.get("window");

// Define colors for the gradient effect
const colors = [
  "#FF20BC",
  "#9A3C3C",
  "#DA00CB",
  "#F79EFF",
  "#FF3636",
  "#FF6B01",
  "#FF80C6",
  "#FF82C2",
  "#FF8F2D",
  "#FFB52B",
];

// Helper function to get a random value within a range
const getRandomValue = (min, max) => Math.random() * (max - min) + min;

const AnimatedRadialGradientSVG = () => {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const translateX = getRandomValue(-width * 0.5, width * 0.5);
        const translateY = getRandomValue(-height * 0.5, height * 0.5);
        const duration = getRandomValue(15000, 20000);
        const circleRadius = getRandomValue(600, 1000); // Large radius for more smudging

        return (
          <MotiView
            key={index}
            from={{ translateX: -translateX, translateY: -translateY }}
            animate={{ translateX, translateY }}
            transition={{
              type: "timing",
              duration,
              repeat: Infinity,
              repeatReverse: true,
            }}
            style={StyleSheet.absoluteFill}
          >
            <Svg height="100%" width="100%">
              <Defs>
                <RadialGradient
                  id={`grad_${index}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <Stop offset="100%" stopColor={color} stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Circle
                cx="50%"
                cy="50%"
                r={circleRadius}
                fill={`url(#grad_${index})`}
              />
            </Svg>
          </MotiView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FD841F",
    overflow: "hidden",
  },
});

export default AnimatedRadialGradientSVG;
