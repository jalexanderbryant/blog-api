/*
  * DESC: Server setup
*/

const express   = require('express');       // Get the express module
const app       = express();                // Instantiate express app
const api       = require('./api/api')      // Load API
const config = require('./config/config');  // Get the application configurations
const logger = require('./util/logger');    // load logger
const auth = require('./auth/routes');      // Load auth routes
const path = require('path');               // Path
const jwt = require('jsonwebtoken');        // Webtoken

// Setup database
require('mongoose').connect(config.db.url);


if(config.seed){
  require('./util/seed');
}

// setup the app middleware by passing the newly created
// app to the appMiddleware module.
require('./middleware/appMiddleware')(app);

// Need to setup some global error handling here...
// Moved to the middleware stack

// setup the api
app.use('/api/', api);
app.use('/auth/', auth);
app.set('tokenSecret', config.secrets.jwt);
logger.log('inside server/server.js');

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app instance so it can be passed to other modules
module.exports = app
