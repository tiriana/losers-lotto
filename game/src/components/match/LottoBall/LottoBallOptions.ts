/// <reference path="../../../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;

import {middle} from '../../../layers/middle';
import {viewPort} from '../../../viewPort';

import {
    LottoBallStates
} from './LottoBallInterfaces';

class LottoBallOptions extends EntityOptions {
    constructor(id: string) {
        super();

        this.container = middle;
        this.name = 'lottoBall/' + id;
        this.type = 'container';
    }
}

class LottoBallInactiveOptions<T> extends EntityOptions {
    constructor(container: T, prefix: string) {
        super();

        this.container = container;
        this.name = prefix + '/' + LottoBallStates[LottoBallStates.inactive];
        this.type = 'spriteFromFrame';
        this.asset = 'lottoBall/' + LottoBallStates[LottoBallStates.inactive] + '.png';
    }
}

class LottoBallActivatingOptions<T> extends EntityOptions {
    constructor(container: T, prefix: string) {
        super();

        this.container = container;
        this.name = prefix + '/' + LottoBallStates[LottoBallStates.activating];
        this.type = 'spriteFromFrame';
        this.asset = 'lottoBall/' + LottoBallStates[LottoBallStates.activating] + '.png';
    }
}

class LottoBallActiveLuckyOptions<T> extends EntityOptions {
    constructor(container: T, prefix: string) {
        super();

        this.container = container;
        this.name = prefix + '/' + LottoBallStates[LottoBallStates.activeLucky];
        this.type = 'spriteFromFrame';
        this.asset = 'lottoBall/' + LottoBallStates[LottoBallStates.activeLucky] + '.png';
    }
}


class LottoBallActiveUnluckyOptions<T> extends EntityOptions {
    constructor(container: T, prefix: string) {
        super();

        this.container = container;
        this.name = prefix + '/' + LottoBallStates[LottoBallStates.activeUnlucky];
        this.type = 'spriteFromFrame';
        this.asset = 'lottoBall/' + LottoBallStates[LottoBallStates.activeUnlucky] + '.png';
    }
}

export {
    LottoBallOptions,
    LottoBallInactiveOptions,
    LottoBallActivatingOptions,
    LottoBallActiveLuckyOptions,
    LottoBallActiveUnluckyOptions
}