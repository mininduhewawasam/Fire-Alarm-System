'use strict'

const router = require('express').Router();
const LocationrController = require('./controllers/locationController');
const auth = require('../middleware/auth');

router.post('/location',
[auth],
 LocationrController.createLocation);

router.post('/floor',
[auth],
LocationrController.createFloor);

router.post('/room',
[auth],
LocationrController.createRoom);

router.get('/floor/:locationId',
LocationrController.getFloorsByLocationId);

router.get('/room/:locationId/:floorId',
LocationrController.getRoomsByLocationIdAndFloorId);

router.get('/floor',
LocationrController.getAllFloors);

router.get('/location',
LocationrController.getAllLocations);

module.exports = router;