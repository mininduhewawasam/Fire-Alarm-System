const keys = require('./keys');

module. exports ={
  development: {
    username: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.database,
    host: keys.databaseHost,
    dialect: 'mysql',
  },
  test: {
    username: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.database,
    host: keys.databaseHost,
    dialect: 'mysql',
  },
  production: {
    username: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.database,
    host: keys.databaseHost,
    dialect: 'mysql',
  }
};