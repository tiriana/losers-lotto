/// <reference path="../../references" />

import _world = DUST.PHYSICS.world;

if (_world && _world.solver) {
    _world.gravity = [0, 0];
    _world.applyDamping = true;
    _world.applyGravity = false;

    _world.defaultContactMaterial.restitution = 1;
    _world.defaultContactMaterial.friction = 0;
    _world.solver.frictionIterations = 1;
    _world.solver.tolerance = 2;
    _world.solver.iterations = 2;
 
    _world.on('impact', function(e) {
        if (e.bodyA.impactHandler) {
            e.bodyA.impactHandler(e);
        }
        if (e.bodyB.impactHandler) {
            e.bodyB.impactHandler(e);
        }
    });
}

var world = _world; 

export {world}
