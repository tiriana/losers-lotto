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

interface LottoBallStateItemInterface<T> {
    enable: () => Promise<LottoBallStateItemInterface<T>>,
    disable: () => Promise<LottoBallStateItemInterface<T>>,
    enableHandler: () => Promise<LottoBallStateItemInterface<T>>
    disableHandler: () => Promise<LottoBallStateItemInterface<T>>
    inputHandler: () => Promise<LottoBallStateItemInterface<T>>
}

interface LottoBallInterface<T> {
    setState: (state: LottoBallStates) => Promise<T>,
    ballNumber: number,
    state: LottoBallStates,
    id: string,
    handleInput: () => Promise<LottoBallInterface<T>>
}

interface LottoBallStatesInterface<TInactive, TActivating, TActiveLucky, TActiveUnlucky> {
    inactive: LottoBallStateItemInterface<TInactive>,
    activating: LottoBallStateItemInterface<TActivating>,
    activeLucky: LottoBallStateItemInterface<TActiveLucky>,
    activeUnlucky: LottoBallStateItemInterface<TActiveUnlucky>
}

export {
    LottoBallStates,
    LottoBallStateItemInterface,
    LottoBallInterface,
    LottoBallStatesInterface
}