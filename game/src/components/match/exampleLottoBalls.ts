import {viewPort} from '../../viewPort';
import {LottoBall} from './LottoBall/LottoBall';

class ExampleLottoBall extends LottoBall {
    constructor(ballNumber: number, x: number, y: number) {
        super(ballNumber);

        this.y = y;
        this.x = x;
    }
}

var instances = [];

function exampleLottoBalls() {
    if (!instances.length) {
        let distanceX = viewPort.width / 7;
        let distanceY = viewPort.height / 7;

        for (let i = 1; i <= 49; i += 1) {
            let x = -viewPort.width / 2 + distanceX * ((i - 1) % 7) + distanceX / 2;
            let y = distanceY * Math.floor((i - 1) / 7) + distanceY / 2;
            console.log(x, y, i);
            instances.push(new ExampleLottoBall(i, x, y))
        }
    }

    return instances;
}

export {exampleLottoBalls}