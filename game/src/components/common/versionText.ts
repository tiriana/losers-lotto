/// <reference path="../../../../references" />

import EntityTextAlign = DUST.COMPONENT.EntityTextAlign;
import EntityTextOptions = DUST.COMPONENT.EntityTextOptions;
import FontSettings = DUST.COMPONENT.FontSettings;
import DustText = DUST.COMPONENT.Text;

import {Fonts} from '../../Fonts';
import {version} from '../../version';

class VersionTextOptions extends EntityTextOptions {
    constructor(text: string) {
        super(text); 
    }

    name = 'versionText';
    font = new FontSettings(16, Fonts[Fonts.cantarell_white]);
    align = EntityTextAlign.CENTER;
    x = 0;
    y = 40;
}

class VersionText extends DustText {
    constructor() {
        super(new VersionTextOptions(version));
    }
}

var instance;

function versionText() {
    if (!instance) {
        instance = new VersionText();
    }

    return instance;
}

export {versionText}