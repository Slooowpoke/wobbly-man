/**
 *  Player
 */

export default class extends Phaser.Physics.Matter.Sprite {

    constructor (scene, x, y) {
        super(scene.matter.world, x, y , 'player');
        this.scene = scene;
        this.scene.add.existing(this);
        this.speed = 5;

        this.anims.play('wiggle', true);
    }

    update(vx, vy){
        this.setVelocityX(vx);
        this.setVelocityY (vy);
    }

    setSpeed(speed){
        if(speed >= 0){
            this.speed = speed;
        }
    }

    getSpeed(){
        return speed;
    }
}
