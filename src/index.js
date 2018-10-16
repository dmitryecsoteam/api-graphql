const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');


const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

const API_PORT = process.env.API_PORT;
const API_SERVER_HOST = process.env.API_SERVER_HOST;
const API_SERVER_CORS = process.env.API_SERVER_CORS;


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

	mongoose.connect('mongodb://'+MONGO_USER+':'+MONGO_PASS+'@'+MONGO_HOST+':'+MONGO_PORT+'/'+MONGO_DB);

    await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			}
		}
	});

    await server.start()
    console.log(`Server running at ${server.info.uri}`);
}

init().catch(error => console.error(error.stack));