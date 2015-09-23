/// <reference path="../../../references" />

import Scene = DUST.Scene;
import dustEvent = DUST.event;

import {List} from './List';

import {exampleLottoBalls} from '../components/match/exampleLottoBalls';

class Match extends Scene {
    constructor(options) {
        super(options);
    }
}

var matchInstance,
    options: any = {};

function onShow() {
}

function onHide(clean) {
    clean();
}

options.objects = [
    exampleLottoBalls 
];

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
