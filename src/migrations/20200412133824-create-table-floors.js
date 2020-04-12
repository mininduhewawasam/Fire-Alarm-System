'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Floors', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        locationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        floorNo: {
          type: Sequelize.INTEGER,
          required: true,
          allowNull: false
        },
        noOfRooms: {
          type: Sequelize.INTEGER,
          required: true,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Floors');
  }
};
