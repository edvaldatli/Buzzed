// TODO: Remove Tailwind and implement stylesheet

import { View } from "react-native";
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
    <View className="flex justify-start items-center absolute top-20 w-full">
      <PrimaryText tlw="text-8xl text-center text-white absolute ">
        {Math.floor(timer / 1000).toString()}{" "}
      </PrimaryText>
      <View className="w-full flex flex-row justify-between absolute top-8">
        <View
          className="h-1 bg-white"
          style={{ width: `${timerWidthPercentage}%` }}
        />
        <View
          className="h-1 bg-white"
          style={{ width: `${timerWidthPercentage}%` }}
        />
      </View>
    </View>
  );
}
