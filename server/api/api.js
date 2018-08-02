var Page = require('./page/pageModel');
var router = require('express').Router();

console.log('inside server/api/api.js');
// api router will mount the other routes
// for all of our resources (users, hubs, etc)
router.use('/users', require('./user/userRoutes'));
router.use('/admin', require('./admin/adminRoutes'));
// router.use('/devices', require('./device/deviceRoutes'));

// // Instantiate base pages
var aboutPage = new Page.standardPage({title: "About"});
var projectPage = new Page.standardPage({title: "Projects", content: "Check this shit out"});
var blogPage = new Page.standardPage({title: "Blog", content: "I write about cool shit"});
var contactPage = new Page.standardPage({title: "Contact", content:"Get in touch"});
var landingPage = new Page.landingPage({title: "JamesAlexander", content: "What to do..."});




module.exports = router;