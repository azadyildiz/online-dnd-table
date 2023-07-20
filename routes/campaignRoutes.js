const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/', campaignController.createCampaign);
router.post('/join',campaignController.joinCampaign);

module.exports = router;