'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Rooms', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        floorId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Floors',
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
        roomNo: {
          type: Sequelize.INTEGER,
          required: true,
          allowNull: false
        },
        noOfSensors: {
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
    return queryInterface.dropTable('Rooms');
  }
};
