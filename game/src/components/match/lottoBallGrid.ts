/// <reference path="../../../../references"/>

import dustEvent = DUST.event;

import {GameApiGameModelInterface} from '../../gameApi/GameApiInterfaces';
import {Events} from '../../flow/Events';
import {gameApi} from '../../gameApi';
import {viewPort} from '../../viewPort';
import {InteractionManager} from '../InteractionManager';
import {LottoBall} from './LottoBall/LottoBall';
import {match} from '../../scenes/match';
import {SimpleLineDrawer} from '../SimpleLineDrawer';

class LottoBallGrid {
    lottoBalls: LottoBall[] = [];
    interactionManager: InteractionManager;
    once: boolean;
    ballNumberCache: {} = {};

    constructor() {
        dustEvent.on(Events[Events.gameSetupState], (state: GameApiGameModelInterface) => {
            var lottoBallsToUpdate = [],
                resultMap = {};

            if (state && state.scratchedNumbers) {
                state.scratchedNumbers.forEach((scratchedNumber) => {
                    resultMap[scratchedNumber] = true;
                });
            }

            this.createLottoBalls(state);

            this.lottoBalls.forEach((lottoBall) => {
                match().children.push(lottoBall);

                if (resultMap[lottoBall.ballNumber]) {
                    lottoBallsToUpdate.push(lottoBall);
                }
            });

            this.interactionManager = new InteractionManager(this.lottoBalls, null, SimpleLineDrawer.getLineDrawer(this.lottoBalls[0].sprite.container.sprite));
            this.interactionManager.onCollision = (lottoBallsToUpdate: LottoBall[]) => {
                this.handleLottoBallsState(lottoBallsToUpdate);
            };

            this.handleLottoBallsState(lottoBallsToUpdate);
        });
    }

    handleLottoBallsState(lottoBallsToUpdate: LottoBall[]) {
        var ballNumbers = [],
            activating = [],
            resultMap = {};

        lottoBallsToUpdate.forEach((lottoBallToUpdate) => {
            if (!this.ballNumberCache[lottoBallToUpdate.ballNumber]) {
                this.ballNumberCache[lottoBallToUpdate.ballNumber] = lottoBallToUpdate.ballNumber;
                ballNumbers.push(lottoBallToUpdate.ballNumber);
                activating.push(lottoBallToUpdate.handleInput());
            }
        });

        ballNumbers.length && Promise
            .all(activating)
            .then(() => {
                return gameApi.pick(ballNumbers);
            })
            .then((result) => {
                result.results.forEach((resultItem) => {
                    resultMap[resultItem.number] = resultItem.lucky;
                });

                lottoBallsToUpdate.forEach((lottoBallToUpdate) => {
                    lottoBallToUpdate.handleInput({ lucky: resultMap[lottoBallToUpdate.ballNumber] });
                });
            });
    }

    createLottoBalls(state: GameApiGameModelInterface) {
        var lottoBallNumbers = state.cardNumbers;

        lottoBallNumbers.forEach((lottoBallNumber, i) => {
            let lottoBalInstance = new LottoBall(lottoBallNumber),
                distanceX = viewPort.width / 7,
                distanceY = viewPort.height / 7,
                x = -viewPort.width / 2 + distanceX * ((i) % 7) + distanceX / 2,
                y = distanceY * Math.floor((i) / 7) + distanceY / 2;

            lottoBalInstance.x = x;
            lottoBalInstance.y = y;

            this.lottoBalls.push(lottoBalInstance);
        });
    }

    getLottoBalls() {
        return this.lottoBalls;
    }
}

var lottoBallGrid = new LottoBallGrid();

export {lottoBallGrid};