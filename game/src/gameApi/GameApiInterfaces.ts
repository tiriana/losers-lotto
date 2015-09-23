/// <reference path="../../../references" />

interface GameApiPayTableItemInterface {
    scratchesNeeded: number;
    win: number;
}

interface GameApiPickResultInterface {
    number: number,
    lucky: boolean
}

interface GameApiSessionRequestInterface {
    clientToken: string;
    gameCode: string;
}

interface GameApiSessionResponseInterface {
    sessionToken: string;
}

interface GameApiNewGameRequestInterface {
    version: string;
    bet: {
        CASH: number
    }
}

interface GameApiNewGameResponseInterface {
    gameInstanceId: string;
    balance: {
        CASH: number;
    };
    bet: {
        CASH: number;
    },
    cardNumbers: number[];
    scratchedNumbers: number[];
}

interface GameApiGameModelInterface {
    bet: {
        CASH: number
    };
    cardNumbers: number[];
    scratchedNumbers: number[];
    state:any;
    // state?: GameApiPickResultInterface[];
}

interface GameApiGameConfigInterface {
    payTable: GameApiPayTableItemInterface[],
    version: string;
}

interface GameApiPickRequestInterface {
    gameInstanceId: string;
    scratchedNumbers: number[];
}

interface GameApiInterface {
    sessionId: string;
    requestUrl: string;
    gameCode: string;
    gameClientToken: string;
    gameInstanceId: string;
    gameVersion: string;
    gameBet: { CASH: number };
    urls: {
        config: string,
        start: string,
        ongoing: string,
        pick: string,
        forfeit: string,
        sessionGuest: string,
        sessionUser: string
    }

    config(): Promise<GameApiGameConfigInterface>
    start(): Promise<GameApiNewGameResponseInterface>
    ongoing(): Promise<GameApiGameModelInterface>
    pick(value: number[]): Promise<GameApiGameModelInterface>;
    forfeit(): Promise<any>;
    sessionGuest(): Promise<GameApiSessionResponseInterface>;
    sessionUser(): Promise<GameApiSessionResponseInterface>;
}

export {
GameApiPayTableItemInterface,
GameApiPickResultInterface,
GameApiSessionRequestInterface,
GameApiSessionResponseInterface,
GameApiNewGameRequestInterface,
GameApiNewGameResponseInterface,
GameApiGameModelInterface,
GameApiGameConfigInterface,
GameApiPickRequestInterface,
GameApiInterface
};