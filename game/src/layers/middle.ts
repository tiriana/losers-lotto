/// <reference path="../../../references" />

import Layer = DUST.COMPONENT.Layer;

class Middle {
    private _instance: Layer;

    constructor() {
        this._instance = new Layer('middle', 1);
    }

    get instance() {
        return this._instance;
    }
}

var middle = new Middle().instance;

export {middle};
