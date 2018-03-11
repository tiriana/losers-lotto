import {GameApiRemote} from './gameApi/GameApiRemote';

var gameApi = new GameApiRemote(
    100,
    'LOSERS_LOTTO',
    'https://bornlucky-test.gamevy.com',
    'x-gamevy-session-token',
    '459d2e60-ff41-4237-937c-f5a2242dcafe',
    null);

export {gameApi};