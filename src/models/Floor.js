'use strict';
module.exports = (sequelize, DataTypes) => {
    const Floor = sequelize.define(
        'Floor',
        {
            locationId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            floorNo: DataTypes.INTEGER,
            noOfRooms: DataTypes.INTEGER,
        },
        {
            paranoid: true,
        }
    );
    Floor.associate = function (models) {
        Floor.belongsTo(models.Location, { foreignKey: 'locationId' });
      };
    return Floor;
};