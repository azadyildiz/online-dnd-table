const classes = {
    artificer: {
        hitDice: '1d8',
        armorProf: ['light armor', 'medium armor', 'shields'],
        weaponProf: ['simple weapons', 'firearms'],
        toolProf: ['thieves tools', 'tinkers tools', 'artisans tools'],
        savingThrows: ['constitution', 'intelligence'],
        skillProf: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleight of hand'],
        skillProfCount: 2
    },
    barbarian: {
        hitDice: '1d12',
        armorProf: ['light armor', 'medium armor', 'shields'],
        weaponProf: ['simple weapons', 'martial weapons'],
        toolProf: [],
        savingThrows: ['strength', 'constitution'],
        skillProf: ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
        skillProfCount: 2
    },
    cleric: {
        hitDice: '1d8',
        armorProf: ['light armor', 'medium armor', 'shields'],
        weaponProf: ['simple weapons'],
        toolProf: [],
        savingThrows: ['wisdom', 'charisma'],
        skillProf: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
        skillProfCount: 2
    },
    druid: {
        hitDice: '1d8',
        armorProf: ['light armor', 'medium armor', 'shields'],
        weaponProf: ['clubs', 'daggers', 'darts', 'javelins', 'maces', 'quarterstaffs', 'scimitars', 'sickles', 'slings', 'spears'],
        toolProf: ['herbalism kit'],
        savingThrows: ['intelligence', 'wisdom'],
        skillProf: ['arcana', 'animal handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
        skillProfCount: 2
    },
    fighter: {
        hitDice: '1d10',
        armorProf: ['light armor', 'medium armor', 'heavy armor', 'shields'],
        weaponProf: ['simple weapons', 'martial weapons'],
        toolProf: [],
        savingThrows: ['strength', 'constitution'],
        skillProf: ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
        skillProfCount: 2
    },
    monk: {
        hitDice: '1d8',
        armorProf: [],
        weaponProf: ['simple weapons', 'shortswords'],
        toolProf: ['artisans tools', 'musicial instrument'],
        savingThrows: ['strength', 'dexterity'],
        skillProf: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
        skillProfCount: 2
    },
    paladin: {
        hitDice: '1d10',
        armorProf: ['light armor', 'medium armor', 'heavy armor', 'shields'],
        weaponProf: ['simple weapons', 'martial weapons'],
        toolProf: [],
        savingThrows: ['wisdom', 'charisma'],
        skillProf: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
        skillProfCount: 2
    },
    ranger: {
        hitDice: '1d10',
        armorProf: ['light armor', 'medium armor', 'shields'],
        weaponProf: ['simple weapons', 'martial weapons'],
        toolProf: [],
        savingThrows: ['strength', 'dexterity'],
        skillProf: ['animal handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
        skillProfCount: 3
    },
    rogue: {
        hitDice: '1d8',
        armorProf: ['light armor'],
        weaponProf: ['simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
        toolProf: ['thieves tools'],
        savingThrows: ['dexterity', 'intelligence'],
        skillProf: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight of hand', 'stealth'],
        skillProfCount: 4
    },
    sorcerer: {
        hitDice: '1d6',
        armorProf: [],
        weaponProf: ['daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
        toolProf: [],
        savingThrows: ['constitution', 'charisma'],
        skillProf: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
        skillProfCount: 2
    },
    warlock: {
        hitDice: '1d8',
        armorProf: ['light armor'],
        weaponProf: ['simple weapons'],
        toolProf: [],
        savingThrows: ['wisdom', 'charisma'],
        skillProf: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature','religion'],
        skillProfCount: 2
    },
    wizard: {
        hitDice: '1d6',
        armorProf: [],
        weaponProf: ['daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
        toolProf: [],
        savingThrows: ['intelligence', 'wisdom'],
        skillProf: ['arcana', 'history', 'insight', 'investigation', 'medicine','religion'],
        skillProfCount: 2
    },
}

module.exports = classes;