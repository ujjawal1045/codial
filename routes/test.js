const express = require('express');

const router = express.Router();

const testController = require('../controllers/testing_controller');
console.log('testing route loaded successfully');

router.get('/testing', testController.tester);

module.exports = router;
