var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: 'gumball' });
var User = require('../api/user/userModel');
var logger = require('../util/logger');

exports.decodeToken = function() {
  return function(request, result, next) {
    
    console.log('decodeToken' + JSON.stringify(request.body, null, 4))

    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    console.log('debug_auth1' + JSON.stringify(request.headers, null, 4))

    if (request.query && request.query.hasOwnProperty('access_token')) {
      console.log('debug_auth2 - checking query ' + request.query.access_token);
      request.headers.authorization = 'Bearer ' + request.query.access_token;
    }
    console.log('debug_auth3' + JSON.stringify(request.headers, null, 4))
    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(request, result, next);
  };
};

exports.getFreshUser = function() {
  return function(request, result, next) {
    // we'll have access to req.user here
    // because we'll use decodeToken in before
    // this function in the middleware stack.
    // req.user will just be an object with the user
    // id on it. We want the full user object/
    // if no user is found it
    // was a valid JWT but didn't decode
    // to a real user in our DB. Either the user was deleted
    // since the client got the JWT, or
    // it was a JWT from some other source

    console.log('getFreshUser req.user ' + JSON.stringify(request.user, null,4 ))

    // update req.user with fresh user from the
    // stale token data
    User.findById(request.user._id)
      .then(function(user){
        if(!user){

          console.log('getFreshUser user not found..... ' + user);
          console.log('getFreshUser unauthorized');
          
          result.status(401).send('Unauthorized');
        } else {
          request.user = user;
          console.log('getFreshUser found user ' + JSON.stringify(user, null,4 ))

          next();
        }
      }, function(err){
        next(err);
      });
  }
};

exports.verifyUser = function() {
  return function(request, result, next) {
    var username = request.body.username;
    var password = request.body.password;
    console.log('debug0');
    // if no username or password then stop.
    if(!username || !password){
      result.status(401).send('Unauthorized: Username and password required');
      return;
    }

    console.log('debug1');

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({username: username})
      .then(function(user){
        console.log('debug1.5')

        if(!user) {
          console.log('debug2');
          result.status(404).send('Error: User not found');
          return;
        } else {
          console.log('debug3')
          // Check user passwords...
          if(user.authenticate(password)){
            request.user = user;
            next();
          } else {
            // Failed
            result.status(401).send('Password incorrect for provided username');
          }
        }
      });

    // use the authenticate() method on a user doc. Passin
    // in the posted password, it will hash the
    // password the same way as the current passwords got hashed


  };
};

// util method to sign tokens on signup
exports.signToken = function(tokenData) {
  
  console.log('signToken: ' + tokenData.id)
  console.log('signToken secret: ' + config.secrets.jwt )
  console.log('signToken expireTime: ' + config.expireTime )
  return jwt.sign(
    {
      username: tokenData.username,
      _id: tokenData.id
    },
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};

/* New Authentication middleware */
exports.verifyToken = function(){
  return function(request, result, next){
    // Find the token
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    // Attempt to decode it
    if(token){

      jwt.verify(token, request.app.get('tokenSecret'), function(error, decodedToken){
        if(error){
          logger.error(error);
          return result.json({success: false, message: 'Failed to Authenticate. Invalid Token.'});
        } else {
          // save request for other routes
          request.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      // No token found
      return result.status(403).send({
        success: false,
        message: "Authentication failed. No token."
      });
    }
  };
};