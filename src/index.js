const hapi = require('hapi')
const mongoose = require('mongoose')
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema')


const MONGO_HOST = 'localhost'
const MONGO_PORT = '27017'
const MONGO_DB = 'ECSO-DB'
const MONGO_USER = 'ecso_user'
const MONGO_PASS = 'Qwerty12'

const API_PORT = 4000





// mongoose.connection.once('open', () => {
// 	console.log('connected with user ' + MONGO_USER)
// })

const server = hapi.server({
    port: API_PORT,
	host: 'localhost',
	// load: {
	// 	sampleInterval: 1000,
	// 	maxEventLoopDelay: 10000
	// }
})

const init = async () => {

	mongoose.connect('mongodb://'+MONGO_USER+':'+MONGO_PASS+'@'+MONGO_HOST+':'+MONGO_PORT+'/'+MONGO_DB)

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
    console.log(`Server running at ${server.info.uri}`)
}

init().catch(error => console.error(error.stack));