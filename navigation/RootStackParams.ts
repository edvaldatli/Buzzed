export type RootStackParamList = {
  // Main navigation stack
  index: undefined;
  joinGame: { name: string; image: string };
  createGame: { name: string; image: string };
  enterName: { type: "createGame" | "joinGame" };
  lobby: undefined;
  playerImage: { type: "createGame" | "joinGame"; name: string };
  error: { message: string };

  // Who is more likely navigation stack
  WhoIsMoreLikelyStack: undefined;
  intro: undefined;
  votingResult: undefined;
  voting: undefined;
  question: undefined;
  result: undefined;
};
