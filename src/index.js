const server = require('./server/server');
const mongo = require('./server/mongo');

server.init().catch(error => console.error(error.stack));
mongo.connect().catch(error => console.error(error.stack));