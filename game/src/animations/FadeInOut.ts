/// <reference path="../../../references" />

import Entity = DUST.GRAPHIC.Entity;

function FadeInOut(delay: number = 0, speed: number = 1) {
    return (target: Function) => {
        var entity = <Entity>target.prototype;

        entity.onBeforeAttach = function() {
            this.sprite.alpha = 0;
        }

        entity.onAfterAttach = function(notify) {
            window.setTimeout(() => {
                this.animationEnable();
                this.sprite.speed = 1.2 * speed;
                this.sprite.acceleration = 0.8 * speed;
                this.sprite.animate.fade(1, () => {
                    notify();
                    this.animationDisable();
                });
            }, delay);
        };

        entity.onBeforeRemove = function(remove) {
            window.setTimeout(() => {
                this.animationEnable();
                this.sprite.speed = 1.2 * speed;
                this.sprite.acceleration = 0.8 * speed;
                this.sprite.animate.fade(0, () => {
                    remove();
                    this.animationDisable();
                });
            }, delay);
        };
    }
}

export {FadeInOut}