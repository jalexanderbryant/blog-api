var User = require('../user/userModel');
var config = require('../../config/config');
var Auth = require('../../auth/auth');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
const logger = require('../../util/logger');

exports.get = function(request, result, next)
{
    result.json("Welcome to Dashboard");
}