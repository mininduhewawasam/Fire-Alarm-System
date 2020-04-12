'use strict'

const router = require('express').Router();
const SensorController = require('./controllers/sensorController');
const auth = require('../middleware/auth');

router.post('/sensor-data',
SensorController.create
);

module.exports = router;