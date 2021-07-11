const cron = require('node-cron');
const { logger } = require('./../bootstrap/logger');
const Sensor = require('../service_sensor/services/sensorService.js')

module.exports.run = async function () {
    cron.schedule(' */10 * * * * * ', async () => {
        try {
            const sensor = new Sensor();
            await sensor.createSensorDataForAllSensors();
            console.log('Sensor Data Updated');
        } catch (e) {
            logger.error('updateSensorData ' + e );
        }
    });
};