import { CameraCapturedPicture } from "expo-camera";

export type RootStackParamList = {
    index: undefined;
    joinGame: { name: string, image: string };
    createGame: { name: string, image: string };
    enterName: { type: "createGame" | "joinGame" };
    lobby: undefined;
    playerImage: { type: "createGame" | "joinGame"; name: string };
};