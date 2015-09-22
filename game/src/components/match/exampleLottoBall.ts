import {viewPort} from '../../viewPort';
import {LottoBall} from './LottoBall/LottoBall';

class ExampleLottoBall extends LottoBall {
    constructor() {
        super(5);

        this.y = viewPort.height / 2;
    }
}

var instance;

function exampleLottoBall() {
    if (!instance) {
        instance = new ExampleLottoBall()
    }

    return instance;
}

export {exampleLottoBall}