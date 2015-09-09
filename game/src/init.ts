/// <reference path="../../references" />

import publisherEvents = DUST.PLUGINS.PUBLISHERAPI.events;
import Loader = DUST.PLUGINS.LOADERS.Hog;
import rotation = DUST.PLUGINS.ROTATION.classic;

import {game} from './game';
import {assetList} from './assetList';
import {viewPort} from './viewPort';
import {api} from './api';

var init = (function() {
    var settings = {
        name: 'playground',
        assetList: assetList,
        loaderAssetPath: 'build',
        viewPort: viewPort,
        game: () => {
            rotation().handleRotation();

            game();
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
