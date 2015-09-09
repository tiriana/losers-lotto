/// <reference path="../../../references" />

import DebugTrigger = DUST.PLUGINS.DebugTrigger;

import {overlay} from '../layers/overlay';
import {version} from '../version';

var instance;

function debugTrigger() {
    if (!instance) {
        instance = new DebugTrigger(overlay, version);
        instance.x = 0;
        instance.y = 0;
        instance.setArea(100, 100);
    }

    return instance;
}

export {debugTrigger};