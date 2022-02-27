const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
console.log('user router loaded successfully:))');

router.get('/profile',passport.checkAuthentication, userController.profile);

router.get('/sign-up',userController.signUp);

router.get('/sign-in', userController.signIn);

router.post('/create',userController.create);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);
module.exports = router;
