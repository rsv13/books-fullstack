// startStandaloneServer is the quickest way to run a GraphQL API - no Express needed.

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import express from "express";
import { expressMiddleware } from "@as-integrations/express5";

const app = express();
const PORT = 4000;


// Build the server from our schema (the contract) and resolvers (the logic).
const server = new ApolloServer({typeDefs, resolvers});


// Apollo must be started before it can be attached to Express.
await server.start();

// The GraphQL API lives at /graphql.
app.use("/graphql", express.json(), expressMiddleware(server));

//Serve the front-end from publick folder.
app.use(express.static("public"));


// Start it listening on port 4000. This returns URL once it's up.
app.listen(PORT, () => {
    console.log(`Server is ready at http://localhost:${PORT}`);
})
