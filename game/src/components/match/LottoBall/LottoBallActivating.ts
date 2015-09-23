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

    enableHandler() {
        //TODO: move pick to common ball manager
        return gameApi
            .pick([this.ball.ballNumber])
            .then((result) => {
                if (result.results[0].lucky) {
                    return this.ball.setState(LottoBallStates.activeLucky);
                }

                return this.ball.setState(LottoBallStates.activeUnlucky);
            })
            .then(() => {
                return this;
            });
    }
}

export {LottoBallActivating}