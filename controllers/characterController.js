const Character = require('../models/Character');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

const createCharacter = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {campaignId, name, race, className, skillProf, languages, abilityScores} = req.body;

        const user = await User.findById(userId);
        const campaign = await Campaign.findById(campaignId);

        // Check the campaign is valid
        if(!campaign){
            return res.status(404).json({message: 'Cannot found campaign.'});
        }

        // Get campaign starting level
        const campaignStartingLevel = campaign.settings.startingLevel;

        // Check the user is valid
        if (!user) {
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        // Check the user is connected to campaign
        if(!campaign.players.includes(userId)){
            return res.status(401).json({message: "Player is not connected to this Campaign."});
        }

        // Create character document
        const character = await Character.create({campaign: campaignId, player: userId, name, race, className, skillProf, languages,level: campaignStartingLevel, abilityScores});

        // Wait for virtual character hitPoints
        const hitPoints = await character.hitPoints;

        // push the created character to campaign
        campaign.characters.push(character._id);

        // save campaign
        await campaign.save();

        // Send response. message, character and character's virtual document
        res.status(201).json({
            message: 'Character created.',
            _id: character._id,
            campaign: character.campaign,
            player: character.player,
            name: character.name,
            race: character.race,
            className: character.className,
            level: character.level,
            abilityScores: character.abilityScores,
            skillProf: character.skillProf,
            languages: character.languages,
            createdAt: character.createdAt,
            updatedAt: character.updatedAt,

            abilityModifiers: character.abilityModifiers,
            proficiencyBonus: character.proficiencyBonus,
            hitPointsDice: character.hitPointsDice,
            hitPoints: hitPoints,
            initiativeModifier: character.initiativeModifier,
            senses: character.senses,
            skills: character.skills,
            armorProf: character.armorProf,
            weaponProf: character.weaponProf,
            toolProf: character.toolProf,
            savingThrows: character.savingThrows
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateCharacter = async (req, res) => {
    try {
        const userId = req.user.userId;
        const characterId = req.params.characterId;
        const {campaignId, name, race, className, skillProf, languages, level, abilityScores} = req.body;

        const user = await User.findById(userId.toString());
        const campaign = await Campaign.findById(campaignId);
        const character = await Character.findById(characterId);

        // Check the user is valid
        if (!user) {
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        // Check the campaign is valid
        if(!campaign) {
            return res.status(401).json({message: 'Invalid campaign. Cannot found this campaign.'});
        }

        // Check the user is dm. Only dm can use this api to update character.
        if(campaign.dm.toString() !== userId){
            return res.status(401).json({message: "You cannot update this character. You are not DM."});
        }

        // Check if the dm has changed character's level
        var _level = 0;
        if(!level){
            _level = character.level;
        }
        else{
            _level = level;
        }

        // Update character
        character.set({campaign: campaignId, player: userId, name, race, className, skillProf, languages,level: _level, abilityScores});

        // Save character
        await character.save();

        // Wait for virtual character hitPoints
        const hitPoints = await character.hitPoints;

        // Send response. message, character and character's virtual document
        res.status(200).json({
            message: 'Character updated.',
            _id: character._id,
            campaign: character.campaign,
            player: character.player,
            name: character.name,
            race: character.race,
            className: character.className,
            level: character.level,
            abilityScores: character.abilityScores,
            skillProf: character.skillProf,
            languages: character.languages,
            createdAt: character.createdAt,
            updatedAt: character.updatedAt,

            abilityModifiers: character.abilityModifiers,
            proficiencyBonus: character.proficiencyBonus,
            hitPointsDice: character.hitPointsDice,
            hitPoints: hitPoints,
            initiativeModifier: character.initiativeModifier,
            senses: character.senses,
            skills: character.skills,
            armorProf: character.armorProf,
            weaponProf: character.weaponProf,
            toolProf: character.toolProf,
            savingThrows: character.savingThrows
        });

    } catch (error) {
        res.status(500).json({error: error.message});
    }

}

const getCharacter = async (req, res) => {
    try {
        const userId = req.user.userId;
        const characterId = req.params.characterId;
        const campaignId = req.query.campaignId;

        const character = await Character.findById(characterId);
        const user = await User.findById(userId);
        const campaign = await Campaign.findById(campaignId);

        // Check the user is valid
        if(!user){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        // Check the campaign is valid
        if(!campaign){
            return res.status(401).json({message: 'Invalid request. Cannot found this campaign.'});
        }

        // Check the character is valid
        if(!character){
            return res.status(401).json({message: 'Invalid request. Cannot found this character.'});
        }

        // Check if user is campaign's player or dm
        if(!(campaign.players.includes(user._id) || campaign.dm.toString() === user._id.toString())){
            return res.status(401).json({message: 'This user is not in this campaign.'});
        }

        // Check if character is campaign's character
        if(!campaign.characters.includes(character._id)){
            return res.status(401).json({message: 'This character is not in this campaign.'});
        }

        // Wait for virtual character hitPoints
        const hitPoints = await character.hitPoints;

        // Send response. character and character's virtual document
        res.status(200).json({
            _id: character._id,
            campaign: character.campaign,
            player: character.player,
            name: character.name,
            race: character.race,
            className: character.className,
            level: character.level,
            abilityScores: character.abilityScores,
            skillProf: character.skillProf,
            languages: character.languages,
            createdAt: character.createdAt,
            updatedAt: character.updatedAt,
            
            abilityModifiers: character.abilityModifiers,
            proficiencyBonus: character.proficiencyBonus,
            hitPointsDice: character.hitPointsDice,
            hitPoints: hitPoints,
            initiativeModifier: character.initiativeModifier,
            senses: character.senses,
            skills: character.skills,
            armorProf: character.armorProf,
            weaponProf: character.weaponProf,
            toolProf: character.toolProf,
            savingThrows: character.savingThrows
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getAllCharacters = async (req, res) => {
    try {
        const userId = req.user.userId;
        const campaignId = req.query.campaignId;

        const user = await User.findById(userId);
        const campaign = await Campaign.findById(campaignId);

        // Check the user is valid
        if(!user){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        // Check the campaign is valid
        if(!campaign){
            return res.status(401).json({message: 'Invalid request. Cannot found this campaign.'});
        }

        // Check if user is campaign's player or dm
        if(!(campaign.players.includes(user._id) || campaign.dm.toString() === user._id.toString())){
            return res.status(401).json({message: 'This user is not in this campaign.'});
        }

        // Create an empty array
        var characters = {};

        // Get character in the campaign's characters' array
        for (const el of campaign.characters) {
            // Get character from database
            var character = await Character.findById(el.toString());
            // Wait for virtual character hitPoints
            const hitPoints = await character.hitPoints;

            var characterObj = {
                _id: character._id,
                campaign: character.campaign,
                player: character.player,
                name: character.name,
                race: character.race,
                className: character.className,
                level: character.level,
                abilityScores: character.abilityScores,
                skillProf: character.skillProf,
                languages: character.languages,
                createdAt: character.createdAt,
                updatedAt: character.updatedAt,

                abilityModifiers: character.abilityModifiers,
                proficiencyBonus: character.proficiencyBonus,
                hitPointsDice: character.hitPointsDice,
                hitPoints: hitPoints,
                initiativeModifier: character.initiativeModifier,
                senses: character.senses,
                skills: character.skills,
                armorProf: character.armorProf,
                weaponProf: character.weaponProf,
                toolProf: character.toolProf,
                savingThrows: character.savingThrows
            };
            characters[character._id] = characterObj;
        }

        res.status(200).json({ message: 'All characters in this campaign have been pushed.', characters });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteCharacter = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {campaignId, characterId} = req.body;

        const user = await User.findById(userId.toString());
        const campaign = await Campaign.findById(campaignId);
        const character = await Character.findById(characterId);


        // Check if the user is valid
        if (!user) {
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        // Check if the campaign is valid
        if(!campaign) {
            return res.status(401).json({message: 'Invalid campaign. Cannot found this campaign.'});
        }

        // Check if the character is valid
        if (!character) {
            return res.status(404).json({ message: 'Character not found.' });
        }

        // Check the user is dm. Only dm can use this api to delete character.
        if(campaign.dm.toString() !== userId){
            return res.status(401).json({message: "You cannot update this character. You are not DM."});
        }

        // Delete the character
        await character.deleteOne();

        // Send response. message
        res.status(200).json({ message: 'Character deleted successfully.' });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createCharacter,
    updateCharacter,
    getCharacter,
    getAllCharacters,
    deleteCharacter
}