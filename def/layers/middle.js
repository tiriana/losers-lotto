var GAME;
(function (GAME) {
    var LAYERS;
    (function (LAYERS) {
        var Layer = DUST.COMPONENT.Layer;
        var Middle = (function () {
            function Middle() {
                this._instance = new Layer('middle', 1);
            }
            Object.defineProperty(Middle.prototype, "instance", {
                get: function () {
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            return Middle;
        })();
        LAYERS.middle = new Middle().instance;
    })(LAYERS = GAME.LAYERS || (GAME.LAYERS = {}));
})(GAME || (GAME = {}));
//# sourceMappingURL=middle.js.map