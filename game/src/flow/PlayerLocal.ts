import {PlayerMeta} from './PlayerMeta';
import {Player} from './Player';

class PlayerLocal extends Player {

    constructor(meta: PlayerMeta) {
        super(meta);
    }
}

export {PlayerLocal};
