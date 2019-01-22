import Rock from "../entities/Rock";
import Player from "../entities/Player";
import Powerup from "../entities/Powerup";
import { getNewPosition } from "../utils/GetNewPosition";
import { getRandomPosition } from "../utils/GetRandomPosition";

export default class GameScene extends Phaser.Scene {

    constructor () {
        super ({ key: 'GameScene' });

        this.speed = 5;
        this.enemies = [];
        this.powerups = [];

        this.playerHitByEnemy = this.playerHitByEnemy.bind(this);
        this.playerHitByPowerup = this.playerHitByPowerup.bind(this);
    }

    create () {
        this.cameras.main.fadeIn (200);

        this.background = this.add.tileSprite(0, 0, 10000, 10000, 'stars');

        const particles = this.add.particles ('rainbow');

        this.rainbowEmitter = particles.createEmitter ({
            speed: 50,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        this.matter.add.sprite (400, 100, 'player');

        this.anims.create({
            key: 'wiggle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.player = new Player(this, 400, 100);
        this.matter.add.sprite(this.player);

        this.player.setVelocityX(this.speed);
        this.cameras.main.setLerp(0.2, 1);
        this.cameras.main.startFollow (this.player);
        this.rainbowEmitter.startFollow (this.player);

        for(let i = 0; i < (window.innerHeight+window.innerWidth) / 50; i++){
            this.spawnEnemy();
            if(i % 4) this.spawnPowerup();
        }

        this.scoreText = this.add.text(16, 32, 'Current distance: 0 meters', { fontSize: '16px', fill: '#fff' });
        this.speedText = this.add.text(16, 16, 'Current speed: 0', { fontSize: '16px', fill: '#fff' });
        this.scoreText.setScrollFactor(0);
        this.speedText.setScrollFactor(0);

        var gn = new GyroNorm();
        gn.init().then(() => {
            gn.start((data) =>{
                this.beta = data.do.beta;
            });
        }).catch(function(e){});
    }

    update(){
        this.background.x = this.player.x;

        const cursors = this.input.keyboard.createCursorKeys ();
        let vy = 0;
        if(this.beta === 0){
            // Its a desktop device
            if(cursors.up.isDown) {
                vy -= this.speed;
            } else if(cursors.down.isDown) {
                vy += this.speed;
            } else {
                vy = 0;
            }
        }else{
            let upThreshold = 20;
            let downThreshold = 30;
            if(this.beta < downThreshold && this.beta > upThreshold){
                vy = 0
            }else if(this.beta < upThreshold) {
                vy -= this.speed;
            } else if(this.beta > downThreshold) {
                vy += this.speed;
            }
        }

        this.player.update(this.player.speed, vy);

        // Loop and check for offscreen objects
        const offsetX = window.innerWidth / 2;
        const offsetY = window.innerHeight / 2;

        for(let enemy of this.enemies){
            enemy.update(this.player, offsetX, offsetY);
        }
        for(let powerup of this.powerups){
            powerup.update(this.player, offsetX, offsetY);
        }

        const score = parseInt(this.player.x);
        this.scoreText.setText('Current distance: ' + score + ' meters');

        const speedX = parseInt(this.player.speed);
        this.speedText.setText('Current speed: ' + speedX);
    }

    spawnEnemy(){
        const enemy = new Rock(
            this,
            getNewPosition(this.player).x,
            getNewPosition(this.player).y,
            getRandomPosition(0, 360),
            this.player,
            this.playerHitByEnemy
        );

        this.matter.add.sprite(enemy);
        this.enemies.push(enemy);
    }

    spawnPowerup(){
        const powerup = new Powerup(
            this,
            getNewPosition(this.player).x,
            getNewPosition(this.player).y,
            getRandomPosition(0, 360),
            this.player,
            this.playerHitByPowerup
        );

        this.matter.add.sprite(powerup);
        this.powerups.push(powerup);
    }

    playerHitByEnemy(enemy){
        enemy.reset();
        this.player.setSpeed(this.player.speed-1);
    }

    playerHitByPowerup(powerup){
        powerup.reset();
        this.player.setSpeed(this.player.speed+1);
    }
}
