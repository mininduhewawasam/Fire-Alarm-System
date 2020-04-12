'use strict';
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        'Room',
        {
            floorId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            roomNo: DataTypes.INTEGER,
            noOfSensors: DataTypes.INTEGER,
        },
        {
            paranoid: true,
        }
    )
    return Room;
};