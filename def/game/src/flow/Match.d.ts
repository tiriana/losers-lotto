declare module GAME.FLOW {
    class Match {
        players: Array<Player>;
        constructor();
        start(): void;
        stop(): void;
        addPlayer(player: Player): Player;
        removePlayer(player: Player): Player;
    }
}
