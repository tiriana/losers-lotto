/// <reference path="../../../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;
import uuid = DUST.PLUGINS.UUID.RFC4122.uuid;

import {middle} from '../../../layers/middle';
import {viewPort} from '../../../viewPort';

enum LottoBallStates {
    inactive,
    activating,
    activeLucky,
    activeUnlucky
}

interface LottoBallSateItemInterface<T> {
    enable: () => Promise<LottoBallSateItemInterface<T>>,
    disable: () => Promise<LottoBallSateItemInterface<T>>,
    enableHandler: () => Promise<LottoBallSateItemInterface<T>>
    disableHandler: () => Promise<LottoBallSateItemInterface<T>>
    inputHandler: () => Promise<LottoBallSateItemInterface<T>>
}

interface LottoBallInterface<T> {
    setState: (state: LottoBallStates) => Promise<T>,
    ballNumber: number,
    state: LottoBallStates,
    id: string,
    handleInput: () => Promise<LottoBallInterface<T>>
}

interface LottoBallStatesInterface<TInactive, TActivating, TActiveLucky, TActiveUnlucky> {
    inactive: LottoBallSateItemInterface<TInactive>,
    activating: LottoBallSateItemInterface<TActivating>,
    activeLucky: LottoBallSateItemInterface<TActiveLucky>,
    activeUnlucky: LottoBallSateItemInterface<TActiveUnlucky>
}

export {
    LottoBallStates,
    LottoBallSateItemInterface,
    LottoBallInterface,
    LottoBallStatesInterface
}