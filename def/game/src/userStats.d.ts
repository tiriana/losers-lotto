declare module GAME {
    class UserStats {
        private _prefix;
        gamesWonStatName: string;
        gamesLostStatName: string;
        wasTutorialStartedStat: string;
        setStat(key: string, value: any): Promise<any>;
        getStat(key?: string): Promise<any>;
        getGamesWon(): Promise<number>;
        setGamesWon(gamesPlayed: any): Promise<any>;
        getGamesLost(): Promise<any>;
        setGamesLost(gamesPlayed: any): Promise<any>;
        getGamesPlayed(): Promise<number>;
        getWasTutorialStarted(): Promise<boolean>;
        setWasTutorialStarted(val?: boolean): Promise<boolean>;
    }
    var userStats: UserStats;
}
