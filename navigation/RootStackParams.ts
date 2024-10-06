export type RootStackParamList = {
    index: undefined;
    joinGame: undefined;
    createGame: { name: string};
    enterName: { type: "createGame" | "joinGame" };
    lobby: undefined;
};