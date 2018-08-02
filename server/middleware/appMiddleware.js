var bodyParser = require('body-parser');

// Setup global middleware
module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
