import PositiveButton from "@/components/primaryButton";
import PrimaryText from "@/components/primaryText";
import useCamera from "@/hooks/useCamera";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { StackScreenProps } from "@react-navigation/stack";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import useBlobStorage from "@/hooks/useBlobStorage";

type PlayerImageScreenProps = StackScreenProps<
  RootStackParamList,
  "playerImage"
>;

export default function PlayerImage({
  route,
  navigation,
}: PlayerImageScreenProps) {
  const { uploadImage } = useBlobStorage();
  const { permission, requestPermission } = useCamera();
  const { name, type } = route.params;
  const cameraRef = useRef<CameraView>(null);

  const handleNext = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    const res = await uploadImage(photo!, name);
    if (res) {
      if (type === "createGame") {
        navigation.navigate("createGame", { name });
      } else {
        navigation.navigate("joinGame", { name });
      }
    } else {
      // Make client aware of the error
      console.error("Error uploading image");
    }
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

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
        <CameraView style={styles.camera} facing="front" ref={cameraRef} />
        <PositiveButton text="Cheese!" handlePress={() => handleNext()} />
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
