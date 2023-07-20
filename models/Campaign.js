const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    dm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    settings: {
        startingLevel: {
            type: Number,
            required: true,
            default: 1
        },
        statRule: {
            type: String,
            required: true,
            default: 'Standart Array',
            enum: ['Standart Array', 'Point Buy', 'Manual'],
        },
        bannedClasses: {
            type: [String]
        },
        bannedRaces: {
            type: [String]
        },
        bannedFeats: {
            type: [String]
        },
        bannedSpells: {
            type: [String]
        },
        bannedSources:{
            type: [String]
        }
    }
}, {
    timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;