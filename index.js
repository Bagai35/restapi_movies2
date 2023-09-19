const db = require('./config/database')

let Author = require('./models/author')
let  = require('./models/category')

db.sync({
    force: true
})