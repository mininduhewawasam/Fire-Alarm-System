'use strict'

const Location = require('../../models').Location;
const User = require('../../models').User;
const Floor = require('../../models').Floor;
const Room = require('../../models').Room;
const Sensor = require('../../models').Sensor;
const SensorData = require('../../models').SensorData
const { logger } = require('../../bootstrap/logger');
const Enums = require('../../base_classes/Enums');

class SensorService {
    async createNewSensor(sensorData) {
        try {
            const room = await this._getRoomById (sensorData.roomId);
            if (room) {
                sensorData.status = 0;
                const sensor = await this._createSensor(sensorData);
                if (sensor) {
                    return sensor;
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
        } catch (e) {
            logger.error('LocationService.createNewSensor ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async createSensorData(sensorData) {
        try {
            console.log(sensorData);
            const sensor = await this._getSensorById (sensorData.sensorId);
            if (sensor) {
                const sensorsData = await this._createSensorData(sensorData);
                if (sensorsData) {
                    return sensorsData;
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
        } catch (e) {
            logger.error('LocationService.createSensorData ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async _getRoomById(roomId) {
        const room = Room.findOne({
            where: { id: roomId }
        });
        return room;
    }

    async _createSensor (sendorData) {
        const sensor = await Sensor.create(sendorData)
        return sensor;
    }

    async _getSensorById(sensorId) {
        const sensor = Sensor.findOne({
            where: { id: sensorId }
        });
        return sensor;
    }

    async _createSensorData (sendorData) {
        const sensorData = await SensorData.create(sendorData)
        return sensorData;
    }

}

module.exports = SensorService;