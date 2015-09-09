import {PlayerMeta} from './PlayerMeta';
import {Player} from './Player';

class PlayerRemote extends Player {
    constructor(meta: PlayerMeta) {
        super(meta);
    }
}

export {PlayerRemote};
