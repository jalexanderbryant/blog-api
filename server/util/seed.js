var User = require('../api/user/userModel');
var Page = require('../api/page/pageModel');
var _ = require('lodash');
var logger = require('./logger');
logger.log('Seeding the Database');

var users = [
  { 
    username: 'alpha',
    password: 'letmein',
    devices: [],
    email: 'alpha@gmail.com'
  },
  
  { 
    username: 'bravo', 
    password: 'letmein',
    devices: [],
    email: 'bravo@gmail.com'
  },
  
  {
    username: 'charlie',
    password: 'letmein',
    devices: [],
    email: 'charlie@gmail.com'
  }
];
var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {
  var newUsers = users.map(function(user) {
    for( var i = 0; i < 1; i++){
      var tmp = data.devices[Math.floor(Math.random()*devices.length)]._id;
      user.devices.push(tmp)
    }
    console.log(user.devices)
    return createDoc(User, user);
  });

  return Promise.all(newUsers)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

cleanDB()
  .then(createUsers)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
