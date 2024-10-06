import React, { createContext, useState, useContext, ReactNode } from "react";

type Player = {
  id: string;
  name: string;
  status: string;
};

type GameContextType = {
  gameId: string | null;
  players: Array<Player>;
  gameStatus: string;
  setGameId: (id: string) => void;
  setPlayers: (
    players: Array<{ id: string; name: string; status: string }>
  ) => void;
  setGameStatus: (status: string) => void;
  addPlayer: (player: Player) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [players, setPlayers] = useState<
    Array<{ id: string; name: string; status: string }>
  >([]);
  const [gameStatus, setGameStatus] = useState<string>("");

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]); // Add new player to the list
  };

  return (
    <GameContext.Provider
      value={{
        gameId,
        players,
        gameStatus,
        setGameId,
        setPlayers,
        setGameStatus,
        addPlayer,
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
