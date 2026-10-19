import Database from "better-sqlite3";

// Open (or create) a database file called books.db in this folder.
// Everything is stored in that one file, so data survives restarts.
const db = new Database("books.db");

// Make sure the books table exists. "IF NOT EXISTS" means this is safe
// to run every time the server starts — it only creates it the first time.
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
  )
`);

// Make this database available to other files (like resolvers.js).
export default db;