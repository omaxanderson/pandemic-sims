const canvas = {
    height: 700,
    width: 1000,
    backgroundColor: 40,
    foregroundColor: 200,
    infectedColor: [255, 0, 0],
    deadColor: [100, 100, 100],
    immuneColor: [0, 255, 0],
    personSize: 5,
    frameRate: 60,
};

export default canvas;

export function getDays(renders) {
    // arbitrarily saying 2 seconds is 1 day
    return Math.floor((renders / (canvas.frameRate * 2))) + 1;
}
