'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define(
        'Sensor',
        {
            status: DataTypes.INTEGER,
            roomId: DataTypes.INTEGER
        },
        {
            paranoid: true,
        }
    )
    return Sensor;
};