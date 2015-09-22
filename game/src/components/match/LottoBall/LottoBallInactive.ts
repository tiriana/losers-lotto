import Entity = DUST.GRAPHIC.Entity;

import {LottoBallInterface} from './LottoBallInterfaces';
import {LottoBallInactiveOptions} from './LottoBallOptions';
import {LottoBallStateEntity} from './LottoBallStateEntity';
import {gameApi} from '../../../gameApi';

class LottoBallInactive<T extends LottoBallInterface<Entity>> extends LottoBallStateEntity<LottoBallInactive<T>>{
    ball: LottoBallInterface<T>;

    constructor(ball: LottoBallInterface<T>, prefix: string) {
        super(new LottoBallInactiveOptions<LottoBallInterface<T>>(ball, prefix));

        this.ball = ball;

        this.onInteractionFull(() => {
            gameApi
                .pick([this.ball.ballNumber])
                .then((result) => {
                    console.log(result);
                });
        });
    }

    enableHandler() {
        this.makeInteractive(true);
        
        return this;
    }

    disableHandler() {
        this.makeStatic();
        
        return this;
    }
}

export {LottoBallInactive}