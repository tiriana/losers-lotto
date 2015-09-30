import dustEvent = DUST.event;

import {GameApiGameModelInterface} from '../gameApi/GameApiInterfaces';
import {GameTypes} from './GameTypes';
import {Match} from './Match';
import {Events} from './Events';

class State {
    gameType: GameTypes;
    private _match: Match;
    private _gameState: GameApiGameModelInterface;

    constructor() {
    }

    set match(match: Match) {
        if (match) {
            if (!this._match) {
                this._match = match;
            } else {
                throw (new Error('Match already created'));
            }
        } else {
            if (this._match) {
                delete this._match;
            } else {
                throw (new Error('No match created'));
            }
        }
    }

    set gameState(state: GameApiGameModelInterface) {
        this._gameState = state;
        dustEvent.broadcast(Events[Events.gameSetupState], this._gameState);
    }

    get gameState() {
        if (!this._gameState) {
            throw (new Error('Game state not initialized'));
        }

        return this._gameState;
    }

    get match(): Match {
        if (this._match) {
            return this._match;
        } else {
            throw (new Error('No match created'));
        }
    }

    hasMatch() {
        if (this._match) {
            return true;
        }

        return false;
    }

    hasGameState() {
        if (this._gameState) {
            return true;
        }

        return false;
    }
}

var state: State = new State();

export {state};