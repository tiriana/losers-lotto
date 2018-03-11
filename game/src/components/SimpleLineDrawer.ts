/// <reference path="../../../references" />

import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Container = PIXI.Container;
import DisplayObject = PIXI.DisplayObject;
import Text = DUST.COMPONENT.Text;
import FontSettings = DUST.COMPONENT.FontSettings;
import EntityTextOptions = DUST.COMPONENT.EntityTextOptions;

class SimpleLineDrawer {
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
        var ret = SimpleLineDrawer.getLineGraphic(0, 0, x2 - x1, y2 - y1, lineThickness, lineColor);
        var texture = (<any>ret).generateTexture();

        return texture
    }

    static getLineSprite(x1: number,
                         y1: number,
                         x2: number,
                         y2: number,
                         lineThickness: number = 0,
                         lineColor?: number) {
        var sprite = new PIXI.Sprite(SimpleLineDrawer.getLineTexture(x1, y1, x2, y2, lineThickness, lineColor));
        sprite.x = x1;
        sprite.y = y1;
        sprite.anchor = new Point(0, 0);
        return sprite;
    }

    public static colors: number[] = [0xFFFFFF, 0xFFFFFF, 0x00FFFF, 0xFF00FF, 0xFFFF00, 0xFF0000, 0x00FF00, 0x0000FF];

    public static getLineDrawer(parent: Sprite) {
        return (segment: number[], segmentNumberInLine: number, lineId: number) => {
            return SimpleLineDrawer.drawLine(parent, segment[0], segment[1], segment[2], segment[3], segmentNumberInLine, lineId);
        }
    }

    public static drawLine(parent: Sprite, ax: number, ay: number, bx: number, by: number, segmentNumberInLine: number, lineId: number) {
        var color = SimpleLineDrawer.colors[(~~Math.abs(lineId) ) % SimpleLineDrawer.colors.length];

        var line;

        line = SimpleLineDrawer.getLineGraphic(ax, ay, bx, by, 6, color);

        parent.addChild(line);

        window.setTimeout(() => {
            parent.removeChild(line);
        }, 1000);
    }
}

export {SimpleLineDrawer}