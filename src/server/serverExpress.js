const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
//const { ApolloServer } = require('apollo-server-express');
//const { graphqlExpress } = require('apollo-server-express/dist/expressApollo');

const schema = require('../graphql/schema');

const API_PORT = process.env.API_PORT;
const API_SERVER_HOST = process.env.API_SERVER_HOST;
const API_SERVER_CORS = process.env.API_SERVER_CORS;
const API_CONTEXT_ROOT = process.env.API_CONTEXT_ROOT;


const app = express();

// Enable cors for all origins
if (API_SERVER_CORS) {
    app.use(cors());
}


app.use(
    '/' + API_CONTEXT_ROOT,
    graphqlHTTP(request => ({
      schema,
      graphiql: true,
      context: { token: request.headers.authorization }
    })),
  );



/**************** Apollo Server ***************/
// const apolloServer = new ApolloServer({
//     schema
// });
// apolloServer.applyMiddleware({ app, path: '/' + API_CONTEXT_ROOT });



const init = async () => {
    const httpServer = await app.listen({ port: API_PORT });
    console.log(`Server running at http://${API_SERVER_HOST}:${API_PORT}/${API_CONTEXT_ROOT}`);
    return httpServer;
}

module.exports = { init };