export const getRandomPosition = (min, max) => {
    if(Math.random() > 0.5){
        return -Math.random() * (max - min) + min;
    }else{
        return Math.random() * (max - min) + min;
    }
}