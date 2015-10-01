import Entity = DUST.GRAPHIC.Entity;

import {gameApi} from '../../../gameApi';
import {GameApiGameModelInterface} from '../../../gameApi/GameApiInterfaces';

import {
    LottoBallInterface,
    LottoBallStates
} from './LottoBallInterfaces';

import {LottoBallActivatingOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';

class LottoBallActivating<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallActivating<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallActivatingOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;
    }

    inputHandler(data) {
        var stateTransition;

        if (data) {
            if (data.lucky) {
                stateTransition = this.ball.setState(LottoBallStates.activeLucky);
            } else {
                stateTransition = this.ball.setState(LottoBallStates.activeUnlucky);
            }

            return stateTransition
                .then(() => {
                    return this;
                });
        }

        return Promise.resolve(this);
    }
}

export {LottoBallActivating}