/// <reference path="../../../references" />

import STORAGE = DUST.PLUGINS.PUBLISHERAPI.STORAGE;
import STORE = DUST.PLUGINS.PUBLISHERAPI.STORE;
import NETWORK = DUST.PLUGINS.PUBLISHERAPI.NETWORK;
import SOCIAL = DUST.PLUGINS.PUBLISHERAPI.SOCIAL;

import UserMetaDataStorage = STORAGE.UserMetaDataStorage;
import UserEnergyStorage = STORAGE.UserEnergyStorage;
import GameStorage = STORAGE.GameStorage;
import UserLifeStorage = STORAGE.UserLifeStorage;
import UserStoreItemsStorage = STORAGE.UserStoreItemsStorage;

import Store = STORE.Store;

import Network = NETWORK.Network

import Social = SOCIAL.Social;

import dustEvent = DUST.event;
import PublisherEvents = DUST.PLUGINS.PUBLISHERAPI.Events;

dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_STARTED], () => {
    // social
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_SOCIAL], (social: Social) => {
        SOCIAL.registerSocial(social);
    });

    // game storage
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_GAME_STORAGE], (storage: GameStorage) => {
        STORAGE.registerGameStorage(storage);
    });

    // life storage
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_USER_LIFE_STORAGE], (storage: UserLifeStorage) => {
        STORAGE.registerUserLifeStorage(storage);
    });

    // store items storage
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_USER_STORE_ITEMS_STORAGE], (storage: UserStoreItemsStorage) => {
        STORAGE.registerUserStoreItemsStorage(storage);
    });

    // user meta data
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_USER_META_DATA_STORAGE], (storage: UserMetaDataStorage) => {
        STORAGE.registerUserMetaDataStorage(storage);
    });

    // user energy
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_USER_ENERGY_STORAGE], (storage: UserEnergyStorage) => {
        STORAGE.registerUserEnergyStorage(storage);
    });

    // network
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_NETWORK], (network: Network) => {
        NETWORK.registerNetwork(network);
    });

    // store
    dustEvent.once(PublisherEvents[PublisherEvents.PUBLISHER_HAS_OWN_STORE], (store: Store) => {
        STORE.registerStore(store);
    });

    dustEvent.broadcast(PublisherEvents[PublisherEvents.SOCIAL_REGISTRY_READY], null);
    dustEvent.broadcast(PublisherEvents[PublisherEvents.GAME_STORAGE_REGISTRY_READY], null);
    dustEvent.broadcast(PublisherEvents[PublisherEvents.USER_STORE_ITEMS_STORAGE_REGISTRY_READY], null);
    dustEvent.broadcast(PublisherEvents[PublisherEvents.USER_META_DATA_STORAGE_REGISTRY_READY], null);
    dustEvent.broadcast(PublisherEvents[PublisherEvents.USER_ENERGY_STORAGE_REGISTRY_READY], null);

    var storeConfig = {};

    var lifeStorageConfig = {
        rewardInterval: 2 * 60 * 1000,
        rewardSize: 1,
        rewardLimit: 90,
    };

    var networkConfig = {
        registryUrl: "",
        registryToken: ""
    };

    dustEvent.broadcast(PublisherEvents[PublisherEvents.USER_LIFE_STORAGE_REGISTRY_READY], lifeStorageConfig);
    dustEvent.broadcast(PublisherEvents[PublisherEvents.STORE_REGISTRY_READY], storeConfig);

    // window.setTimeout(() => {
    //     dustEvent.broadcast(PublisherEvents[PublisherEvents.NETWORK_REGISTRY_READY], networkConfig);
    // }, 2000);
});
