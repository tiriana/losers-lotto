/// <reference path="../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;
import Button = DUST.COMPONENT.Button;
import EntityButtonOptions = DUST.COMPONENT.EntityButtonOptions;
import Text = DUST.COMPONENT.Text;
import FontSettings = DUST.COMPONENT.FontSettings;
import EntityTextOptions = DUST.COMPONENT.EntityTextOptions;
import EntityTextAlign = DUST.COMPONENT.EntityTextAlign;
import SoundScreen = DUST.PLUGINS.SoundScreen;

import {top} from '../layers/top';
import {overlay} from '../layers/overlay';
import {FadeInOut} from '../animations/FadeInOut';
import {ZoomInOut} from '../animations/ZoomInOut';
import {Fonts} from '../Fonts';

class SoundScreenButtonOnOptions extends EntityButtonOptions {
    constructor() {
        super();

        this.name = 'dust.plugins.soundScreen/buttonOn';
        this.container = overlay;
        this.buttonAssets = {
            normal: 'buttons/button_music.png',
            press: 'buttons/button_music_pressed.png',
            hover: 'buttons/button_music_hover.png'
        };

        this.x = 70;
        this.y = 300;
    }
}

class SoundScreenButtonOffOptions extends EntityButtonOptions {
    constructor() {
        super();

        this.name = 'dust.plugins.soundScreen/buttonOff';
        this.container = overlay;
        this.buttonAssets = {
            normal: 'buttons/button_musicOff.png',
            press: 'buttons/button_musicOff_pressed.png',
            hover: 'buttons/button_musicOff_hover.png'
        };

        this.x = -70;
        this.y = 300;
    }
}

class SoundScreenLabelOptions extends EntityTextOptions {
    constructor() {
        var text = String('Sound?'),
            font = new FontSettings(56, Fonts[Fonts.cantarell_white]);

        super(text, font);

        this.name = 'dust.plugins.soundScreen/text';
        this.container = overlay;
        this.y = 100;
    }
}

@FadeInOut()
export class SoundScreenLabel extends Text {
    constructor() {
        super(new SoundScreenLabelOptions());
    }
}

@ZoomInOut()
export class SoundScreenButtonOn extends Button {
    constructor() {
        super(new SoundScreenButtonOnOptions());

        this.makeInteractive(true);
    }
}

@ZoomInOut()
export class SoundScreenButtonOff extends Button {
    constructor() {
        super(new SoundScreenButtonOffOptions());

        this.makeInteractive(true);
    }
}

var instance;

function soundScreen() {
    if (!instance) {
        instance = new SoundScreen(
            new SoundScreenButtonOn(),
            new SoundScreenButtonOff(),
            'welcome',
            [
                new SoundScreenLabel()
            ]
            );
    }

    return instance;
}

export {soundScreen}