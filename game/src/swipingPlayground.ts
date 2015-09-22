/// <reference path="../../references" />

import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
var rgb2hex = (<any>PIXI).utils.rgb2hex;
var hex2rgb = (<any>PIXI).utils.hex2rgb;
import {top} from './layers/top';

class Demo {
    static getSquareGraphic(x: number,
                            y: number,
                            width: number,
                            fillColor?: number,
                            fillAlpha: number = 0,
                            lineThickness: number = 0,
                            lineColor?: number): Graphics {
        var ret = new Graphics();
        ret.lineStyle(lineThickness, lineColor);  //(thickness, color)
        ret.beginFill(fillColor, fillAlpha);  //(color, alpha)
        ret.drawRect(x, y, width, width);   //(x,y,width,height)
        ret.endFill();
        ret.boundsPadding = 0;

        return ret;
    }

    static getSquareTexture(x: number,
                            y: number,
                            width: number,
                            fillColor?: number,
                            fillAlpha: number = 0,
                            lineThickness: number = 0,
                            lineColor?: number) {
        var ret = Demo.getSquareGraphic(x, y, width, fillColor, fillAlpha, lineThickness, lineColor);
        var texture = (<any>ret).generateTexture();

        return texture
    }

    static getSquareSprite(x: number,
                           y: number,
                           width: number,
                           fillColor?: number,
                           fillAlpha: number = 0,
                           lineThickness: number = 0,
                           lineColor?: number) {
        var sprite = new PIXI.Sprite(Demo.getSquareTexture(x, y, width, fillColor, fillAlpha, lineThickness, lineColor));
        sprite.anchor = new Point(0.5, 0.5);
        return sprite;
    }

    run() {
        this.buildShapes();
    }

    shapes: Sprite[][] = [];
    rowsNums: number [] = [8, 8, 9, 9, 8, 7];
    offsets: number [] = [-4.5, -4, -4.5, -4, -3.5, -3];

    buildShapes() {
        var w: number = 50, colNum: number;
        var offset: number;

        this.rowsNums.forEach((cellsNumber: number, rowNum: number) => {
            offset = this.offsets[rowNum];

            this.shapes[rowNum] = [];
            for (colNum = 0; colNum < cellsNumber; colNum++) {

                this.shapes[rowNum][colNum] = Demo.getSquareSprite(
                    0,
                    0,
                    w,
                    rgb2hex([128, 128, 128]),
                    0.5,
                    2,
                    rgb2hex([212, 212, 212])
                );

                this.shapes[rowNum][colNum].x = Math.SQRT2 * w * (offset + colNum);
                this.shapes[rowNum][colNum].y = rowNum * 0.5 * Math.SQRT2 * w;
                this.shapes[rowNum][colNum].rotation = Math.PI / 4;
                top.sprite.addChild(this.shapes[rowNum][colNum]);
            }
        });

        //top.sprite.rotation = Math.PI;
    }
}

var demo = new Demo();
demo.run();
(<any>window).demo = demo;

export {demo}
