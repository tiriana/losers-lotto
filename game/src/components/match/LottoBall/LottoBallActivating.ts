import Entity = DUST.GRAPHIC.Entity;

import {LottoBallInterface} from './LottoBallInterfaces';
import {LottoBallActivatingOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';

class LottoBallActivating<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallActivating<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallActivatingOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;
    }
}

export {LottoBallActivating}