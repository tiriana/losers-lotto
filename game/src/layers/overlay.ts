/// <reference path="../../../references" />

import Layer = DUST.COMPONENT.Layer;

class Overlay {
    private _instance: Layer;

    constructor() {
        this._instance = new Layer('overlay', 3);
    }

    get instance() {
        return this._instance;
    }
}

var overlay = new Overlay().instance;

export {overlay}
