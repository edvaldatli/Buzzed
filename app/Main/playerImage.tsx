import PositiveButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import useCamera from "@/hooks/useCamera";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import ErrorButton from "@/components/errorButton";
import BackgroundGradient from "@/components/backgroundGradient";

type PlayerImageScreenProps = StackScreenProps<
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

  useEffect(() => {
    // Request permission only if not granted
    if (!permission) {
      requestPermission();
    } else {
      setCameraActive(true); // Activate the camera when permission is granted
    }
  }, [permission]);

  const handleNext = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.1,
      });

      if (photo?.base64) {
        const imageBase64 = photo.base64;
        console.log("Image captured");

        navigation.navigate(type === "createGame" ? "createGame" : "joinGame", {
          name,
          image: imageBase64,
        });
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    } finally {
      // If photo capture fails, navigate with `null` image
      navigation.navigate(type === "createGame" ? "createGame" : "joinGame", {
        name,
        image: null,
      });
    }
  };

  if (!permission) {
    // Show permission request message if permission is not granted
    return (
      <>
        <BackgroundGradient style={styles.background} />
        <View className="flex h-full w-full justify-center items-center p-12">
          <PrimaryText tlw="text-center text-5xl">
            Please allow camera access
          </PrimaryText>
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
      <View className="flex justify-around items-center w-full h-full p-12">
        <PrimaryText tlw="text-center text-5xl">Snap that selfie</PrimaryText>
        {cameraActive && (
          <CameraView
            style={styles.camera}
            facing="front"
            ref={cameraRef}
            onCameraReady={() => console.log("Camera ready")}
          />
        )}
        <View className="flex flex-col justify-end w-full h-20">
          <PositiveButton text="Cheese!" handlePress={handleNext} />
          <View className="h-4" />
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </View>
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
});
