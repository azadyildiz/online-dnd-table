const mongoose = require('mongoose');

const characterVirtualCalculators = require('../middlewares/characterVirtualCalculators');

const characterSchema = new mongoose.Schema({
    campaign: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },
    player: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { 
        type: String,
        required: true,
        trim: true
    },
    image: { 
        type: String,
        trim: true
    },
    race: { 
        type: String,
        required: true,
        trim: true
    },
    className: { 
        type: String,
        required: true,
        trim: true
    },
    skillProf: { 
        type: [String]
    },
    languages: { 
        type: [String]
    },
    level: { 
        type: Number,
        required: true,
        default: 1
    },
    abilityScores: { 
        strength: {
            type: Number,
            required: true
        },
        dexterity: {
            type: Number,
            required: true
        },
        constitution: {
            type: Number,
            required: true
        },
        intelligence: {
            type: Number,
            required: true
        },
        wisdom: {
            type: Number,
            required: true
        },
        charisma: {
            type: Number,
            required: true
        }
    },
}, {
    timestamps: true
});

// auto-generated data

characterSchema.virtual('abilityModifiers').get(function() {
    return characterVirtualCalculators.abilityModifiersCalculator(this);
});

characterSchema.virtual('proficiencyBonus').get(function() {
    return characterVirtualCalculators.proficiencyBonusCalculator(this);
})

characterSchema.virtual('hitPointsDice').get(function() {
    return characterVirtualCalculators.hitPointsDiceCalculator(this);
})

characterSchema.virtual('hitPoints').get(async function() {
    return await characterVirtualCalculators.hitPointsCalculator(this);
});

characterSchema.virtual('initiativeModifier').get(function() {
    return characterVirtualCalculators.initiativeModifierCalculator(this);
});

characterSchema.virtual('senses').get(function() {
    return characterVirtualCalculators.sensesCalculator(this);
})

characterSchema.virtual('skills').get(function() {
    return characterVirtualCalculators.skillsCalculator(this);
})

characterSchema.virtual('armorProf').get(function() {
    return characterVirtualCalculators.armorProfCalculator(this);
});

characterSchema.virtual('weaponProf').get(function() {
    return characterVirtualCalculators.weaponProfCalculator(this);
});

characterSchema.virtual('toolProf').get(function() {
    return characterVirtualCalculators.toolProfCalculator(this);
});

characterSchema.virtual('savingThrows').get(function() {
    return characterVirtualCalculators.savingThrowsCalculator(this);
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;