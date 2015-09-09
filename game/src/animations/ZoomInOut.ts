/// <reference path="../../../references" />

import Entity = DUST.GRAPHIC.Entity;

function ZoomInOut(delay: number = 0, speed: number = 1, scale: number = 1) {
    return (target: Function) => {
        var entity = <Entity>target.prototype;

        entity.onBeforeAttach = function() {
            this.sprite.scale.x = this.sprite.scale.y = 0;
        }

        entity.onAfterAttach = function(notify) {
            window.setTimeout(() => {
                this.animationEnable();
                this.sprite.speed = 2 * speed;
                this.sprite.acceleration = 0.8 * speed;
                this.sprite.animate.zoom(1.2 * scale, () => {
                    this.sprite.speed = 1 * speed;
                    this.sprite.acceleration = 0.8 * speed;
                    this.sprite.animate.zoom(1 * scale, () => {
                        notify();
                        this.animationDisable();
                    });
                });
            }, delay);
        };

        entity.onBeforeRemove = function(remove) {
            window.setTimeout(() => {
                this.animationEnable();
                this.sprite.speed = 2 * speed;
                this.sprite.acceleration = 0.8 * speed;
                this.sprite.animate.zoom(1.4 * scale, () => {
                    this.sprite.speed = 2 * speed;
                    this.sprite.acceleration = 1.6 * speed;
                    this.sprite.animate.zoom(0, () => {
                        remove();
                        this.animationDisable();
                    });
                });
            }, delay);
        };
    }
}

export {ZoomInOut}