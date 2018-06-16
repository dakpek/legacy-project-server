'use strict';

const path = require('path');
const Email = require('email-templates');
const nodemailer = require('nodemailer');

const smtpConfig = {
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: process.env.MAILER_PORT === 465 ? true : false, // use SSL
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD
  }
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(smtpConfig);

const email = new Email({
  views: { root: path.join(__dirname, '../templates', 'emails') }
});

async function sendEmail(options) {
  console.log('OPTIONS',options);
  const mailOptions = {
      from: `"${process.env.MAILER_NAME}" <${process.env.MAILER_FROM}>`,
      to: options.receiverEmail,
      subject: options.subject,
      text: options.text,
      html: options.html,
  };
  await transporter.sendMail(mailOptions, function(error, info){
      if(error){
        throw new Error(error)
      }
      console.log(info);
  });
}

const send = (type, options) => {
  return new Promise(function (resolve, reject) {
    email
      .renderAll(type, options)
      .then((response) => {
        resolve(sendEmail({...options, ...response}))
      })
      .catch((e) => {
        console.log('error rendering');
        reject(e);
      });
    }
  );
}

module.exports = {
  send
};
