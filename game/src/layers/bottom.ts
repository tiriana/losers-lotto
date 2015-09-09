/// <reference path="../../../references" />

import Layer = DUST.COMPONENT.Layer;
 
class Bottom {
    private _instance: Layer;  
      
    constructor() {
        this._instance = new Layer('bottom', 0);
    } 

    get instance() {
        return this._instance;
    }
}

var bottom = new Bottom().instance;

export {bottom}
