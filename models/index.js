const sequelize = require('../sequelize');
const Book = require('./book');
const Author = require('./author');

module.exports = {
    sequelize,
    Book,
    Author,
  };