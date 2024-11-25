import PositiveButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import useCamera from "@/hooks/useCamera";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import ErrorButton from "@/components/errorButton";
import BackgroundGradient from "@/components/backgroundGradient";
import { MotiView, useAnimationState } from "moti";

type PlayerImageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "playerImage"
>;

export default function PlayerImage({
  route,
  navigation,
}: PlayerImageScreenProps) {
  const { permission, requestPermission } = useCamera();
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const { name, type } = route.params;
  const cameraRef = useRef<CameraView>(null);

  const exitAnimation = useAnimationState({
    from: { scale: 2000 },
    to: { scale: 0 },
  });

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    } else {
      setCameraActive(true);
    }
  }, [permission]);

  const handleNext = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.05,
      });

      if (photo?.base64) {
        const imageBase64 = photo.base64;
        console.log("Image captured");
        console.log("Image base64", imageBase64);

        navigation.navigate(type === "createGame" ? "createGame" : "joinGame", {
          name: name,
          image: imageBase64,
        });
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  if (!permission || !permission.granted) {
    return (
      <>
        <BackgroundGradient style={styles.background} />
        <View style={styles.container}>
          <PrimaryText>Please allow camera access</PrimaryText>
          <PositiveButton
            text="Allow Camera Access"
            handlePress={requestPermission}
          />
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </>
    );
  }

  return (
    <>
      <BackgroundGradient style={styles.background} />
      <View style={styles.container}>
        <PrimaryText>Snap that selfie</PrimaryText>
        {cameraActive && (
          <CameraView
            style={styles.camera}
            facing="front"
            ref={cameraRef}
            onCameraReady={() => console.log("Camera ready")}
          />
        )}
        <View style={styles.buttonContainer}>
          <PositiveButton text="Cheese!" handlePress={handleNext} />
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </View>
      <MotiView
        state={exitAnimation}
        transition={{
          type: "timing",
          duration: 800,
        }}
        style={styles.exitAnimationStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  camera: {
    height: 300,
    width: 300,
    borderRadius: 400,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
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
