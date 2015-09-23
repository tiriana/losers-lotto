import Entity = DUST.GRAPHIC.Entity;

import {
    LottoBallInterface,
    LottoBallStates
} from './LottoBallInterfaces';

import {LottoBallInactiveOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';

class LottoBallInactive<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallInactive<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallInactiveOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;
    }

    inputHandler() {
        return Promise
            .resolve({
                stateItem: this,
                result: null
            })
            .then(() => {
                return this.ball.setState(LottoBallStates.activating);
            })
            .then(() => {
                return {
                    stateItem: this,
                    result: null
                }
            });
    }
}

export {LottoBallInactive}