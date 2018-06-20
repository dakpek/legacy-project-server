const db = require ('../db');
const uuidv4 = require('uuid/v4');
const { DateError } =  require('../errors');
const mailer = require ('../services/mailer');

// SENDER
const postHash = async (ctx, next) => {
  console.log('POST HASH');
  const emailHash =  uuidv4();
  let hashes = [];
  let filetypes = [];
  let files = [];

  const data = {
    senderEmail: ctx.request.body.senderEmail,
    receiverEmail: ctx.request.body.receiverEmail,
    files: ctx.request.body.files,
    dateExpire: ctx.request.body.dateExpire,
    emailHash :emailHash,
    message: ctx.request.body.message,
  }

  const response = await mailer.send('send-files', {
    downloadLink: process.env.FRONTEND_URL + '/download/' + emailHash,
    ...data
  });

  await db.postHash(data)
  ctx.body = {"emailHash": emailHash}
  next()
}

// RECEIVER
const getHash = async (ctx, next) => {
  ctx.body = await db.getHash(ctx.params.emailHash);
  next();
}

module.exports = {
  getHash,
  postHash,
}
