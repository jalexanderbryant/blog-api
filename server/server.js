/*
 DESC: Application setup
*/

const express = require('express');       // Get express module
const mongoose = require('mongoose');     // Get mongoose module

const app = express();                      // Instantiate express module

const api = require('./api/api');           // Load API
const config = require('./config/config');   // Load Configurations
const logger = require('./util/logger');      // Load logger
logger.log('inside server/server.js');

// Connect Database
// mongoose.connect(config.db.url);


// Setup middlware
require('./middleware/appMiddleware')(app);

// Setup API
// app.use('/api/', api);



// TODO: Add global error handling


// export the app instance so it can be passed to other modules
module.exports = app