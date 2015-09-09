import {bottom} from './layers/bottom';
import {middle} from './layers/middle'; 
import {top} from './layers/top'; 
import {overlay} from './layers/overlay'; 

var layers = function() {
    return {
        bottom: bottom, 
        middle: middle,
        top: top,
        overlay: overlay
    };
}

export {layers}