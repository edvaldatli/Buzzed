import { StyleSheet, View } from "react-native";
import PrimaryText from "./primaryText";
import { useState, useRef, useEffect } from "react";

export default function Timer() {
  const duration = 10000;
  const [timer, setTimer] = useState(duration);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(duration - elapsed, 0);
      setTimer(remainingTime);

      if (remainingTime > 0) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(requestRef.current as number);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current as number);
  }, [duration]);

  const timerWidthPercentage = (timer / duration) * 33;

  return (
    <View style={styles.timer}>
      <PrimaryText style={styles.timerText}>
        {Math.floor(timer / 1000).toString()}{" "}
      </PrimaryText>
      <View style={styles.timerBarContainer}>
        <View
          style={[{ width: `${timerWidthPercentage}%` }, styles.timerBar]}
        />
        <View
          style={[{ width: `${timerWidthPercentage}%` }, styles.timerBar]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    position: "absolute",
    top: 90,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    position: "absolute",
    fontSize: 96,
    color: "#fff",
    textAlign: "center",
  },
  timerBarContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  timerBar: {
    height: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
