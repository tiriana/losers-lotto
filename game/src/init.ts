/// <reference path="../../references" />

import dustEvent = DUST.event;
import publisherEvents = DUST.PLUGINS.PUBLISHERAPI.events;
import Loader = DUST.PLUGINS.LOADERS.Hog;
import rotation = DUST.PLUGINS.ROTATION.classic;

import {Events} from './flow/Events';
import {game} from './game';
import {assetList} from './assetList';
import {viewPort} from './viewPort';
import {api} from './api';
import {gameApi} from './gameApi';
import {manager} from './flow/manager';
import {lottoBallGrid} from './components/match/lottoBallGrid';
import {background} from './components/common/background';

import {
    GameApiValidationErrorInterface,
    GameApiOngoingGameResponseInterface
} from './gameApi/GameApiInterfaces';

var init = (function() {
    var settings = {
        name: 'playground',
        assetList: assetList,
        loaderAssetPath: 'build',
        viewPort: viewPort,
        game: () => {
            background();
            manager();
            rotation().handleRotation();

            gameApi
                .sessionGuest()
                .then(() => {
                    return gameApi.config();
                })
                .then(() => {
                    return gameApi.ongoing();
                })
                .then((ongoingGameResponse: GameApiOngoingGameResponseInterface) => {
                    game();
                    if (ongoingGameResponse.gameInstanceId) {
                        dustEvent.broadcast(Events[Events.gameGotState], ongoingGameResponse.state);
                    }
                })
                .catch((error: GameApiValidationErrorInterface) => {
                    //TODO: handle ongoing error
                });
        },
        events: {
            GAME_STARTING: publisherEvents.GAME_STARTING,
            GAME_REQUESTED_START: publisherEvents.GAME_REQUESTED_START,
            GAME_START: publisherEvents.GAME_START,
            DEPENDENCIES_STARTED: publisherEvents.PUBLISHER_STARTED
        },
        api: api
    };

    rotation({
        viewPort: settings.viewPort,
        orientationAssetPath: 'build'
    });

    return new Loader(settings);
})();

export {init};
