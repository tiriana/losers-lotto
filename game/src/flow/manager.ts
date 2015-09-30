/// <reference path="../../../references"/>

import dustEvent = DUST.event;
import scenes = DUST.scenes;

import {i18n} from '../i18n';
import {List} from '../scenes/List';
import {Match} from './Match';
import {Events} from './Events';
import {state} from './state';
import {GameTypes} from './GameTypes';
import {PlayerLocal} from './PlayerLocal';
import {gameApi} from '../gameApi';
import {GameApiValidationErrorInterface} from '../gameApi/GameApiInterfaces';

class Manager {
    constructor() {
        dustEvent.on(Events[Events.gameGotState], (gameState) => {
            state.gameState = gameState;
        });

        dustEvent.on(Events[Events.gameSetupState], () => {
            dustEvent.broadcast(Events[Events.gameRequestedStart], null);
        });

        dustEvent.on(Events[Events.gameSetupSingle], () => {
            state.gameType = GameTypes.single;
        });

        dustEvent.on(Events[Events.gameRequestedStart], () => {
            dustEvent.broadcast(Events[Events.gameStarted], null);
        });

        dustEvent.on(Events[Events.gameStarted], () => {
            dustEvent.broadcast(Events[Events.matchRequestedStart], null);
        });

        dustEvent.on(Events[Events.matchRequestedStart], () => {
            if (state.hasGameState) {
                this.runMatch();
            } else {
                gameApi
                    .start()
                    .then((gameState) => {
                        state.gameState = gameState;

                        this.runMatch();
                    })
                    .catch((error: GameApiValidationErrorInterface) => {
                        //TODO: handle start error
                    });
            }
        });

        dustEvent.on(Events[Events.matchRequestedEnd], () => {
            gameApi
                .forfeit()
                .then(() => {
                    state.match.stop();
                })
                .catch((error: GameApiValidationErrorInterface) => {
                    //TODO: handle forfeit error
                });
        });

        dustEvent.on(Events[Events.matchEnded], () => {
            state.match = null;
            dustEvent.broadcast(Events[Events.gameRequestedEnd], null);
        });

        dustEvent.on(Events[Events.gameRequestedEnd], () => {
            dustEvent.broadcast(Events[Events.gameEnded], null);
        });

        dustEvent.on(Events[Events.gameEnded], () => {
            scenes.switch(List[List.standings]);
        });
    }

    runMatch() {
        state.match = new Match();
        state.match.addPlayer(new PlayerLocal({ id: 'me', name: 'Me' }));

        scenes.switch(List[List.match]);
    }
}

var instance;

function manager() {
    if (!instance) {
        instance = new Manager();
    }

    return instance;
}

export {manager}