// seed.js
const fs = require('fs');
const { sequelize, Book, Author, Category } = require('./models');

const data = JSON.parse(fs.readFileSync('amazon.books.json', 'utf8'));

sequelize.sync({ force: true }).then(async () => {
    try {
        const uniqueAuthors = [...new Set(data.flatMap((book) => book.authors))];
        await Author.bulkCreate(uniqueAuthors.map((author) => ({ name: author })));

        const uniqueCategories = [...new Set(data.flatMap((book) => book.categories))];
        await Category.bulkCreate(uniqueCategories.map((category) => ({ name: category })));

        data.forEach(async (bookData) => {
            const book = await Book.create(bookData);

            const bookAuthors = await Author.findAll({
                where: { name: bookData.authors },
            });
            await book.addAuthors(bookAuthors);

            const bookCategories = await Category.findAll({
                where: { name: bookData.categories },
            });
            await book.addCategories(bookCategories);
        });

        const authors = await Author.findAll();
        const categories = await Category.findAll();

        data.forEach(async (bookData) => {
            // Преобразуем publishedDate в формат DATETIME
            const formattedDate = moment(bookData.publishedDate['$date']).format('YYYY-MM-DD HH:mm:ss');
            bookData.publishedDate = formattedDate;
          
            const book = await Book.create(bookData);
            await book.addAuthors(authors.filter((author) => bookData.authors.includes(author.name)));
            await book.addCategories(categories.filter((category) => bookData.categories.includes(category.name)));
          });
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
});
