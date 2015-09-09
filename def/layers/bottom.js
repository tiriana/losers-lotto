var GAME;
(function (GAME) {
    var LAYERS;
    (function (LAYERS) {
        var Layer = DUST.COMPONENT.Layer;
        var Bottom = (function () {
            function Bottom() {
                this._instance = new Layer('bottom', 0);
            }
            Object.defineProperty(Bottom.prototype, "instance", {
                get: function () {
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            return Bottom;
        })();
        LAYERS.bottom = new Bottom().instance;
    })(LAYERS = GAME.LAYERS || (GAME.LAYERS = {}));
})(GAME || (GAME = {}));
//# sourceMappingURL=bottom.js.map