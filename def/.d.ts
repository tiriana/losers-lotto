declare module GAME {
    var api: {
        nugplay: {
            gameId: any;
            debugPlayerId: any;
        };
    };
}
declare module GAME {
    var assetList: {
        audio: any[];
        audioSprite: any[];
        graphic: any[];
    };
}
declare module GAME.SCENES {
    var welcome: any;
}
declare module GAME {
    function loop(): void;
}
declare module GAME {
    function game(): void;
}
declare module GAME {
    var viewPort: {
        width: number;
        height: number;
        orientation: string;
    };
}
declare module GAME {
    import Loader = DUST.PLUGINS.LOADERS.Hog;
    var init: Loader;
}
