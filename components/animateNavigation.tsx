import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { MotiView, useAnimationState } from "moti";
import { StyleSheet } from "react-native";

type AnimateNavigationProps = {
  navigateTo?: () => void;
  children?: React.ReactNode | React.ReactNode[];
  timeMs: number;
};

export interface AnimateNavigationHandle {
  triggerAnimation: () => void;
}

const AnimateNavigation = forwardRef<
  AnimateNavigationHandle,
  AnimateNavigationProps
>(({ navigateTo, children, timeMs }, ref) => {
  const exitAnimation = useAnimationState({
    start: { scale: 0 },
    then: { scale: 2000 },
  });

  const enterTextAnimation = useAnimationState({
    start: { opacity: 0, translateY: 100 },
    then: { opacity: 1, translateY: 0 },
  });

  const enterTextAnimation2 = useAnimationState({
    start: { opacity: 0, translateY: 200 },
    then: { opacity: 1, translateY: 100 },
  });

  const triggerAnimation = () => {
    console.log("Triggering animation");

    exitAnimation.transitionTo("then");

    setTimeout(() => {
      enterTextAnimation.transitionTo("then");
    }, 200);

    setTimeout(() => {
      enterTextAnimation2.transitionTo("then");
    }, 400);

    setTimeout(() => {
      if (typeof navigateTo === "function") {
        navigateTo();
      } else {
        console.warn("No navigateTo function provided");
      }
      resetAnimations();
    }, timeMs);
  };

  const resetAnimations = () => {
    exitAnimation.transitionTo("start");
    enterTextAnimation.transitionTo("start");
    enterTextAnimation2.transitionTo("start");
  };

  useImperativeHandle(ref, () => ({
    triggerAnimation,
  }));

  useEffect(() => {
    resetAnimations();
  }, []);

  return (
    <>
      <MotiView
        state={exitAnimation}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={styles.exitAnimationStyle}
      />
      <MotiView
        state={enterTextAnimation}
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </MotiView>
    </>
  );
});

export default AnimateNavigation;

const styles = StyleSheet.create({
  exitAnimationStyle: {
    position: "absolute",
    backgroundColor: "#FF69B4",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: -20,
    width: 2,
    height: 2,
  },
});
