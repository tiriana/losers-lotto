/// <reference path="../../../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import EntityOptions = DUST.GRAPHIC.EntityOptions;
import uuid = DUST.PLUGINS.UUID.RFC4122.uuid;

import {middle} from '../../../layers/middle';

import {
LottoBallStates,
LottoBallInterface,
LottoBallStatesInterface
} from './LottoBallInterfaces';

import {LottoBallOptions} from './LottoBallOptions';
import {LottoBallInactive} from './LottoBallInactive';
import {LottoBallActivating} from './LottoBallActivating';
import {LottoBallActiveLucky} from './LottoBallActiveLucky';
import {LottoBallActiveUnlucky} from './LottoBallActiveUnlucky';

class LottoBall extends Entity implements LottoBallInterface<LottoBall> {
    id: string;
    state: LottoBallStates;
    ballNumber: number;
    ballStates: LottoBallStatesInterface<LottoBallInactive<LottoBall>, LottoBallActivating<LottoBall>, LottoBallActiveLucky<LottoBall>, LottoBallActiveUnlucky<LottoBall>>;

    constructor(ballNumber: number) {
        this.id = uuid.v4();
        this.ballNumber = ballNumber;

        super(new LottoBallOptions(this.id));

        this.buildStates();
        this.setState(LottoBallStates.inactive);
    }

    setState(state: LottoBallStates) {
        this.state = state;

        return this
            .clearState()
            .then(() => {
                return this.ballStates[LottoBallStates[state]].enable();
            });
    }

    handleInput(data?: any) {
        return this
            .ballStates[LottoBallStates[this.state]]
            .inputHandler(data);
    }

    private clearState() {
        return this
            .ballStates[LottoBallStates[this.state]]
            .disable();
    }

    private buildStates() {
        this.ballStates = {
            inactive: new LottoBallInactive(this, this.id),
            activating: new LottoBallActivating(this, this.id),
            activeLucky: new LottoBallActiveLucky(this, this.id),
            activeUnlucky: new LottoBallActiveUnlucky(this, this.id)
        }
    }
}

export {LottoBall}