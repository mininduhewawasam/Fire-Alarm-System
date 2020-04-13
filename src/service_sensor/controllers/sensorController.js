'use strict';
const Joi = require('joi');
const SensorService = require('../services/sensorService');
const Enums = require('../../base_classes/Enums');

//create sensor data
module.exports.createNewSensor = async function (req, res) {
    const { error } = _validatecreateNewSensor(req.body);
    if (!error) {
        const SensorServiceInstance = new SensorService();
        const sensor = await SensorServiceInstance.createNewSensor(req.body);
        switch (sensor) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Location not found'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: sensor });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

module.exports.createSensorData = async function (req, res) {
    const { error } = _validatecreateSensorData(req.body);
    if (!error) {
        const SensorServiceInstance = new SensorService();
        const sensor = await SensorServiceInstance.createSensorData(req.body);
        switch (sensor) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Location not found'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: sensor });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};
    
function _validatecreateNewSensor(sensor) {
    const schema = {
        roomId: Joi.number().required(),
        modifiedBy: Joi.allow()
    };
    return Joi.validate(sensor, schema);
}

function _validatecreateSensorData(sensor) {
    const schema = {
        sensorId: Joi.number().required(),
        co2Level: Joi.number().required().min(0).max(10),
        smokeLevel: Joi.number().required().min(0).max(10),
        modifiedBy: Joi.allow()
    };
    return Joi.validate(sensor, schema);
}
