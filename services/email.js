'use strict';
require('dotenv').config();
const path = require('path');
const Email = require('email-templates');
const nodemailer = require('nodemailer');

var smtpConfig = {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_PORT === 465 ? true : false, // use SSL
    auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);
var templateDir = path.join(__dirname, 'templates', 'emails');

const email = new Email({
  views: { root: templateDir }
});
email
  .renderAll('send-files', {
    name: 'Doruk',
    nameSender: 'Marlon',
    to: 'test@test.com'
  })
  .then(sendEmail)
  .catch(console.error);

function sendEmail({subject, html, text, to}) {
  var mailOptions = {
      from: `"${process.env.MAILER_NAME}" <${process.env.MAILER_FROM}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plaintext body
      html // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}


module.exports = transporter;
