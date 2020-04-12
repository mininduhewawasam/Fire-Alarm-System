'use strict';
module.exports = (sequelize, DataTypes) => {
    const SensorData = sequelize.define(
        'SensorData',
        {
            sensorId: DataTypes.INTEGER,
            co2Level: DataTypes.INTEGER,
            smokeLevel: DataTypes.INTEGER
        },
        {
            paranoid: true,
        }
    )
    return SensorData;
};