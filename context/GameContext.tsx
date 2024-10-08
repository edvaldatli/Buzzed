import React, { createContext, useState, useContext, ReactNode } from "react";
import { Player } from "@/types/GameTypes";

type GameContextType = {
  gameId: string | null;
  players: Array<Player>;
  gameStatus: string;
  host: Player | undefined;
  setGameId: (id: string) => void;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setGameStatus: (status: string) => void;
  setHost: (player: Player) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("");
  const [host, setHost] = useState<Player>();

  return (
    <GameContext.Provider
      value={{
        gameId,
        players,
        gameStatus,
        host,
        setGameId,
        setPlayers,
        setGameStatus,
        setHost,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
