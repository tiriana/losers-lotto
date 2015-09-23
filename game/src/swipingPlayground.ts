/// <reference path="../../references" />

import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Container = PIXI.Container;
import DisplayObject = PIXI.DisplayObject;
import Text = DUST.COMPONENT.Text;
import FontSettings = DUST.COMPONENT.FontSettings;
import EntityTextOptions = DUST.COMPONENT.EntityTextOptions;
var rgb2hex = (<any>PIXI).utils.rgb2hex;
var hex2rgb = (<any>PIXI).utils.hex2rgb;
import {top} from './layers/top';
import {Fonts} from './Fonts';

class InteractionHandler {
    protected _boundSprite: Sprite;
    bound: boolean = false;

    bind(sprite: Sprite) {
        if (this.bound) {
            return;
        }
        this.bound = true;
        this._boundSprite = sprite;
        this._bind(sprite);
    }

    unbind(sprite: Sprite) {
        this.bound = false;
        if (this._boundSprite) {
            this._boundSprite.interactive = false;
        }
    }

    protected _bind(sprite: Sprite) {
        this._boundSprite.interactive = true;
        var mySprite = <any>this._boundSprite;

        mySprite.mouseover = (mouseData)  => {
            // console.log("MOUSE OVER!", mySprite.name, mouseData);
        }

        mySprite.mouseout = (mouseData)  => {
            // console.log("MOUSE OUT!", mySprite.name, mouseData);
        }

        mySprite.mousedown = (mouseData) => {
            // console.log("MOUSE DOWN!", mySprite.name, mouseData);
        }

        mySprite.mousemove = (mouseData) => {
            // console.log("MOUSE MOVE!", mySprite.name, mouseData);
        }

        mySprite.mouseup = (mouseData) => {
            // console.log("MOUSE UP!", mySprite.name, mouseData);
        }

        mySprite.click = (mouseData) => {
            // console.log("CLICK!", mySprite.name, mouseData);
        }

        var prevTouchData;

        var prevTouch = {};

        var startTouch = (touchData) => {
            prevTouch[touchData.data.identifier] = touchData;
        };

        var endTouch = (touchData) => {
            updateTouch(touchData);
        };

        var updateTouch = (touchData) => {
            var prev = prevTouch[touchData.data.identifier];
            touchData.prev = prev;
            prevTouch[touchData.data.identifier] = touchData;
        };

        mySprite.touchstart = (touchData)  => {
            //startTouch(touchData);

            if (mySprite.handleTouchstart) {
                mySprite.handleTouchstart(touchData);
            }


            // console.log("TOUCH START!", mySprite.name, touchData);
        }

        mySprite.touchend = (touchData)  => {
            //endTouch(touchData);

            if (mySprite.handleTouchend) {
                mySprite.handleTouchend(touchData);
            }

            console.log("TOUCH END!", mySprite.name, touchData);
        }

        mySprite.touchendoutside = (touchData)  => {
            //endTouch(touchData);

            if (mySprite.handleTouchendoutside) {
                mySprite.handleTouchendoutside(touchData);
            }


            console.log("TOUCH END OUTSIDE!", mySprite.name, touchData);
        }

        mySprite.tap = (touchData)  => {
            //if (!prevTouchData) {
            //    prevTouchData = touchData;
            //}
            //
            //if (mySprite.handleTap) {
            //    mySprite.handleTap(touchData);
            //}
            //
            //touchData.prevTouchData = prevTouchData;
            //prevTouchData = touchData;
            // console.log("TAP!", mySprite.name, touchData);
        }


        mySprite.touchmove = (touchData) => {
            //updateTouch(touchData);

            if (mySprite.handleTouchmove) {
                mySprite.handleTouchmove(touchData);
            }
            // console.log("TOUCH MOVE!", mySprite.name, touchData);
        }
    }
}

class Demo {
    shapes: DisplayObject[][] = [];
    shapesCont: Container;
    rowsNums: number [] = [8, 8, 9, 9, 8, 7];
    offsets: number [] = [-4.5, -4, -4.5, -4, -3.5, -3];

    static getNumber(number: number): Text {
        var font = new FontSettings(24, Fonts[Fonts.cantarell_white]);
        var options = new EntityTextOptions(number + '', font);
        options.name = 'number-' + number;
        options.anchor = {x: 0.5, y: 0.5};
        var ret = new Text(options);
        ret.x = ret.y = 0;
        return ret;
    }

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


    static getLineGraphic(x1: number,
                          y1: number,
                          x2: number,
                          y2: number,
                          lineThickness: number = 0,
                          lineColor?: number): Graphics {
        var ret = new Graphics();
        ret.lineStyle(lineThickness, lineColor);  //(thickness, color)
        ret.moveTo(x1, y1);
        ret.lineTo(x2, y2);
        return ret;
    }

    static getLineTexture(x1: number,
                          y1: number,
                          x2: number,
                          y2: number,
                          lineThickness: number = 0,
                          lineColor?: number) {
        var ret = Demo.getLineGraphic(0, 0, x2 - x1, y2 - y1, lineThickness, lineColor);
        var texture = (<any>ret).generateTexture();

        return texture
    }

    static getLineSprite(x1: number,
                         y1: number,
                         x2: number,
                         y2: number,
                         lineThickness: number = 0,
                         lineColor?: number) {
        var sprite = new PIXI.Sprite(Demo.getLineTexture(x1, y1, x2, y2, lineThickness, lineColor));
        sprite.x = x1;
        sprite.y = y1;
        sprite.anchor = new Point(0, 0);
        return sprite;
    }

    run() {
        this.buildShapes();
        this.bindInteractions();
    }

    colors: number[] = [0xFFFFFF, 0x00FFFF, 0xFF00FF, 0xFFFF00, 0xFF0000, 0x00FF00, 0x0000FF];

    bindInteractions() {
        var getLineDrawer = (sprite: any) => {
            sprite._prevPos = {};
            sprite._lineLength = {};

            return (touchData) => {

                var id = touchData.data.identifier;

                var pos = touchData.data.getLocalPosition(sprite);
                var prevPos = sprite._prevPos[id] || pos;
                sprite._prevPos[id] = pos;
                sprite._lineLength[id] = sprite._lineLength[id] || 0;
                sprite._lineLength[id]++;

                //console.log(prevPos, pos);

                var isInside: boolean;

                isInside = Math.max(Math.abs(pos.x), Math.abs(pos.y)) < sprite.width / 2;

                //if (!isInside) {
                //    return;
                //}

                var ids = [];
                if (touchData.data.changedTouches) {
                    for (var i = 0; i < touchData.data.changedTouches.length; i++) {
                        ids.push(touchData.data.changedTouches.item(i));
                    }
                }

                var color = this.colors[touchData.data.identifier % this.colors.length];

                var line = Demo.getLineGraphic(prevPos.x, prevPos.y, pos.x, pos.y, 6, color);

                //console.log(ids, sprite.name, [pos.x, pos.y]);

                //var s = Demo.getSquareSprite(
                //    0,
                //    0,
                //    5,
                //    color,
                //    1,
                //    0,
                //    rgb2hex([212, 212, 212])
                //);
                //
                //s.x = pos.x;
                //s.y = pos.y;

                sprite.addChild(line);
                //sprite.addChild(s);

                window.setTimeout(() => {
                    sprite.removeChild(line);
                    //sprite.removeChild(s);
                    sprite._lineLength[id]--;
                    if (sprite._lineLength[id] <= 0) {
                        sprite._prevPos[id] = null;
                    }
                }, 1000);
            };
        }

        var bgInteractionHandler = new InteractionHandler();

        var bg = top.sprite;
        //bgInteractionHandler.bind(bg);
        //bg.handleTouchmove = getLineDrawer(bg);

        var s = <any>this.shapesCont;
        bgInteractionHandler.bind(s);

        s.handleTouchmove = getLineDrawer(s);

        s.handleTouchendoutside = s.handleTouchend = (touchData) => {
            console.log('touch end', touchData);
            s._prevPos[touchData.data.identifier] = null;
        }
    }

    buildShapes() {
        var w: number = 75, colNum: number;
        var offset: number;
        var num: number = 1;
        this.shapesCont = new Container();
        top.sprite.addChild(this.shapesCont);

        (<any>top.sprite).name = 'TOP';

        this.rowsNums.forEach((cellsNumber: number, rowNum: number) => {
            offset = this.offsets[rowNum];

            this.shapes[rowNum] = [];
            for (colNum = 0; colNum < cellsNumber; colNum++) {

                var shape = Demo.getSquareSprite(
                    0,
                    0,
                    w,
                    rgb2hex([128, 128, 128]),
                    0.3,
                    2,
                    rgb2hex([212, 212, 212])
                );

                (<any>shape).name = num + '';

                var number = Demo.getNumber(num).sprite;
                num++;

                shape.addChild(number);

                var container = new Container();
                container.addChild(shape);

                this.shapes[rowNum][colNum] = container;

                this.shapes[rowNum][colNum].x = w * (offset + colNum);
                this.shapes[rowNum][colNum].y = rowNum * w;
                this.shapesCont.addChild(this.shapes[rowNum][colNum]);
            }
        });
    }
}

var instance: Demo;
var demo = () => {
    if (!instance) {
        instance = new Demo();
        instance.run();
        instance.shapesCont.x = 30;
        instance.shapesCont.y = 200;
    }
    return instance;
}
(<any>window).demo = demo;

export {demo}
