/// <reference path="../../../references"/>

import dustEvent = DUST.event;

import {Events} from './Events';

class LottoBallManager {
    constructor() {
        dustEvent.on(Events[Events.gameSetupState], (state) => {
            //TODO: setup actuall state for the lottoBalls
        });
    }
}

var instance;

function lottoBallManager() {
    if (!instance) {
        instance = new LottoBallManager();
    }

    return instance;
}

export {lottoBallManager};