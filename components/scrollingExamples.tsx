import { MotiView, useAnimationState } from "moti";
import { Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PrimaryText from "./primaryText";

const questions = [
  "to become famous?",
  "to forget their keys?",
  "to adopt a stray animal?",
  "to laugh at a bad joke?",
  "to spend all their money on shopping?",
  "to go skydiving?",
  "to win a game show?",
  "to get lost in their own neighborhood?",
  "to start a new hobby?",
  "to stay up all night binge-watching TV?",
];

export default function ScrollingExamples() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  // Define animation states
  const animationState = useAnimationState({
    enter: { translateX: -400, opacity: 0 },
    visible: { translateX: 0, opacity: 1 },
    exit: { translateX: 400, opacity: 0 },
  });

  useEffect(() => {
    slideQuestion();

    const intervalId = setInterval(() => {
      slideQuestion();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const slideQuestion = () => {
    animationState.transitionTo("exit");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);

      animationState.transitionTo("enter");

      setTimeout(() => {
        animationState.transitionTo("visible");
      }, 1000);
    }, 1000);
  };

  return (
    <MotiView
      state={animationState}
      transition={{ type: "timing", duration: 800 }}
      style={styles.container}
    >
      <PrimaryText
        style={{
          fontSize: 30,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 0,
          color: "white",
        }}
      >
        Who is more likely
      </PrimaryText>
      <Text style={styles.text}>{currentQuestion}</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 5,
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
