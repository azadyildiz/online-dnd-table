const Campaign = require('../models/Campaign');
const bcrypt = require('bcrypt');

const createCampaign = async (req, res) => {
    try {
        const {name, password} = req.body;
        const dm = req.user.userId;

        if(password.length < 6){
            return res.status(422).json({error: 'Password length must be at least 6.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const campaign = await Campaign.create({name, password: hashedPassword, dm});

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const joinCampaign = async (req, res) => {
    try {
        const {campaignId, password} = req.body;
        const userId = req.user.userId;

        const campaign = await Campaign.findById(campaignId);

        if(!campaign){
            return res.status(404).json({message: 'Cannot found campaign.'});
        }

        if(campaign.players.includes(userId)){
            return res.status(409).json({message: "Already joined."});
        }

        if(campaign.dm.toString() === userId){
            return res.status(409).json({message: "DM cannot be a player."});
        }

        const isPasswordValid = await bcrypt.compare(password, campaign.password);

        if(!isPasswordValid){
            return res.status(401).json({message: 'Wrong password.'});
        }

        campaign.players.push(userId);
        await campaign.save();

        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createCampaign,
    joinCampaign
};