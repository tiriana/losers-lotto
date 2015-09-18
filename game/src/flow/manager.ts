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

dustEvent.on(Events[Events.gameSetupSingle], () => {
    state.gameType = GameTypes.single;
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
    scenes.switch(List[List.match]);
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
