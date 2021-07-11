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

router.put('/sensor',
[auth],
SensorController.updateSensor
);

router.delete('/sensor',
[auth],
SensorController.deleteSensor
);

router.get('/sensor',
SensorController.getAllSensors
);

module.exports = router;