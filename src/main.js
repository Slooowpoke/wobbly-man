import 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
var game;

window.onload = function () {
    game = new Phaser.Game ({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
            default: 'matter',
            matter: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        },
        scene: [
            BootScene,
            PreloaderScene,
            GameScene,
        ],
        plugins: {
            scene: [
                {
                    plugin: PhaserMatterCollisionPlugin, // The plugin class
                    key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                    mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
                }
            ]
        }
    });

    // resize ();
    // window.addEventListener ('resize', resize, false);
}
