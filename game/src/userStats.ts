/// <reference path="../../references" />

import {publisher} from './publisherApi/publisher';

class UserStats {
    private _prefix: string = 'user_stats';

    gamesWonStatName = 'games_won';
    gamesLostStatName = 'games_lost';
    wasTutorialStartedStat = 'was_tutorial_started';

    setStat(key: string, value: any): Promise<any> {
        return publisher.userMetaDataStorage.set(this._prefix + '.' + key, value);
    }

    getStat(key?: string): Promise<any> {
        return publisher.userMetaDataStorage.get(this._prefix + '.' + key);
    }

    getGamesWon(): Promise<number> {
        return this
            .getStat(this.gamesWonStatName)
            .then((num: any) => {
                return +(~~num);
            });
    }

    setGamesWon(gamesPlayed): Promise<any> {
        return this.setStat(this.gamesWonStatName, gamesPlayed);
    }

    getGamesLost(): Promise<any> {
        return this
            .getStat(this.gamesLostStatName)
            .then((num: any) => {
                return +(~~num);
            });
    }

    setGamesLost(gamesPlayed): Promise<any> {
        return this.setStat(this.gamesLostStatName, gamesPlayed);
    }

    getGamesPlayed(): Promise<number> {
        return Promise
            .props({ won: this.getGamesWon(), lost: this.getGamesLost() })
            .then((result: { won: any; lost: any }) => {
                return +result.won + +result.lost;
            });
    }

    getWasTutorialStarted(): Promise<boolean> {
        return this.getStat(this.wasTutorialStartedStat);
    }

    setWasTutorialStarted(val: boolean = true): Promise<boolean> {
        return this.setStat(this.wasTutorialStartedStat, val);
    }
}

var userStats = new UserStats();

export {userStats};