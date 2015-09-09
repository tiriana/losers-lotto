var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GAME;
(function (GAME) {
    var SCENES;
    (function (SCENES) {
        var Scene = DUST.Scene;
        var Welcome = (function (_super) {
            __extends(Welcome, _super);
            function Welcome(options) {
                _super.call(this, options);
            }
            return Welcome;
        })(Scene);
        var welcomeInstance, options = {};
        function onShow() {
            console.log('Welcome!');
        }
        function onHide(clean) {
            clean();
        }
        options.objects = [];
        options.onShow = onShow;
        options.onHide = onHide;
        options.name = 'welcome';
        SCENES.welcome = function () {
            if (!welcomeInstance) {
                welcomeInstance = new Welcome(options);
            }
            return welcomeInstance;
        };
    })(SCENES = GAME.SCENES || (GAME.SCENES = {}));
})(GAME || (GAME = {}));
//# sourceMappingURL=welcome.js.map