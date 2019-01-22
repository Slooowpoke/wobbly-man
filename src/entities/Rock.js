import ClippedObject from "./ClippedObject";

/**
 *  A rock
 *
 *  An object which falls off if out of view and resets its position elsewhere
 */

export default class extends ClippedObject {
    constructor (scene, x, y, angle, player, collideWithPlayerAction) {
        super(scene, x, y , 'rock', angle, player);
        this.collideWithPlayerAction = collideWithPlayerAction;
    }

    onCollideWithPlayer({gameObjectB}){
        this.reset();
        this.collideWithPlayerAction(gameObjectB);
    }
}
