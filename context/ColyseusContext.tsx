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
  rounds: any[];
  players: any[];
  connected: boolean;
  navigation: NativeStackNavigationProp<any> | null;
  sessionId: string | null;
  roomId: string | null;
  setSessionInfo: (sessionId: string, roomId: string) => void;
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
  reconnect: () => void;
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
  sessionId: null,
  roomId: null,
  setSessionInfo: (sessionId, roomId) => set({ sessionId, roomId }),
  setNavigation: (navigation) => set({ navigation }),
  setClient: (client: Colyseus.Client) => set(() => ({ client })),
  setCurrentRoom: (room: Colyseus.Room | null) =>
    set(() => ({ currentRoom: room })),
  setPlayers: (players: Player[]) => set(() => ({ players })),
  setConnected: (connected: boolean) => set(() => ({ connected })),

  createRoom: async (playerName: string, image: string) => {
    const client = new Colyseus.Client(
      process.env.WEBSOCKET_URL || "ws:192.168.50.230:2567"
    );
    set({ client });

    try {
      const room = await client.create("GenericRoom", {
        name: playerName,
        avatarFile: image,
      });
      set({
        currentRoom: room,
        connected: true,
        sessionId: room.sessionId,
        roomId: room.id,
      });

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
        get().reconnect();
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
      process.env.WEBSOCKET_URL || "ws:192.168.50.230:2567"
    );
    set({ client });

    try {
      const room = await client.joinById(roomId, {
        name: playerName,
        avatarFile: avatarBase64,
      });
      set({
        currentRoom: room,
        connected: true,
        sessionId: room.sessionId,
        roomId: room.id,
      });

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

  reconnect: async () => {
    const {
      client,
      roomId,
      sessionId,
      currentRoom,
      setCurrentRoom,
      setConnected,
    } = get();
    if (!client || !roomId || !sessionId) {
      console.error("Cannot reconnect: missing client, roomId, or sessionId.");
      return;
    }

    try {
      console.log("Attempting to reconnect...");
      console.log("Reconnection token:", currentRoom?.reconnectionToken);
      const room = await client.reconnect(currentRoom?.reconnectionToken || "");

      setCurrentRoom(room);
      setConnected(true);

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

      console.log("Reconnected successfully!");
    } catch (error) {
      console.error("Reconnection failed:", error);
    }
  },

  disconnect: () => {
    const { currentRoom } = get();
    if (currentRoom) {
      currentRoom.leave();
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
        navigation.popTo("WhoIsMoreLikelyStack", { screen: "intro" });
        break;
      case "displaying_question":
        navigation.popTo("WhoIsMoreLikelyStack", { screen: "question" });
        break;
      case "round_in_progress":
        navigation.popTo("WhoIsMoreLikelyStack", { screen: "voting" });
        break;
      case "displaying_results":
        navigation.popTo("WhoIsMoreLikelyStack", { screen: "votingResult" });
        break;
      case "end_game_screen":
        navigation.popTo("WhoIsMoreLikelyStack", { screen: "result" });
        break;
      default:
        console.error("Unexpected game state:", gameState);
        navigation.popTo("error", {
          message: `Unexpected game state: ${gameState}`,
        });
    }
  },
}));
