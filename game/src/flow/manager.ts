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
import {PlayerRemote} from './PlayerRemote';

dustEvent.on(Events[Events.gameSetupSingle], () => {
    state.gameType = GameTypes.single;
});

dustEvent.on(Events[Events.gameSetupDuel], () => {
    state.gameType = GameTypes.duel;
});

dustEvent.on(Events[Events.gameSetupMultiplayer], () => {
    state.gameType = GameTypes.multi;
});

dustEvent.on(Events[Events.gameRequestedStart], function() {
    dustEvent.broadcast(Events[Events.gameStarted], null);
});

dustEvent.on(Events[Events.gameStarted], function() {
    dustEvent.broadcast(Events[Events.matchRequestedStart], null);
});

dustEvent.on(Events[Events.matchRequestedStart], function() {
    state.match = new Match();

    state.match.addPlayer(new PlayerLocal({ id: 'me', name: 'Me' }));

    if (state.gameType === GameTypes.multi) {
        state.match.addPlayer(new PlayerRemote({ id: 'remote', name: 'Remote' }));
    } else if (state.gameType === GameTypes.duel) {
        state.match.addPlayer(new PlayerRemote({ id: 'local', name: 'Local' }));
    }

    if (state.gameType === GameTypes.single) {
        scenes.switch(List[List.match]);
    } else {
        scenes.switch(List[List.lobby]);
    }
});

dustEvent.on(Events[Events.matchSceneStarted], function() {
    state.match.start();
});

dustEvent.on(Events[Events.matchRequestedEnd], function() {
    state.match.stop();
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
