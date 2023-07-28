const abilityScoreToModifierGenerator = (abilityScore) => Math.floor((abilityScore/2)-5);

module.exports = abilityScoreToModifierGenerator;