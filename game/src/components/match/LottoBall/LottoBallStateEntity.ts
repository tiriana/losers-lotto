/// <reference path="../../../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;

import {LottoBallSateItemInterface} from './LottoBallInterfaces';

class LottoBallStateEntity<T extends Entity> extends Entity implements LottoBallSateItemInterface<T> {
    constructor(options: EntityOptions) {
        super(options);
    }

    selfRemove(remove?: () => void) {
        return super
            .selfRemove(remove)
            .then(() => {
                return this;
            });
    }

    selfAttach(notify?: () => void) {
        return super
            .selfAttach(notify)
            .then(() => {
                return this;
            })
    }

    inputHandler() {
        return Promise
            .resolve({
                stateItem: this,
                result: null
            });
    }

    enableHandler() {
        return Promise
            .resolve({
                stateItem: this,
                result: null
            });
    }

    disableHandler() {
        return Promise
            .resolve({
                stateItem: this,
                result: null
            });
    }

    enable() {
        return this
            .selfAttach()
            .then(() => {
                return this.enableHandler();
            })
            .then(() => {
                return this;
            });
    }

    disable() {
        return Promise
            .resolve()
            .then(() => {
                return this.disableHandler();
            })
            .then(() => {
                return this.selfRemove();
            });
    }
}

export {LottoBallStateEntity}