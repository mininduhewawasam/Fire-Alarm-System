'use strict'

const router = require('express').Router();
const LocationrController = require('./controllers/locationController');
const auth = require('../middleware/auth');

router.post('/location', LocationrController.createLocation);

router.get('/location',LocationrController.getAllLocations);

module.exports = router;