const Campaign = require('../models/Campaign')

const scoreToModifier = require('./abilityScoreToModifierGenerator')
const diceRoller = require('./diceRoller')
const calculateProficiencyBonus = require('./calculateProficiencyBonus')
const classes = require('../data/classes.js')

function abilityModifiersCalculator(model) {
  try {
    return {
      strength: scoreToModifier(model.abilityScores.strength),
      dexterity: scoreToModifier(model.abilityScores.dexterity),
      constitution: scoreToModifier(model.abilityScores.constitution),
      intelligence: scoreToModifier(model.abilityScores.intelligence),
      wisdom: scoreToModifier(model.abilityScores.wisdom),
      charisma: scoreToModifier(model.abilityScores.charisma)
    }
  } catch (error) {
    console.log(error)
  }
}

function proficiencyBonusCalculator(model) {
  try {
    return calculateProficiencyBonus(model.level)
  } catch (error) {
    console.log(error)
  }
}

function hitPointsDiceCalculator(model) {
  try {
    return classes[model.className].hitDice
  } catch (error) {
    console.log(error)
  }
}

async function hitPointsCalculator(model) {
  try {
    var hitPoints =
      diceRoller.maxRoller(model.hitPointsDice) +
      model.abilityModifiers.constitution
    const campaign = await Campaign.findById(model.campaign.toString())
    const playerHitDiceRollType = campaign.settings.playerHitDiceRoll

    if (model.level > 1) {
      if (playerHitDiceRollType === 'min') {
        hitPoints =
          hitPoints +
          (model.level - 1) *
            (diceRoller.minRoller(model.hitPointsDice) +
              model.abilityModifiers.constitution)
        return hitPoints
      }

      if (playerHitDiceRollType === 'average') {
        hitPoints =
          hitPoints +
          (model.level - 1) *
            (diceRoller.averageRoller(model.hitPointsDice) +
              model.abilityModifiers.constitution)
        return hitPoints
      }
      if (playerHitDiceRollType === 'max') {
        hitPoints =
          hitPoints +
          (model.level - 1) *
            (diceRoller.maxRoller(model.hitPointsDice) +
              model.abilityModifiers.constitution)
        return hitPoints
      }
      if (playerHitDiceRollType === 'random') {
        hitPoints =
          hitPoints +
          (model.level - 1) *
            (diceRoller.randomRoller(model.hitPointsDice) +
              model.abilityModifiers.constitution)
        return hitPoints
      }
    } else {
      return hitPoints
    }
  } catch (error) {
    console.log(error)
  }
}

function initiativeModifierCalculator(model) {
  try {
    return model.abilityModifiers.dexterity
  } catch (error) {
    console.log(error)
  }
}

function sensesCalculator(model) {
  try {
    return {
      passivePerception: 10 + model.abilityModifiers.wisdom,
      passiveInvestigation: 10 + model.abilityModifiers.intelligence,
      passiveInsight: 10 + model.abilityModifiers.wisdom
    }
  } catch (error) {
    console.log(error)
  }
}

function skillsCalculator(model) {
  try {
    const profBonus = model.proficiencyBonus
    var skillsObj = {
      acrobatics: model.abilityScores.dexterity,
      animalHandling: model.abilityScores.wisdom,
      arcana: model.abilityScores.intelligence,
      athletics: model.abilityScores.strength,
      deception: model.abilityScores.charisma,
      history: model.abilityScores.intelligence,
      insight: model.abilityScores.wisdom,
      intimidation: model.abilityScores.charisma,
      investigation: model.abilityScores.intelligence,
      medicine: model.abilityScores.wisdom,
      nature: model.abilityScores.intelligence,
      perception: model.abilityScores.wisdom,
      performance: model.abilityScores.charisma,
      persuasion: model.abilityScores.charisma,
      religion: model.abilityScores.intelligence,
      sleightOfHand: model.abilityScores.dexterity,
      stealth: model.abilityScores.dexterity,
      survival: model.abilityScores.wisdom
    }

    model.skillProf.forEach(function (skill) {
      skillsObj[skill] = skillsObj[skill] + profBonus
    })

    for (const key in skillsObj) {
      skillsObj[key] = scoreToModifier(skillsObj[key])
    }

    return skillsObj
  } catch (error) {
    console.log(error)
  }
}

function armorProfCalculator(model) {
  try {
    return classes[model.className].armorProf
  } catch (error) {
    console.log(error)
  }
}

function weaponProfCalculator(model) {
  try {
    return classes[model.className].weaponProf
  } catch (error) {
    console.log(error)
  }
}

function toolProfCalculator(model) {
  try {
    return classes[model.className].toolProf
  } catch (error) {
    console.log(error)
  }
}

function savingThrowsCalculator(model) {
  try {
    return classes[model.className].savingThrows
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  abilityModifiersCalculator,
  initiativeModifierCalculator,
  armorProfCalculator,
  weaponProfCalculator,
  toolProfCalculator,
  savingThrowsCalculator,
  sensesCalculator,
  hitPointsDiceCalculator,
  hitPointsCalculator,
  proficiencyBonusCalculator,
  skillsCalculator
}
