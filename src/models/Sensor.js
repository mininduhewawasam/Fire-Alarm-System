'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define(
        'Sensor',
        {
            status: DataTypes.INTEGER,
            roomId: DataTypes.INTEGER,
            ownerId: DataTypes.INTEGER,
            locationId: DataTypes.INTEGER,
            floorId: DataTypes.INTEGER,
        },
        {
            paranoid: true,
        }
    );
    Sensor.associate = function (models) {
        Sensor.hasMany(models.SensorData, { foreignKey: 'sensorId' });
        Sensor.belongsTo(models.Room, { foreignKey: 'roomId' });
        Sensor.belongsTo(models.User, { foreignKey: 'ownerId' });
        Sensor.belongsTo(models.Location, { foreignKey: 'locationId' });
        Sensor.belongsTo(models.Floor, { foreignKey: 'floorId' });
      };
    return Sensor;
};