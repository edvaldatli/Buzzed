import { create } from "zustand";
import * as Colyseus from "colyseus.js";
import { Player } from "@/types/GameTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ColyseusState {
  client: Colyseus.Client | null;
  currentRoom: Colyseus.Room | null;
  gameState: Object | null;
  currentState: string;
  currentRoundIndex: number;
  rounds: any[]; // Ensure rounds are always initialized
  players: any[];
  connected: boolean;
  navigation: NativeStackNavigationProp<any> | null;
  setClient: (client: Colyseus.Client) => void;
  setCurrentRoom: (room: Colyseus.Room | null) => void;
  setPlayers: (players: Player[]) => void;
  setConnected: (connected: boolean) => void;
  createRoom: (playerName: string, avatarBase64: string) => Promise<void>;
  setNavigation: (navigation: NativeStackNavigationProp<any>) => void;
  joinRoom: (
    roomId: string,
    playerName: string,
    avatarBase64: string
  ) => Promise<void>;
  disconnect: () => void;
  handleNavigation: (gameState: string) => void;
}

export const useColyseusStore = create<ColyseusState>((set, get) => ({
  client: null,
  currentRoom: null,
  players: [],
  connected: false,
  gameState: null,
  currentRoundIndex: 0,
  currentState: "",
  rounds: [], // Initialize as an empty array to avoid undefined errors
  navigation: null,
  setNavigation: (navigation) => set({ navigation }),

  setClient: (client: Colyseus.Client) => set(() => ({ client })),
  setCurrentRoom: (room: Colyseus.Room | null) =>
    set(() => ({ currentRoom: room })),
  setPlayers: (players: Player[]) => set(() => ({ players })),
  setConnected: (connected: boolean) => set(() => ({ connected })),

  createRoom: async (playerName: string, avatarBase64: string) => {
    const client = new Colyseus.Client(
      process.env.WEBSOCKET_URL || "ws://192.168.50.105:2567"
    );
    set({ client });

    try {
      const room = await client.create("GenericRoom", {
        name: playerName,
        avatarFile: avatarBase64,
      });
      set({ currentRoom: room, connected: true });

      room.onStateChange((state: any) => {
        set({
          currentRoundIndex: state.currentRoundIndex,
          players: [...state.players],
          gameState: state,
          rounds: [...(state.rounds || [])],
        });
      });

      room.onMessage("navigate", (message: any) => {
        get().handleNavigation(message);
      });

      room.onLeave(() => {
        set({ connected: false, currentRoom: null, players: [] });
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  },

  joinRoom: async (
    roomId: string,
    playerName: string,
    avatarBase64: string
  ) => {
    const client = new Colyseus.Client(
      process.env.WEBSOCKET_URL || "ws://192.168.50.105:2567"
    );
    set({ client });

    try {
      const room = await client.joinById(roomId, {
        name: playerName,
        avatarFile: avatarBase64,
      });
      set({ currentRoom: room, connected: true });

      room.onStateChange((state: any) => {
        set({
          currentRoundIndex: state.currentRoundIndex,
          players: [...state.players],
          gameState: state,
          rounds: [...(state.rounds || [])],
        });
      });

      room.onMessage("navigate", (message: any) => {
        get().handleNavigation(message);
      });

      room.onLeave(() => {
        set({ connected: false, currentRoom: null, players: [] });
      });
    } catch (error) {
      console.error("Error joining room:", error);
      const { navigation } = get();
      navigation?.navigate("error", { message: "Room could not be found" });
    }
  },

  disconnect: () => {
    const { currentRoom } = get();
    if (currentRoom) {
      currentRoom.leave();
      set({ connected: false, currentRoom: null, players: [] });
    }
  },

  handleNavigation: (gameState: string) => {
    const { navigation } = get();
    if (!navigation) return;

    console.log("Navigating to:", gameState);

    switch (gameState) {
      case "lobby":
        navigation.replace("lobby");
        break;
      case "intro":
        navigation.replace("WhoIsMoreLikelyStack", { screen: "intro" });
        break;
      case "displaying_question":
        navigation.replace("WhoIsMoreLikelyStack", { screen: "question" });
        break;
      case "round_in_progress":
        navigation.replace("WhoIsMoreLikelyStack", { screen: "voting" });
        break;
      case "displaying_results":
        navigation.replace("WhoIsMoreLikelyStack", { screen: "votingResult" });
        break;
      case "end_game_screen":
        navigation.replace("WhoIsMoreLikelyStack", { screen: "result" });
        break;
      default:
        console.error("Unexpected game state:", gameState);
        navigation.replace("error", {
          message: `Unexpected game state: ${gameState}`,
        });
    }
  },
}));
