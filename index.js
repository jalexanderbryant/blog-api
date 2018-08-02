console.log("hello, world");

/*
DESC: Entry point to application. Basic setup here
*/

const logger = require('./server/util/logger');
const config = require('./server/config/config');
const app = require('./server/server');

logger.log("index.js (entry) host: " + config.server.host);
logger.log("index.js (entry) port: " + config.server.port);

// Listen
app.listen( config.server.port );
logger.log('Server listening on http://' + config.server.host + ':' + config.server.port);
