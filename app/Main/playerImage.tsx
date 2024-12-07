import PositiveButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import useCamera from "@/hooks/useCamera";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
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
    if (!permission) {
      requestPermission();
    } else if (permission?.granted) {
      setCameraActive(true);
    }
  }, [permission]);

  const handleNext = async (skipPhoto = false) => {
    let imageBase64 = null;

    if (!skipPhoto && cameraActive && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.05,
        });
        if (photo?.base64) {
          imageBase64 = photo.base64;
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }

    navigation.navigate(type === "createGame" ? "createGame" : "joinGame", {
      name,
      image: imageBase64,
    });
  };

  if (!permission) {
    return (
      <>
        <BackgroundGradient style={styles.background} />
        <View style={styles.container}>
          <PrimaryText>Requesting camera access...</PrimaryText>
          <PositiveButton
            text="Continue without photo"
            handlePress={() => handleNext(true)}
          />
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </>
    );
  }

  if (permission.status === "denied") {
    return (
      <>
        <BackgroundGradient style={styles.background} />
        <View style={styles.container}>
          <PrimaryText>Camera access denied</PrimaryText>
          <View style={{ gap: 20 }}>
            <PositiveButton
              text="Continue without photo"
              handlePress={() => handleNext(true)}
            />
            <PositiveButton
              text="Go to permissions"
              handlePress={() => Linking.openSettings()}
            />
          </View>
          <ErrorButton text="Cancel" handlePress={() => navigation.goBack()} />
        </View>
      </>
    );
  }

  return (
    <>
      <BackgroundGradient style={styles.background} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleNext(true)}
          style={{ position: "absolute", right: 20, top: 50, padding: 5 }}
        >
          <Text
            style={{
              fontFamily: "Rubik-BoldItalic",
            }}
          >
            SKIP
          </Text>
        </TouchableOpacity>
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
          <PositiveButton text="Cheese!" handlePress={() => handleNext()} />
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
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 48,
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
