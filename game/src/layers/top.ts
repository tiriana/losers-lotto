/// <reference path="../../../references" />

import Layer = DUST.COMPONENT.Layer;

class Top {
    private _instance: Layer;

    constructor() {
        this._instance = new Layer('top', 2);
    }

    get instance() {
        return this._instance;
    }
}

var top = new Top().instance;

export {top};
