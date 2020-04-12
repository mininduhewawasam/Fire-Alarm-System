'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define(
        'Sensor',
        {
            status: DataTypes.INTEGER,
            roomId: DataTypes.INTEGER,
            roomNo: DataTypes.INTEGER,
            co2Level: DataTypes.INTEGER,
            smokeLevel: DataTypes.INTEGER
        },
        {
            paranoid: true,
        }
    )
    return Sensor;
};