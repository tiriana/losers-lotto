import Entity = DUST.GRAPHIC.Entity;

import {LottoBallInterface} from './LottoBallInterfaces';
import {LottoBallActiveLuckyOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';

class LottoBallActiveLucky<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallActiveLucky<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallActiveLuckyOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;
    }
}

export {LottoBallActiveLucky}