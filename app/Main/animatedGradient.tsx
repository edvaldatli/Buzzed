import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function AnimatedGradientWithReanimated() {
  const location1 = useSharedValue(0.1);
  const location2 = useSharedValue(0.5);

  // Triggering back-and-forth animation
  React.useEffect(() => {
    const animateLocations = () => {
      location1.value = withTiming(location1.value === 0.1 ? 0.4 : 0.1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
      location2.value = withTiming(location2.value === 0.5 ? 0.8 : 0.5, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      });
    };

    const interval = setInterval(animateLocations, 2000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    locations: [location1.value, location2.value],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, animatedStyle]}>
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[location1.value, location2.value]}
          style={styles.background}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  background: {
    flex: 1,
  },
});
