// models/book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING, // Можете сделать тип STRING, необязательным
  },
  pageCount: DataTypes.INTEGER,
  publishedDate: DataTypes.DATE,
  thumbnailUrl: DataTypes.STRING,
  shortDescription: DataTypes.TEXT,
  longDescription: DataTypes.TEXT,
  status: DataTypes.STRING,
});

module.exports = Book;
