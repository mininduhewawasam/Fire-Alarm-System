'use strict';
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        'Location',
        {
            ownerId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            noOfFloors: DataTypes.INTEGER,
        },
        { paranoid: true }
    );
    Location.associate = function (models) {
      Location.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
    };
    return Location;
};