import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import { useGameContext } from "./GameContext"; // Use GameContext to update the state
import type { Player } from "@/types/GameTypes";

type SignalRContextType = {
  connection: HubConnection | null;
  connected: boolean;
  createGame: (playerName: string) => Promise<void>;
  joinGame: (gameId: string, playerName: string) => Promise<void>;
  leaveGame: () => Promise<void>;
};

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const SignalRProvider = ({ children }: { children: ReactNode }) => {
  const { gameId, players, setGameId, setPlayers, setGameStatus } =
    useGameContext();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connected, setConnected] = useState(false);

  // Start the connection
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        "https://buzzedwebservice-f6afe5epbnfrescz.northeurope-01.azurewebsites.net/gameHub"
      )
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnected(true);
        console.log("SignalR connected");

        // Listen for GameCreated event and update GameContext
        newConnection.on("GameCreated", (gameState) => {
          console.log("Game created: ", gameState);
          setGameId(gameState.id);
          setPlayers(gameState.players);
          setGameStatus(gameState.currentState);
        });

        // Listen for PlayerJoined event and update GameContext
        newConnection.on("PlayerJoined", (player) => {
          console.log("Player joined: ", player);
          setPlayers((prevPlayers) => [...prevPlayers, player]);
        });

        newConnection.on("JoinedGame", (gameState) => {
          console.log("Joined game: ", gameState);
          setGameId(gameState.id);
          setPlayers(gameState.players);
          setGameStatus(gameState.currentState);
        });

        newConnection.on("PlayerLeft", (leavingPlayer: Player) => {
          console.log("Player left: ", leavingPlayer);
          setPlayers((prevPlayers) =>
            prevPlayers.filter(
              (player: Player) => player.id !== leavingPlayer.id
            )
          );
        });
      } catch (err) {
        console.error("SignalR connection failed: ", err);
      }
    };

    startConnection();

    return () => {
      newConnection.stop();
    };
  }, []);

  // Create game function
  const createGame = async (playerName: string) => {
    if (connected && connection) {
      try {
        await connection.invoke("CreateGame", playerName);
      } catch (error) {
        console.error("Error creating game: ", error);
        throw error; // Re-throw the error so it can be handled in the component if needed
      }
    } else {
      console.warn(
        "Cannot create game, SignalR connection is not established."
      );
    }
  };

  // Join game function
  const joinGame = async (gameId: string, playerName: string) => {
    if (connected && connection) {
      try {
        await connection.invoke("JoinGame", gameId, playerName);
      } catch (error) {
        console.error("Error joining game: ", error);
        throw error; // Re-throw the error so it can be handled in the component if needed
      }
    } else {
      console.warn("Cannot join game, SignalR connection is not established.");
    }
  };

  const leaveGame = async () => {
    if (connected && connection) {
      try {
        await connection.invoke("LeaveGame", gameId, connection.connectionId);
      } catch (error) {
        console.error("Error leaving game: ", error);
        throw error; // Re-throw the error so it can be handled in the component if needed
      }
    } else {
      console.warn("Cannot leave game, SignalR connection is not established.");
    }
  };

  return (
    <SignalRContext.Provider
      value={{ connection, connected, createGame, joinGame, leaveGame }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

// Hook to use SignalRContext in components
export const useSignalRContext = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalRContext must be used within a SignalRProvider");
  }
  return context;
};
