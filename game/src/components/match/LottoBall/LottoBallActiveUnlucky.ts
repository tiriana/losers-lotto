import Entity = DUST.GRAPHIC.Entity;

import {LottoBallInterface} from './LottoBallInterfaces';
import {LottoBallActiveUnluckyOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';

class LottoBallActiveUnlucky<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallActiveUnlucky<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallActiveUnluckyOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;
    }
}

export {LottoBallActiveUnlucky}