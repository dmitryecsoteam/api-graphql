const hapi = require('hapi');

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('../graphql/schema');




const API_PORT = process.env.API_PORT;
const API_SERVER_HOST = process.env.API_SERVER_HOST;
const API_SERVER_CORS = process.env.API_SERVER_CORS;
const API_CONTEXT_ROOT = process.env.API_CONTEXT_ROOT;


const server = hapi.server({
    port: API_PORT,
	host: API_SERVER_HOST,
	routes: {
		cors: (API_SERVER_CORS === 'true')
	}
	// load: {
	// 	sampleInterval: 1000,
	// 	maxEventLoopDelay: 10000
	// }
});

const init = async () => {

    await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/' + API_CONTEXT_ROOT
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/' + API_CONTEXT_ROOT,
			graphqlOptions: {
				schema
			}
		}
	});

    await server.start()
	console.log(`Server running at ${server.info.uri}`);
};

module.exports = { server, init };