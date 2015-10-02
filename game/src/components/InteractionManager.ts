/// <reference path="../../../references" />

import Entity = DUST.GRAPHIC.Entity;
import Sprite = PIXI.Sprite;
import rotation = DUST.PLUGINS.ROTATION.classic;

import {bottom} from '../layers/bottom';
import {viewPort} from '../viewPort';
import {circleLineCollision} from './circleLineCollision';

/**
 * @param ax:number Interaction line start - x
 * @param ay:number Interaction line start - y
 * @param ax:number Interaction line end - x
 * @param ay:number Interaction line end - y
 */
type CollisionDetector = (ax: number, ay: number, bx: number, by: number, entity: Entity) => boolean;

/**
 * @param lineSegment:number[] array with line points coordinatse
 *      lineSegment[0] line start - x
 *      lineSegment[1] line start - y
 *      lineSegment[2] line end - x
 *      lineSegment[3] line end - y
 * @param segmentNumberInLine:number Number of segment in current line
 * @param lineId:number Line Id
 */
type LineDrawer = (lineSegment: number[], segmentNumberInLine: number, lineId: number) => void;

/**
 * Binds to Entity and handles interactions.
 * Calls handleInteractionEnd, handleInteractionMove, handleTouchstart from bound Entity.sprite
 */
class InteractionHandler {
    protected _boundEntity: Entity;
    bound: boolean = false;

    constructor(entity: Entity) {
        if (this.bound) {
            return;
        }
        this.bound = true;
        this._boundEntity = entity;
        this._bind(entity);
    }

    unbind() {
        this.bound = false;
        if (this._boundEntity) {
            this._boundEntity.makeStatic();
        }
    }

    protected _bind(entity: Entity) {
        this._boundEntity.makeInteractive(true);
        var sprite = <any>this._boundEntity.sprite;

        sprite.mousedown = (mouseData) => {
            sprite.mouseInProgress = true;
            if (sprite.handleTouchstart) {
                sprite.handleTouchstart(mouseData);
            }
        }

        sprite.mousemove = (mouseData) => {
            if (sprite.mouseInProgress && sprite.handleInteractionMove) {
                sprite.handleInteractionMove(mouseData);
            }
        }

        sprite.mouseup = (mouseData) => {
            sprite.mouseInProgress = false;
            if (sprite.handleInteractionEnd) {
                sprite.handleInteractionEnd(mouseData);
            }
        }

        sprite.touchstart = (touchData)  => {
            if (sprite.handleTouchstart) {
                sprite.handleTouchstart(touchData);
            }
        }

        sprite.touchend = (touchData)  => {
            if (sprite.handleInteractionEnd) {
                sprite.handleInteractionEnd(touchData);
            }
        }

        sprite.touchendoutside = (touchData)  => {
            if (sprite.handleInteractionEndOutside) {
                sprite.handleInteractionEndOutside(touchData);
            } else if (sprite.handleInteractionEnd) {
                sprite.handleInteractionEnd(touchData);
            }
        }

        sprite.touchmove = (touchData) => {
            if (sprite.handleInteractionMove) {
                sprite.handleInteractionMove(touchData);
            }
        }
    }
}

/**
 * Simple collision checker
 * Models Entity with a circle and check weather this circle contains or intersects with line segment
 * @param ax:number Interaction line start - x
 * @param ay:number Interaction line start - y
 * @param ax:number Interaction line end - x
 * @param ay:number Interaction line end - y
 * @param entity:Entity
 */
var defaultIsCollision = <CollisionDetector>(ax, ay, bx, by, entity: Entity) => {
    var l = (entity.sprite.width + entity.sprite.height) / 2; // avg of width and height
    var r = l * (1 + Math.SQRT2) / 4; // something between Incircle and excircles

    return true;
}

/**
 * Binds interactions to background
 * Checks collisions
 */
class InteractionManager {
    protected isColision: CollisionDetector;
    protected entities: Entity[];
    protected draw: LineDrawer;
    protected container: Entity;

    constructor(entities: Entity[] = [], isColision: CollisionDetector = defaultIsCollision, draw?: LineDrawer) {
        isColision = isColision || defaultIsCollision;
        this.entities = entities;
        this.isColision = isColision;
        this.draw = draw;
        this.container = this.entities[0].sprite.container;

        this.bindTouch();
    }

    getColidingEntities(ax, ay, bx, by) {
        return this.entities.reduce((colidingEntites: Entity[], entity: Entity) => {

            if (this.isColision(ax, ay, bx, by, entity)) {
                colidingEntites.push(entity);
            }

            return colidingEntites;

        }, <Entity[]>[]);
    }

    /**
     * This method will be called with coliding Entites.
     * Can be overwriten
     *
     * @param colidingEntities
     */
    onCollision(colidingEntities: Entity[]) {

    }

    bindTouch() {
        var sprite = <any>bottom.sprite;

        sprite._prevPos = {};
        sprite._lineLength = {};

        sprite.handleInteractionMove = (touchData) => {
            var id = touchData.data.identifier || -1;
            var pos = touchData.data.getLocalPosition(this.container.sprite);
            var prevPos = sprite._prevPos[id] || pos;
            sprite._prevPos[id] = pos;
            sprite._lineLength[id] = sprite._lineLength[id] || 0;
            sprite._lineLength[id]++;

            var line: number[];

            var px = prevPos.x;
            var py = prevPos.y;

            var x = pos.x;
            var y = pos.y;

            if (rotation().isRotated()) {
                line = [-py, -px, -y, -x];
            } else {
                line = [px, py, x, y];
            }

            if (this.draw) {
                this.draw(line, sprite._lineLength[id], id);
            }

            this.onCollision(this.getColidingEntities(line[0], line[1], line[2], line[3]));
        };

        sprite.handleInteractionEnd = (touchData) => {
            sprite._prevPos[touchData.data.identifier] = null;
            sprite._lineLength[touchData.data.identifier] = null;
        };

        var handler = new InteractionHandler(bottom);
    }
}

export {CollisionDetector, LineDrawer, InteractionHandler, InteractionManager};
