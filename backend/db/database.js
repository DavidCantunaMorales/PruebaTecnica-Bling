const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db');

// Creación de la Tabla Users
db.run(`
       CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT UNIQUE NOT NULL,
         phone TEXT NOT NULL
       )
     `);

module.exports = db;