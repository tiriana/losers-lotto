/// <reference path="../../../references" />

import Scene = DUST.Scene;

import {List} from './List';

class Lobby extends Scene {
    constructor(options) {
        super(options);
    }
}

var lobbyInstance,
    options: any = {};

function onShow() {
}

function onHide(clean) {
    clean();
}

options.objects = [

];
options.onShow = onShow;
options.onHide = onHide;
options.name = List[List.lobby];

var lobby = function() {
    if (!lobbyInstance) {
        lobbyInstance = new Lobby(options);
    }

    return lobbyInstance;
};

export {lobby}