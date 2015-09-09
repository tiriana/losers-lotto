/// <reference path="../../references" />

import stage = DUST.GRAPHIC.stage;
import bodies = DUST.PHYSICS.bodies;

import {world} from './world';

function animate() {
    world.step(0.028);
    bodies.update();
}

function loop() {
    //uncomment if you want to enable physics
    //stage.addToLoop(animate, 'gameLoop');
}

export {loop}