const db = require('./config/database')

let Author = require('./models/author')
let Book = require('./models/book')

db.sync({
    force: true
})