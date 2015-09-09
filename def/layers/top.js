var GAME;
(function (GAME) {
    var LAYERS;
    (function (LAYERS) {
        var Layer = DUST.COMPONENT.Layer;
        var Top = (function () {
            function Top() {
                this._instance = new Layer('top', 2);
            }
            Object.defineProperty(Top.prototype, "instance", {
                get: function () {
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            return Top;
        })();
        LAYERS.top = new Top().instance;
    })(LAYERS = GAME.LAYERS || (GAME.LAYERS = {}));
})(GAME || (GAME = {}));
//# sourceMappingURL=top.js.map