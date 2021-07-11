'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
    .createTable('SensorData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sensors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      co2Level: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      smokeLevel: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SensorData');
  }
};
