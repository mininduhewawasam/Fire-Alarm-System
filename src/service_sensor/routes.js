'use strict'

const router = require('express').Router();
const SensorController = require('./controllers/sensorController');
const auth = require('../middleware/auth');

router.post('/sensor-data',
SensorController.createSensorData
);

router.post('/sensor',
[auth],
SensorController.createNewSensor
);

router.get('/sensor',
SensorController.getAllSensors
);

module.exports = router;