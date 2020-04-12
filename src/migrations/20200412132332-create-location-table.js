'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Locations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
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
        address: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false
        },
        noOfFloors: {
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
    return queryInterface.dropTable('Locations');
  }
};
