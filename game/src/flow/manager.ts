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

dustEvent.on(Events[Events.gameSetupSingle], () => {
    state.gameType = GameTypes.single;
});

dustEvent.on(Events[Events.gameRequestedStart], function() {
    //TODO: handle session user
    gameApi
        .sessionGuest()
        .then(() => {
            return gameApi.config();
        })
        .then(() => {
            dustEvent.broadcast(Events[Events.gameStarted], null);
        })
        .catch((error) => {
            //TODO: handle session error
        });

});

dustEvent.on(Events[Events.gameStarted], function() {
    dustEvent.broadcast(Events[Events.matchRequestedStart], null);
});

dustEvent.on(Events[Events.matchRequestedStart], function() {
    //TODO: handle ongoing
    gameApi
        .start()
        .then((gameState) => {
            //TODO: handle state
            state.match = new Match();

            state.match.addPlayer(new PlayerLocal({ id: 'me', name: 'Me' }));
            scenes.switch(List[List.match]);
        })
        .catch((error) => {
            //TODO: handle start error
        });
});

dustEvent.on(Events[Events.matchRequestedEnd], function() {
    gameApi
        .forfeit()
        .then(() => {
            state.match.stop();
        })
        .catch((error) => {
            //TODO: handle forfeit error
        });
});

dustEvent.on(Events[Events.matchEnded], function() {
    state.match = null;
    dustEvent.broadcast(Events[Events.gameRequestedEnd], null);
});

dustEvent.on(Events[Events.gameRequestedEnd], function() {
    dustEvent.broadcast(Events[Events.gameEnded], null);
});

dustEvent.on(Events[Events.gameEnded], function() {
    scenes.switch(List[List.standings]);
});
