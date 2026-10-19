// The schema is contract: it declares every type and operation the API allows

export const typeDefs = `#graphql
    # The shape of a single book.
    type Book {
        id: ID!
        title: String!
        author: String!
        }
        
        
        
    # Read operation - things that fetch data without changing anything.
    type Query {
        books: [Book!]!            # returns list of all books
        book(id: ID!): Book         # return one book by its ID (or null if not found)
    }

    #Write Operations - things that change data. This whole type is new vs a read-only API.
    type Mutation {
        addBook(title: String!, author: String!): Book!
        deleteBook(id: ID!): Book
    }`;