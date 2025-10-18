const Database = require('better-sqlite3');
const db = new Database('cutnow.db');
module.exports = db;