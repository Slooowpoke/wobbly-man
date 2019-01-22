/**
 *  ClippedObject
 *
 *  An object which falls off if out of view and resets its position elsewhere
 */

import { getNewPosition } from "../utils/GetNewPosition";

export default class extends Phaser.Physics.Matter.Sprite {

    constructor (scene, x, y, texture, angle, player) {
        super(scene.matter.world, x, y , texture);
        this.player = player;
        this.scene = scene;
        this.angle = angle;
        this.scene.add.existing(this);

        scene.matterCollision.addOnCollideStart({
            objectA: player,
            objectB: this,
            callback: (eventData) => this.onCollideWithPlayer(eventData),
            context: this
        });
    }

    update(player, offsetX, offsetY){
        if(this.x < player.x - offsetX) {
            this.x = getNewPosition(player).x;
            this.y = getNewPosition(player).y;
        }
        if(this.y < player.y - offsetY) {
            this.y = player.y + offsetY
        }
        if(this.y > player.y + offsetY) {
            this.y = player.y - offsetY;
        }
    }

    // Interface declaration sort-of
    onCollideWithPlayer(eventData){}

    reset(){
        this.setVisible(false);
        this.x = getNewPosition(this.player).x;
        this.y = getNewPosition(this.player).y;
        this.setVisible(true);
    }
}
