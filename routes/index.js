const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded successfully');

router.get('/', homeController.home); 

// for any further routes access from here
// router.use('/routerName', require('./routerprofile'));
router.use('/users', require('./users'));
router.use('/test', require('./test'));
router.use('/post', require('./post'));
router.use('/comments',require('./comments'));
router.use('/likes', require('./likes'));
router.use('/api',require('./api'));







module.exports = router;
