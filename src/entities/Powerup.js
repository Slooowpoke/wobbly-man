import ClippedObject from "./ClippedObject";

/**
 *  A powerup
 *
 */

export default class extends ClippedObject {
    constructor (scene, x, y, angle, player, collideWithPlayerAction) {
        super(scene, x, y , 'powerup', angle, player);
        this.collideWithPlayerAction = collideWithPlayerAction;
    }

    onCollideWithPlayer({gameObjectB}){
        this.reset();
        this.collideWithPlayerAction(gameObjectB);
    }
}
