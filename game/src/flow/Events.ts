enum Events {
    // state events
    gameGotState,
    gameSetupState,
    
    //setup events for different kind of games        
    gameSetupSingle,
    
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