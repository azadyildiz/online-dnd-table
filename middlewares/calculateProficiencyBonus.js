function calculateProficiencyBonus(level) {
    if (level >= 17) {return 6;}
    else if (level >= 13) {return 5;}
    else if (level >= 9) {return 4;}
    else if (level >= 5) {return 3;}
    else {return 2;}
}

module.exports = calculateProficiencyBonus;