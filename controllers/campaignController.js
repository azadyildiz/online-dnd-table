const Campaign = require('../models/Campaign');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const createCampaign = async (req, res) => {
    try {
        const {name, password} = req.body;
        const dmId = req.user.userId;

        const dm = await User.findById(dmId);

        if(!dm){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        if(password.length < 6){
            return res.status(422).json({error: 'Password length must be at least 6.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const campaign = await Campaign.create({name, password: hashedPassword, dm: dmId});

        res.status(201).json({ message: 'Campaign created.',campaign: campaign });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const joinCampaign = async (req, res) => {
    try {
        const {campaignId, password} = req.body;
        const userId = req.user.userId;

        const campaign = await Campaign.findById(campaignId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

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

        res.status(200).json({ message: 'User joined the campaign.',campaign: campaign });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteCampaign = async (req, res) => {
    try {
        const {campaignId, password} = req.body;
        const userId = req.user.userId;

        const campaign = await Campaign.findById(campaignId);

        if(!campaign){
            return res.status(404).json({message: 'Cannot found campaign.'});
        }


        if(campaign.dm.toString() !== userId){
            return res.status(401).json({message: "You cannot delete this campaign. You are not DM."});
        }

        const isPasswordValid = await bcrypt.compare(password, campaign.password);

        if(!isPasswordValid){
            return res.status(401).json({message: 'Wrong password.'});
        }

        await campaign.deleteOne();

        res.status(200).json({ message: 'Campaign deleted successfully.' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateCampaign = async (req, res) => {
    try {
        const campaignId = req.params.campaignId;
        const updateData = req.body;
        const userId = req.user.userId;

        const campaign = await Campaign.findById(campaignId);

        if(!campaign){
            return res.status(404).json({message: 'Cannot found campaign.'});
        }

        if(campaign.dm.toString() !== userId){
            return res.status(401).json({message: "You cannot updated this campaign. You are not DM."});
        }

        campaign.set(updateData);
        await campaign.save();

        return res.status(200).json({ message: 'Campaign updated.',campaign: campaign });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createCampaign,
    joinCampaign,
    deleteCampaign,
    updateCampaign
};