'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('SensorData', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('SensorData', 'deletedAt', {
        type: Sequelize.DATE
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('SensorData', 'updatedAt'),
      queryInterface.removeColumn('SensorData', 'deletedAt')
    ]);
  }
};
