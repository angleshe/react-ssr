'use strict';

module.exports = {
  development: {
    username: 'root',
    password: 'anqishe',
    database: 'dev_blog',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+08:00'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'dev_blog',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+08:00'
  }
};
