import { CameraCapturedPicture } from "expo-camera";

export default function useBlobStorage() {
  const uploadImage = async (
    image: CameraCapturedPicture,
    blobName: String
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        name: blobName,
        type: "image/jpeg", // Set the appropriate MIME type
      });
      formData.append("blobName", blobName);

      fetch(
        "https://buzzedwebservice-f6afe5epbnfrescz.northeurope-01.azurewebsites.net/api/blob/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      return true;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
      return false;
    }
  };

  return {
    uploadImage,
  };
}
