var Roll = require('roll'),
roller = new Roll();

const minRoller = (dice) => {
    return (roller.roll(dice).input.quantity * 1); // the minimum value of each dice is 1
}

const averageRoller = (dice) => {
    return roller.roll(dice).input.quantity * (Math.ceil((roller.roll(dice).input.sides+1)/2));
}
const maxRoller = (dice) => {
    return (roller.roll(dice).input.quantity * roller.roll(dice).input.sides);
}

const randomRoller = (dice) => {
    return roller.roll(dice).result;
}

module.exports = {
    minRoller,
    averageRoller,
    maxRoller,
    randomRoller
}