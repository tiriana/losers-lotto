/// <reference path="../../../references" />

import FullScreenButtonPlugin = DUST.PLUGINS.FullScreenButton;
import FullScreenButtonOptions = DUST.PLUGINS.FullScreenButtonOptions;

import Button = DUST.COMPONENT.Button;
import ButtonOptions = DUST.COMPONENT.EntityButtonOptions;

import {top} from '../layers/top';
import {FadeInOut} from '../animations/FadeInOut';

class FullScreenButtonOnOptions extends ButtonOptions {
    constructor() {
        super();

        this.name = 'dust.plugins.fullScreenButton/buttonOn';
        this.container = top;
        this.buttonAssets = {
            normal: 'buttons/button_fullscreen.png',
            press: 'buttons/button_fullscreen_pressed.png',
            hover: 'buttons/button_fullscreen_hover.png'
        };
    }
}

class FullScreenButtonOffOptions extends ButtonOptions {
    constructor() {
        super();

        this.name = 'dust.plugins.fullScreenButton/buttonOff';
        this.container = top;
        this.buttonAssets = {
            normal: 'buttons/button_fullscreenOff.png',
            press: 'buttons/button_fullscreenOff_pressed.png',
            hover: 'buttons/button_fullscreenOff_hover.png'
        };
    }
}

class FullScreenButtonOn extends Button {
    constructor() {
        super(new FullScreenButtonOnOptions());
    }
}

class FullScreenButtonOff extends Button {
    constructor() {
        super(new FullScreenButtonOffOptions());
    }
}

@FadeInOut()
class FullScreenButton extends FullScreenButtonPlugin {
    constructor() {
        super(new FullScreenButtonOptions({
            container: top,
            fullScreenButtonOn: new FullScreenButtonOn(),
            fullScreenButtonOff: new FullScreenButtonOff()
        }));

        this.x = 450;
        this.y = 55 * 0.7;
        this.sprite.scale.x = this.sprite.scale.y = 0.7;
    }
}

var instance;

function fullScreen() {
    if (!instance) {
        instance = new FullScreenButton();
    }

    return instance;
}

export {fullScreen};