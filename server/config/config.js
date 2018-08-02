/*
* DESC: Application configuration entry point. Specific environment configurations
* can be found in their respective files.
*/
var _ = require('lodash');

var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  server: {
    host: process.env.APP_URL || 'localhost',
    port: process.env.PORT || 3000
  }
};

// Set NODE_ENV environment variable
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Add NODE_ENV environment variable to config object
config.env = process.env.NODE_ENV;


var envConfig;
// Using the try/catch block because 'require' coulde error
// out if the file doesn't exist. Set the object's attributes if the file
// exists, otherwise, fallback to an empty object if there's an error


// In case the file doesn't exist, fallback to an empty object
try {
  envConfig = require('./' + config.env);
  
  // Verify  something came back 
  envConfig = envConfig || {};

} catch (e) {
  
  envConfig = {};
}

// Merge the two config objects and export.
// envConfig will overwrite properties 'config' object
module.exports = _.merge(config, envConfig);