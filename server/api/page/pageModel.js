var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {discriminatorKey: 'pageType'};

// Base Page Schema
var pageSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: false,
  },

  headline: {
    type: String,
    unique: false,
    required: false
  },

  content: {
      type: String,
      required: false
  }
}, options);
var Page = mongoose.model('Page', pageSchema);


// This Page type will include additional fields/content from a
// standard page
var landingPageSchema = new mongoose.Schema({
    instagramLink: {
      type: String,
      required: false
    },
    linkdInLink:{
      type: String,
      required: false
    },
    emailLink:{
      type: String,
      required: false
    }
});

var LandingPage = Page.discriminator('LandingPage', landingPageSchema);


// .discriminator('LandingPage', new Schema({
//   instagramLink: {
//     type: String,
//     required: false
//   },
//   linkdInLink:{
//     type: String,
//     required: false
//   },
//   emailLink:{
//     type: String,
//     required: false
//   }
// }))


pageSchema.statics = {
  // Generate standard page
  newLandingPage: function(pageTitle, pageHeadline, pageContent){
    // return "new Page({title: pageTitle, headline: pageHeadline, content: pageContent});"
    // mongoose.model('page', pageSchema).discriminator('Landing');

    return ""
  }
}

module.exports = {
  standardPage: Page,
  landingPage: LandingPage
}




