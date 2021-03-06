'use strict'

const Location = require('../../models').Location;
const User = require('../../models').User;
const Floor = require('../../models').Floor;
const Room = require('../../models').Room;
const Sensor = require('../../models').Sensor;
const SensorData = require('../../models').SensorData;
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

    async getAllSensors(args) {
        try {
            const locations = await this._getAllSensors(args);
            return locations;       
        } catch (e) {
            logger.error('LocationService.getAllSensors ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async updateSensor(sensorData) {
        try {
            const sensor = await this._getSensorById (sensorData.sensorId);
            if (sensor) {
                const updatedSensor = await this._updateSensor(sensorData);
                if (updatedSensor) {
                    return updatedSensor;
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
        } catch (e) {
            logger.error('LocationService.updateSensor ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async deleteSensor(sensorData) {
        try {
            const sensor = await this._getSensorById (sensorData.sensorId);
            if (sensor) {
                const deletedSensor = await this._deleteSensor(sensorData);
                if (deletedSensor) {
                    return deletedSensor;
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
        } catch (e) {
            logger.error('LocationService.deleteSensor ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async _getAllSensors (args) {
        const options = {
            order: [['id', 'DESC']]
        };
        const whereUserObj = {}
        const whereObj = {};
        if (args.sensorID) {
            whereObj.sensorId = args.sensorId;
        }
        if (args.userId) {
            whereUserObj.ownerId = args.userId;
        }
        if (whereObj) {
            options.where = whereObj;
        }
        options.include = [
            {
                model: SensorData,
                attributes: ['id', 'sensorId', 'co2Level', 'smokeLevel'],
                order: [['id', 'DESC']],
                limit: 1
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber']
            },
            {
                model: Room,
                attributes: ['id', 'name', 'roomNo', 'noOfSensors'],
            },
            {
                model: Floor,
                attributes: ['id', 'name', 'floorNo', 'noOfRooms'],
            },
            {
                model: Location,
                attributes: ['id', 'name', 'address', 'noOfFloors'],
                where: whereUserObj,
            }
        ]
        const sensor = await Sensor.findAll(options);
        return { sensor }
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

    async _updateSensor (data) {   
        const sensor = await Sensor.update(
            {
                roomId: data.roomId,
                ownerId: data.ownerId,
                locationId: data.locationId,
                floorId: data.floorId,
                name: data.name
           },
           { where: { id: data.sensorId }}
           );
        return sensor;
    }

    async _deleteSensor (data) {
        const sensor = await Sensor.destroy(
           { where: { id: data.sensorId }}
           );
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

    async createSensorDataForAllSensors () {
        const sensors = await this._getAllSensorsllSensors();
        for (let i = 0; i < sensors.length; i++) {
            sensors[i].co2Level = Math.floor(Math.random() * 10) + 1;
            sensors[i].smokeLevel = Math.floor(Math.random() * 10) + 1;
        }
        return await SensorData.bulkCreate(
            sensors
        );
    }
     async _getAllSensorsllSensors () {
         const sensor = await Sensor.findAll({
             raw: true,
             nest: true,
             attributes: [['id', 'sensorId']]
         });
         return sensor;
     }

}

module.exports = SensorService;