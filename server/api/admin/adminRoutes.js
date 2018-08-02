var router = require('express').Router();
var logger = require('../../util/logger');
var adminController = require('./adminController');
var user = require('../user/userModel')
var auth = require('../../auth/auth');

// Start with at test
router.get('/', adminController.get);


module.exports = router;