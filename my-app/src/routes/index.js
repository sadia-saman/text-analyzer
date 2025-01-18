const express = require('express');
const router = express.Router();
const TextController = require('../controllers/TextController');

router.post('/texts', TextController.createText);
router.get('/texts/:id', TextController.getText);
router.put('/texts/:id', TextController.updateText);
router.delete('/texts/:id', TextController.deleteText);
router.get('/texts', TextController.getAllTexts);

module.exports = router;
