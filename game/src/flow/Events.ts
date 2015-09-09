enum Events {
    //setup events for different kind of games        
    gameSetupSingle,
    gameSetupDuel,
    gameSetupMultiplayer,

    // game start flow
    gameRequestedStart,
    gameStarted,

    // game end flow
    gameRequestedEnd,
    gameEnded,

    // match start flow
    matchRequestedStart,
    matchStared,
    matchSceneStarted,
        
    // match end flow
    matchRequestedEnd,
    matchEnded
}

export {Events}