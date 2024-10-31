import { create } from "zustand";
import * as Colyseus from "colyseus.js";
import { Player } from "@/types/GameTypes";
import { NavigationProp } from "@react-navigation/native";

interface ColyseusState {
  client: Colyseus.Client | null;
  currentRoom: Colyseus.Room | null;
  gameState: any;
  currentRoundIndex: number;
  rounds: any[];
  players: any[];
  connected: boolean;
  navigation: NavigationProp<any> | null; // Update the type to handle the navigation object
  setClient: (client: Colyseus.Client) => void;
  setCurrentRoom: (room: Colyseus.Room | null) => void;
  setPlayers: (players: Player[]) => void;
  setConnected: (connected: boolean) => void;
  createRoom: (playerName: string, avatarBase64: string) => Promise<void>;
  setNavigation: (navigation: NavigationProp<any>) => void; // Update the type here too
  joinRoom: (
    roomId: string,
    playerName: string,
    avatarBase64: string
  ) => Promise<void>;
  disconnect: () => void;
  handleNavigation: (gameState: string) => void; // Typing gameState as a string
}

export const useColyseusStore = create<ColyseusState>((set, get) => ({
  client: null,
  currentRoom: null,
  players: [],
  connected: false,
  gameState: null,
  currentRoundIndex: 0,
  rounds: [],
  navigation: null, // Initialize navigation as null
  setNavigation: (navigation) => set({ navigation }), // This will store the navigation object

  setClient: (client: Colyseus.Client) => set(() => ({ client })),
  setCurrentRoom: (room: Colyseus.Room | null) =>
    set(() => ({ currentRoom: room })),
  setPlayers: (players: Player[]) => set(() => ({ players })),
  setConnected: (connected: boolean) => set(() => ({ connected })),

  createRoom: async (playerName: string, avatarBase64: string) => {
    const client = new Colyseus.Client(
      "https://nl-ams-6cae0481.colyseus.cloud"
    );
    set({ client });

    try {
      const room = await client.create("GenericRoom", {
        name: playerName,
        avatarFile: avatarBase64,
      });
      set({ currentRoom: room, connected: true });

      room.onStateChange((state: any) => {
        console.log(state.currentRoundIndex);
        set({ currentRoundIndex: state.currentRoundIndex });
        set({ players: [...state.players] }); // Ensure React updates the players list
        set({ gameState: state });
        set({ rounds: [...state.rounds] });
        get().handleNavigation(state.gameState); // Trigger handleNavigation based on gameState
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
      "https://nl-ams-6cae0481.colyseus.cloud"
    );
    set({ client });

    try {
      const room = await client.joinById(roomId, {
        name: playerName,
        avatarFile: avatarBase64,
      });
      set({ currentRoom: room, connected: true });

      room.onStateChange((state: any) => {
        set({ currentRoundIndex: state.currentRoundIndex });
        set({ players: [...state.players] }); // Ensure React updates the players list
        set({ gameState: state });
        set({ rounds: [...state.rounds] });
        get().handleNavigation(state.gameState); // Trigger handleNavigation based on gameState
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

    if (gameState === "lobby") {
      navigation.navigate("lobby");
    } else if (gameState === "intro") {
      navigation.navigate("WhoIsMoreLikelyStack", { screen: "intro" });
    } else if (gameState === "round_in_progress") {
      navigation.navigate("WhoIsMoreLikelyStack", { screen: "voting" });
    } else if (gameState === "displaying_results") {
      navigation.navigate("WhoIsMoreLikelyStack", { screen: "votingResult" });
    } else if (gameState === "displaying_question") {
      navigation.navigate("WhoIsMoreLikelyStack", { screen: "question" });
    } else if (gameState === "end_game_screen") {
      navigation.navigate("WhoIsMoreLikelyStack", { screen: "result" });
    }
  },
}));
