/// <reference path="../../../references" />

import Scene = DUST.Scene;

import {List} from './List';

class Standings extends Scene {
    constructor(options) {
        super(options);
    }
}

var standingsInstance,
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
options.name = List[List.standings];

var standings = function() {
    if (!standingsInstance) {
        standingsInstance = new Standings(options);
    }

    return standingsInstance;
};

export {standings};