'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Sensors', 'co2Level'),
      queryInterface.removeColumn('Sensors', 'smokeLevel')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Sensors', 'co2Level', {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      }),
      queryInterface.addColumn('Sensors', 'smokeLevel', {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      })
    ]);
  }
};
