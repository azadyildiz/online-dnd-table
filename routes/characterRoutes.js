const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');


router.post('/', characterController.createCharacter);
router.get('/',characterController.getAllCharacters);
router.get('/:characterId', characterController.getCharacter);
router.put('/:characterId',characterController.updateCharacter);
router.delete('/', characterController.deleteCharacter);

module.exports = router;