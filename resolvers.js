// Our "database" - just an array held in memory. Restarting the server resets it.

let books = [
    {id: "1", title: "Wings of Fire", author: "A P J Abdul Kalam"},
    {id: "2", title: "Open", author: "Andre Agassi"}
]
// Highest existing id, plus one — survives deletions because it looks at real ids, not the count.
let nextId = Math.max(...books.map((b) => Number(b.id))) + 1;

// Resolvers are the function that produce the data for each field in the schema.
// The object's shape mirrors the schema: Query fields under Query, Mutation fields under Mutation.

export const resolvers = {
    Query: {
        // Returns the whole array - list of all books
        books: () => books,

        // Find one book by id. args holds the argument the client sent.
        book: (_, args) => books.find((b) => b.id === args.id),
    },

    Mutation: {
        // Create a new book, add it to the array and return it.
        addBook: (_, args) => {
            const newBook = {
                id: String(nextId++),
                title: args.title,
                author: args.author,
            };
            books.push(newBook);
            return newBook;
        },

        // Remove a book by id, and return the one we removed (or null if not found).
        deleteBook: (_, args) => {
            const bookToDelete = books.find((b) => b.id === args.id);
            books = books.filter((b) => b.id !== args.id);
            return bookToDelete;
        },
    },
};