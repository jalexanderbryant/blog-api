var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config/config');

exports.sendRegistrationEmail = function(user, token, callback){
  // var registrationLink = "http://" + config.server.host + ":" + config.server.port + "/" + config.email.registerUserUrl + "/" + token;
  // var registrationLink = "http://" + config.server.host + "/" + config.email.registerUserUrl + "/" + token;
  // var from = `TurtleSense<${config.email.user}>`;
  // var body = `<p>Thank you for registering with the TurtleSense software. Verify your account by clicking the link below.<br /><a href=${registrationLink.toString()}
  //   >Verification Link</a></p>`;

  // send(from, user.email, 'Verify Your Account', body, function(error, success){
  //   callback(error, success);
  // });
}

function send(from, email, subject, body, callback)
{
  var options = {
    from: from, // sender
    to: email,  // receiver
    subject: subject,
    html: body
  };

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  }));

  transporter.sendMail(options, function(error, response){
    if(error){
      callback(error, null);
    } else {
      callback(null, response);
    }
    
    transporter.close();
  });
}