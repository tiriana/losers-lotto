/// <reference path="../../../references"/>

import dustEvent = DUST.event;

import {Events} from './Events';
import {Player} from './Player';


class Match {
    players: Array<Player> = [];

    constructor() {
    }

    start() {
        dustEvent.broadcast(Events[Events.matchStared], null);
    }

    stop() {
        dustEvent.broadcast(Events[Events.matchEnded], null);
    }

    addPlayer(player: Player): Player {
        this.players.push(player);

        return player;
    }

    removePlayer(player: Player): Player {
        var index = this.players.indexOf(player);

        if (index !== -1) {
            return this.players.splice(index, 1)[0];
        }

        return null;
    }
}

export {Match}
