export type RootStackParamList = {
  // Main navigation stack
  app: undefined;
  home: undefined;
  joinGame: { name: string; image: string | null };
  createGame: { name: string; image: string | null };
  enterName: { type: "createGame" | "joinGame" };
  lobby: undefined;
  playerImage: { type: "createGame" | "joinGame"; name: string };
  error: { message: string };
  qrCodeModal: { value: string };

  // Who is more likely navigation stack
  WhoIsMoreLikelyStack: undefined;
  intro: undefined;
  votingResult: undefined;
  voting: undefined;
  question: undefined;
  result: undefined;
};
