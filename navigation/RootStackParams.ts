export type RootStackParamList = {
    index: undefined;
    joinGame: { name: string };
    createGame: { name: string};
    enterName: { type: "createGame" | "joinGame" };
    lobby: undefined;
};