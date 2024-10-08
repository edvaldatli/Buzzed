import PositiveButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import useCamera from "@/hooks/useCamera";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import ErrorButton from "@/components/errorButton";
import { useIsFocused } from "@react-navigation/native";

type PlayerImageScreenProps = StackScreenProps<
  RootStackParamList,
  "playerImage"
>;

export default function PlayerImage({
  route,
  navigation,
}: PlayerImageScreenProps) {
  const { permission, requestPermission } = useCamera();
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const { name, type } = route.params;
  const cameraRef = useRef<CameraView>(null);
  const [pictureSizes, setPictureSizes] = useState<string[] | undefined>(
    undefined
  );

  const handleNext = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      base64: true,
      quality: 0.1,
    });
    if (photo?.base64) {
      const imageBase64 = photo.base64;

      if (type === "createGame") {
        navigation.navigate("createGame", { name, image: imageBase64 });
      } else {
        navigation.navigate("joinGame", { name, image: imageBase64 });
      }
    } else {
      console.error("Error uploading image");
    }
  };

  const getPictureSizes = async () => {
    setPictureSizes(await cameraRef.current?.getAvailablePictureSizesAsync());
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const cameraCleanup = async () => {
    if (isFocused) {
      cameraRef.current?.componentDidMount;
    } else if (cameraRef.current && !isFocused) {
      setCameraActive(false);
      cameraRef.current.stopRecording();
      cameraRef.current.componentWillUnmount;
    }
  };

  if (!permission) {
    return (
      <>
        <LinearGradient
          colors={["#E33EB0", "#FD841F"]}
          locations={[0.1, 0.5]}
          style={styles.background}
        />
        <View className="flex h-full w-full">
          <PrimaryText tlw="text-center text-7xl">
            Please allow camera access
          </PrimaryText>
        </View>
      </>
    );
  }

  return (
    <>
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <View className="flex justify-around items-center w-full h-full p-12">
        <PrimaryText tlw="text-center text-7xl">Snap that selfie</PrimaryText>
        {cameraActive && (
          <CameraView
            style={styles.camera}
            facing="front"
            ref={cameraRef}
            videoQuality="480p"
            pictureSize="Low"
            active={cameraActive}
            animateShutter={true}
            mode="picture"
          />
        )}
        <View className="flex flex-col justify-end w-full h-20">
          <PositiveButton text="Cheese!" handlePress={() => handleNext()} />
          <View className="h-4"></View>
          <ErrorButton
            text="Cancel"
            handlePress={async () => {
              await cameraCleanup();
              navigation.goBack();
            }}
          ></ErrorButton>
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
