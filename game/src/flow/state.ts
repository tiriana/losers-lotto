import {GameTypes} from './GameTypes';
import {Match} from './Match';

class State {
    gameType: GameTypes;
    _match: Match;

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

    get match(): Match {
        if (this._match) {
            return this._match;
        } else {
            throw (new Error('No match created'));
        }
    }
}

var state: State = new State();

export {state};