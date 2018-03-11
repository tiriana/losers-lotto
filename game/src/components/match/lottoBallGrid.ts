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
    qtyPerRow: number [] = [8, 8, 9, 9, 8, 7];
    offsets: number [] = [-4.5, -4, -4.5, -4, -3.5, -3];
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
        var w: number = 100, colNum: number;
        var offset: number;
        var num: number = 1;

        var thisShouldBeLootoBallsContainerPosition = {
            x: 50,
            y: viewPort.height / 7
        };

        var lottoBallNumbers = state.cardNumbers;

        this.qtyPerRow.forEach((cellsQty: number, rowNum: number) => {
                offset = this.offsets[rowNum];
                for (colNum = 0; colNum < cellsQty; colNum++) {

                    let lottoBalInstance = new LottoBall(lottoBallNumbers[num++]);

                    lottoBalInstance.x = thisShouldBeLootoBallsContainerPosition.x + w * (offset + colNum);
                    lottoBalInstance.y = thisShouldBeLootoBallsContainerPosition.y + rowNum * w;

                    this.lottoBalls.push(lottoBalInstance);
                }

            }
        );
    }

    getLottoBalls() {
        return this.lottoBalls;
    }
}

var lottoBallGrid = new LottoBallGrid();

export {lottoBallGrid};