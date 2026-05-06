const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../parking.db'), (err) => {
    if (err) console.error('Error al conectar a la base de datos', err);
    else console.log('✅ Base de datos SQLite conectada.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        plate TEXT UNIQUE,
        entryTime TEXT,
        paymentMethod TEXT
    )`);
});

module.exports = db;