import { getRandomPosition } from "./GetRandomPosition";

export const getNewPosition = (player) => {
    return {
        x: getNewPositionX(player),
        y: getNewPositionY(player)
    }
};

function getNewPositionX(player){
    return player.x + (window.innerWidth) + getRandomPosition(400, window.innerWidth);
}

function getNewPositionY(player){
    return player.y + getRandomPosition(100, window.innerHeight);
}
