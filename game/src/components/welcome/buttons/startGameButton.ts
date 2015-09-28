/// <reference path="../../../../../references" />
/// <reference path="../../../layers/middle" />

import event = DUST.event;
import Entity = DUST.GRAPHIC.Entity;
import ButtonIcon = DUST.COMPONENT.ButtonIcon;

import {middle} from '../../../layers/middle';
import {viewPort} from '../../../viewPort';
import {Events} from '../../../flow/Events';

class StartGameButton extends ButtonIcon {
    constructor() {
        super('buttons/button', [], middle);

        this.y = viewPort.height / 2;
    }

    action() {
        this.makeStatic(); 
        event.broadcast(Events[Events.gameRequestedStart], null);
    }
}

var instance;

function startGameButton() {
    if (!instance) {
        instance = new StartGameButton();
    }

    return instance;
}

export {startGameButton}