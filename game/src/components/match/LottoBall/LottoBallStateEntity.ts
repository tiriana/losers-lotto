/// <reference path="../../../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;

import {LottoBallStateItemInterface} from './LottoBallInterfaces';

class LottoBallStateEntity<T extends Entity> extends Entity implements LottoBallStateItemInterface<T> {
    constructor(options: EntityOptions) {
        super(options);
    }

    private mockupHandler() {
        return Promise.resolve(this);
    }

    inputHandler() {
        return this.mockupHandler();
    }

    enableHandler() {
        return this.mockupHandler();
    }

    disableHandler() {
        return this.mockupHandler();
    }

    enable() {
        return this
            .selfAttach()
            .then(() => {
                return this.enableHandler();
            });
    }

    disable() {
        return this
            .disableHandler()
            .then(() => {
                return <Promise<LottoBallStateEntity<T>>>this.selfRemove();
            });
    }
}

export {LottoBallStateEntity}