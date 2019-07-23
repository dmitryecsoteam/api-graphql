const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const schema = require('../graphql/schema');

const API_PORT = process.env.API_PORT;
const API_SERVER_HOST = process.env.API_SERVER_HOST;
const API_SERVER_CORS = process.env.API_SERVER_CORS;
const API_CONTEXT_ROOT = process.env.API_CONTEXT_ROOT;
const API_GRAPHIQL = process.env.API_GRAPHIQL;


const app = express();

// Enable cors for all origins
if (API_SERVER_CORS) {
    app.use(cors());
}


app.use(
    '/' + API_CONTEXT_ROOT,
    graphqlHTTP(request => ({
      schema,
      graphiql: API_GRAPHIQL,
      // Send token to resolvers in context
      context: { token: request.headers.authorization ? request.headers.authorization.replace('Bearer ', '') : '' }
    })),
  );


const init = async () => {
    const httpServer = await app.listen({ port: API_PORT });
    console.log(`Server running at http://${API_SERVER_HOST}:${API_PORT}/${API_CONTEXT_ROOT}`);
    return httpServer;
}

module.exports = { init };