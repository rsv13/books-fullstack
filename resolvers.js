// Bring in the database connection we set up in db.js.
import db from "./db.js";

export const resolvers = {
  Query: {
    // Return all books from the database.
    books: () => {
      return db.prepare("SELECT * FROM books").all();
    },

    // Return one book by id.
    book: (_, args) => {
      return db.prepare("SELECT * FROM books WHERE id = ?").get(args.id);
    },
  },

  Mutation: {
    // Insert a new book, then return the one we just created.
    addBook: (_, args) => {
      const result = db
        .prepare("INSERT INTO books (title, author) VALUES (?, ?)")
        .run(args.title, args.author);

      // result.lastInsertRowid is the id the database gave the new row.
      return db
        .prepare("SELECT * FROM books WHERE id = ?")
        .get(result.lastInsertRowid);
    },

    // Delete a book by id. We fetch it first so we can return it.
    deleteBook: (_, args) => {
      const book = db.prepare("SELECT * FROM books WHERE id = ?").get(args.id);
      db.prepare("DELETE FROM books WHERE id = ?").run(args.id);
      return book;
    },
  },
};