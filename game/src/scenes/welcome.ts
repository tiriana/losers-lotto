/// <reference path="../../../references" />

import Scene = DUST.Scene;

import {versionText} from '../components/common/versionText';
import {fullScreen} from '../plugins/fullScreen';
import {debugTrigger} from '../plugins/debugTrigger';
import {List} from './List';

import {startGameButton} from '../components/welcome/buttons/startGameButton';

class Welcome extends Scene {
    constructor(options) {
        super(options);
    }
}

var welcomeInstance,
    options: any = {};

function onShow() {
}

function onHide(clean) {
    clean();
}

options.objects = [
    debugTrigger,
    fullScreen,
    versionText,

    startGameButton
];

options.onShow = onShow;
options.onHide = onHide;
options.name = List[List.welcome];

var welcome = function() {
    if (!welcomeInstance) {
        welcomeInstance = new Welcome(options);
    }

    return welcomeInstance;
};

export {welcome}