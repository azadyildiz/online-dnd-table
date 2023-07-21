const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/', campaignController.createCampaign);
router.post('/join',campaignController.joinCampaign);
router.delete('/', campaignController.deleteCampaign);
router.put('/:campaignId',campaignController.updateCampaign);

module.exports = router;