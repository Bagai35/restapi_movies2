// models/index.js
const sequelize = require('../config/database');
const Book = require('./book');
const Author = require('./author');
const Category = require('./category');

// Определите отношения между моделями
Book.belongsToMany(Author, { through: 'BookAuthor' });
Book.belongsToMany(Category, { through: 'BookCategory' });

Author.belongsToMany(Book, { through: 'BookAuthor' });

Category.belongsToMany(Book, { through: 'BookCategory' });

module.exports = {
  sequelize,
  Book,
  Author,
  Category,
};
