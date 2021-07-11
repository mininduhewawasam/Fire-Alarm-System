'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false,
          unique: true
        },
        phoneNumber: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
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
      .then(() => {
      queryInterface.addIndex('Users', ['email']);
      });
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
