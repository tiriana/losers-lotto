/// <reference path="../../references" />

import audio = DUST.ASSETS.AUDIO.init;

import {soundScreen} from './plugins/soundScreen';
import {layers} from './layers';
import {bottom} from './layers/bottom';
import {middle} from './layers/middle';
import {top} from './layers/top';
import {overlay} from './layers/overlay';
import {loop} from './loop';
import {match} from './scenes/match';
import {lobby} from './scenes/lobby';
import {standings} from './scenes/standings';
import {welcome} from './scenes/welcome';

import {background} from './components/common/background';

import * as manager from './flow/manager';

function game() {
    audio.play('silence', true);
    layers();
    loop();
    background();

    match();
    lobby();
    standings();
    welcome().show();
    //soundScreen().show();
}

export {game}