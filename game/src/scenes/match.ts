/// <reference path="../../../references" />

import Scene = DUST.Scene;
import dustEvent = DUST.event;

import {Events} from '../flow/Events';
import {List} from './List';

class Match extends Scene {
    constructor(options) {
        super(options);
    } 
}

var matchInstance,
    options: any = {};

function onShow() {
    dustEvent.broadcast(Events[Events.matchSceneStarted], null);
}

function onHide(clean) {
    clean();
}

options.objects = [];
options.onShow = onShow;
options.onHide = onHide;
options.name = List[List.match];

var match = function() {
    if (!matchInstance) {
        matchInstance = new Match(options);
    }

    return matchInstance;
};

export {match}
