import {PlayerMeta} from './PlayerMeta';

class Player {
    meta: PlayerMeta;

    constructor(meta: PlayerMeta) {
        this.meta = {
            name: meta.name,
            id: meta.id
        };
    }
}

export {Player}
