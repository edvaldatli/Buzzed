import { useCameraPermissions } from "expo-camera";
import { useState } from "react";

export default function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    permission,
    requestPermission,
  };
}
