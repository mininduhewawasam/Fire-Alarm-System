'use strict'

const router = require('express').Router();
const LocationrController = require('./controllers/locationController');
const auth = require('../middleware/auth');

router.post('/location',
[auth],
 LocationrController.createLocation);

router.post('/floor',
[auth],
LocationrController.createFloor)

router.get('/floor/:locationId',
LocationrController.getFloorsByLocationId);

router.get('/floor',
LocationrController.getAllFloors);

router.get('/location',
LocationrController.getAllLocations);


module.exports = router;