export default class BootScene extends Phaser.Scene {
    constructor () {
        super ({ key: 'BootScene' });
    }

    create () {
        this.scene.switch ('PreloaderScene');
    }
}
