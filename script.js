const fs = require('fs');
const { Op } = require('sequelize');
const sequelize = require('./config/database');
const Book = require('./models/book');
const Author = require('./models/author');

// Чтение данных из JSON-файла
const jsonData = require('./amazon.books.json');

// Синхронизация моделей с базой данных
sequelize.sync({ force: true }).then(async () => {
  // Заполнение таблиц данными из JSON-файла
  for (const data of jsonData) {
    const book = await Book.create({
      title: data.title,
      isbn: data.isbn,
      pageCount: data.pageCount,
      publishedDate: new Date(data.publishedDate.$date),
      thumbnailUrl: data.thumbnailUrl,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      status: data.status,
      categories: data.categories,
    });

    for (const authorName of data.authors) {
      let [author] = await Author.findOrCreate({
        where: {
          name: authorName,
        },
      });

      await book.addAuthor(author);
    }
  }

  console.log('Данные успешно добавлены в базу данных');
}).catch((err) => {
  console.error('Ошибка синхронизации моделей:', err);
});
