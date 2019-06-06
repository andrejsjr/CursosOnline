function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 0; i < 6; i++) {
    const result = getRandomInt(1, 60);
    console.log(result);
}