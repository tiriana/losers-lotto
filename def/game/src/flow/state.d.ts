declare module GAME.FLOW {
    class State {
        gameType: GameTypes;
        _match: Match;
        constructor();
        match: Match;
    }
    var state: State;
}
