/// <reference path="../../../../references" />

import Graphics = PIXI.Graphics;
import isMobileDevice = DUST.isMobileDevice;
import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;
import mainScene = DUST.GRAPHIC.mainScene;

import {bottom} from '../../layers/bottom';
import {viewPort} from '../../viewPort';

class BackgroundOptions extends EntityOptions {
    constructor() {
        super();
        this.container = bottom;
        this.name = 'background-image';
        this.type = 'spriteFromFrame';
        this.asset = 'bg.jpg';
        this.anchor = { x: 0.5, y: 0 }
    }
}

class Background extends Entity {
    desktopMask: Graphics;

    constructor() {
        super(new BackgroundOptions());

        this.selfAttach();

        if (!isMobileDevice()) {
            this.desktopMask = new Graphics();
            this.desktopMask.beginFill(0x000000, 1);
            this.desktopMask.drawRect(-this.sprite.width / 2, 0, this.sprite.width, viewPort.height);
            this.desktopMask.endFill();

            mainScene.addChild(this.desktopMask)
            mainScene.mask = this.desktopMask;
        }
    }
}

var instance;

function background() {
    if (!instance) {
        instance = new Background();
    }

    return instance;
}

export {background}