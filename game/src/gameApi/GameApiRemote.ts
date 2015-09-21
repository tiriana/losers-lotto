/// <reference path="../../../references" />

import {RemoteResource} from './RemoteResource';

import {
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
} from './GameApiInterfaces';

class GameApiRemote extends RemoteResource implements GameApiInterface {
    gameCode: string;
    gameClientToken: string;
    gameInstanceId: string;
    gameVersion: string;
    gameBet: { CASH: number } = { CASH: 0 };
    gamePayTable: GameApiPayTableItemInterface[];
    urls = {
        config: '/losers-lotto/config',
        start: '/losers-lotto/start',
        ongoing: '/losers-lotto/ongoing',
        pick: '/losers-lotto/pick',
        forfeit: '/losers-lotto/forfeit',

        sessionGuest: '/losers-lotto-session/guest',
        sessionUser: '/losers-lotto-session/create'
    }

    constructor(gameBet: number, gameCode: string, requestUrl: string, sessionHeaderName: string, gameClientToken?: string, sessionId?: string) {
        super(requestUrl, sessionHeaderName, sessionId);

        this.gameCode = gameCode;
        this.gameClientToken = gameClientToken;
        this.gameBet.CASH = gameBet;
    }

    config(): Promise<GameApiGameConfigInterface> {
        return this
            .get<GameApiGameConfigInterface>(this.urls.config)
            .then((configResponse) => {
                this.gameVersion = configResponse.version;
                this.gamePayTable = configResponse.payTable;

                return configResponse;
            });
    }

    start(): Promise<GameApiNewGameResponseInterface> {
        var data: GameApiNewGameRequestInterface = {
            version: this.gameVersion,
            bet: this.gameBet
        };

        return this
            .post<GameApiNewGameResponseInterface>(this.urls.start, data)
            .then((startResponse) => {
                this.gameInstanceId = startResponse.gameInstanceId;

                return startResponse;
            })
    }

    ongoing(): Promise<GameApiGameModelInterface> {
        return this
            .get<GameApiGameModelInterface>(this.urls.ongoing);
    }

    pick(value: number[]): Promise<GameApiGameModelInterface> {
        var data: GameApiPickRequestInterface = {
            gameInstanceId: this.gameInstanceId,
            scratchedNumbers: value
        };

        return this
            .post<GameApiGameModelInterface>(this.urls.pick, data);
    }

    forfeit(): Promise<any> {
        return this
            .post<any>(this.urls.forfeit);
    }

    sessionGuest(): Promise<GameApiSessionResponseInterface> {
        return this
            .post<GameApiSessionResponseInterface>(this.urls.sessionGuest)
            .then((session) => {
                this.sessionId = session.sessionToken;

                return session;
            });
    }

    sessionUser(): Promise<GameApiSessionResponseInterface> {
        var data: GameApiSessionRequestInterface = {
            clientToken: this.gameClientToken,
            gameCode: this.gameCode
        };

        return this
            .post<GameApiSessionResponseInterface>(this.urls.sessionGuest)
            .then((session) => {
                this.sessionId = session.sessionToken;

                return session;
            });
    }
}

export {GameApiRemote};