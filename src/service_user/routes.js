'use strict'

const router = require('express').Router();
const UserController = require('./controllers/userContoller');
const auth = require('../middleware/auth');

router.post('/user', UserController.registerUser);

router.post('/login', UserController.loginUser);

module.exports = router;