const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pageCount: {
    type: DataTypes.INTEGER,
  },
  publishedDate: {
    type: DataTypes.DATE,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
  },
  shortDescription: {
    type: DataTypes.TEXT,
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
  },
  categories: {
    type: DataTypes.JSON,
  },
});

module.exports = Book;