import { useCameraPermissions } from "expo-camera";

export default function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    permission,
    requestPermission,
  };
}
