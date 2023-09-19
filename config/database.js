const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('books', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;