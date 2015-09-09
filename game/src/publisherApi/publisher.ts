/// <reference path="../../../references" />

import STORAGE = DUST.PLUGINS.PUBLISHERAPI.STORAGE;
import STORE = DUST.PLUGINS.PUBLISHERAPI.STORE;
import NETWORK = DUST.PLUGINS.PUBLISHERAPI.NETWORK;
import SOCIAL = DUST.PLUGINS.PUBLISHERAPI.SOCIAL;

import Social = SOCIAL.Social;
import UserMetaDataStorage = STORAGE.UserMetaDataStorage;
import UserEnergyStorage = STORAGE.UserEnergyStorage;
import GameStorage = STORAGE.GameStorage;
import UserLifeStorage = STORAGE.UserLifeStorage;
import UserStoreItemsStorage = STORAGE.UserStoreItemsStorage;
import Store = STORE.Store;
import Network = NETWORK.Network;

import scenes = DUST.scenes;
import sceneEvents = DUST.sceneEvents;

class Publisher {
    constructor() {
        this.bindEvents();
    }

    get social(): Social {
        return SOCIAL.getSocial();
    }

    get userMetaDataStorage(): UserMetaDataStorage {
        return STORAGE.getUserMetaDataStorage();
    }

    get userEnergyStorage(): UserEnergyStorage {
        return STORAGE.getUserEnergyStorage();
    }

    get gameStorage(): GameStorage {
        return STORAGE.getGameStorage();
    }

    get userLifeStorage(): UserLifeStorage {
        return STORAGE.getUserLifeStorage();
    }

    get userStoreItemsStorage(): UserStoreItemsStorage {
        return STORAGE.getUserStoreItemsStorage();
    }

    get store(): Store {
        return STORE.getStore();
    }

    get network(): Network {
        return NETWORK.getNetwork();
    }

    checkAndTakeChips(chipsRequired: number): Promise<boolean> {
        return this
            .userLifeStorage
            .getLifes()
            .then((chips: number) => {
                if (chipsRequired > chips) {
                    return this
                        .openChipsStore()
                        .then(() => {
                            return false;
                        });
                }
                return this
                    .userLifeStorage
                    .rewardLifes(-Math.abs(chipsRequired))
                    .then(() => {
                        return this.addChipsToDeposite(Math.abs(chipsRequired));
                    }).then(() => {

                        return true;
                    })
            });
    }

    private _chipsDepositeParamName = 'chips-deposite';

    addChipsToDeposite(chips: number): Promise<number> {
        return this
            .getChipsInDeposite()
            .then((chipsInDeposite: number) => {
                return this.setChipsInDeposite(chipsInDeposite + +chips);
            });
    }

    getChipsInDeposite(): Promise<number> {
        return this
            .userLifeStorage
            .get(this._chipsDepositeParamName)
            .then((chipsInDeposite?: number) => {
                return +chipsInDeposite;
            });
    }

    setChipsInDeposite(chips: number): Promise<number> {
        return this
            .userLifeStorage
            .set(this._chipsDepositeParamName, chips)
            .then(() => {
                return this.getChipsInDeposite();
            });
    }

    withdrawDeposite() {
        return this.getChipsInDeposite()
            .then((chipsInDeposite: number = 0) => {
                return this.emptyDeposite()
                    .then(() => {
                        this.userLifeStorage.rewardLifes(~~chipsInDeposite);
                    });
            });
    }

    emptyDeposite() {
        return this.setChipsInDeposite(0);
    }
    
    openChipsStore() {
        return Promise.resolve();
    }

    bindEvents() {
    }
}

var publisher = new Publisher();

export {publisher}